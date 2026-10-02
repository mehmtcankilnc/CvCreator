# CvCreator

CvCreator is a mobile app for building professional resumes and cover letters. You fill in a guided, step-by-step form, pick a template, and get a ready-to-share A4 PDF, generated entirely on the phone. Accounts and documents are stored in Supabase, and guests can use the app without signing up.

Available on Google Play: `com.mehmtcankilinc.cvcreator`

## Features

- **Guided resume builder**: a multi-step form covering personal info, summary, experience, education, skills, languages, certificates, references, and an optional profile photo
- **Four resume templates**: Classic, Minimal, Modern, and Vertical, with a template gallery and live selection step
- **Cover letter builder**: sender info, recipient info, letter content, and meta details, rendered with a dedicated template
- **On-device PDF generation**: documents are rendered from HTML templates to A4 PDFs on the phone; nothing is uploaded as a file
- **Built-in PDF viewer**: preview, share, or download the generated document
- **Downloads with feedback**: the PDF is saved to the Downloads folder, a confirmation is shown, and a notification lets you open the file straight from the notification panel
- **Edit and manage**: list, search, update, and delete saved resumes and cover letters
- **Guest mode and Google sign-in**: start immediately as a guest (Supabase anonymous auth), or sign in with Google to keep documents across devices
- **Account deletion**: delete the account and all of its data from within the app
- **Localization**: English and Turkish, including localized labels and dates inside the generated PDFs
- **Light and dark themes**
- **In-app update prompt**: checks `version.json` and nudges users to update from the store

## Tech stack

| Area | Choice |
|---|---|
| Framework | React Native 0.81 (bare CLI, no Expo) with React 19 |
| Language | TypeScript |
| Navigation | React Navigation (stack + drawer) |
| Styling | NativeWind 4 (Tailwind CSS for React Native) |
| State | Redux Toolkit (theme, language, bottom sheet) and a React context for auth |
| Backend | Supabase (Postgres, Auth, Row Level Security, RPC) |
| Auth | `@supabase/supabase-js`, `@react-native-google-signin/google-signin`, Supabase anonymous sign-in for guests |
| PDF | Handlebars (precompiled templates) + `react-native-html-to-pdf` |
| PDF viewing | `react-native-pdf`, `react-native-share`, `react-native-blob-util` |
| Notifications | Notifee (local download notifications) |
| Forms | Formik |
| i18n | i18next + react-i18next + react-native-localize |
| Testing | Jest |

## Architectural decisions

- **Serverless backend.** The app originally talked to a self-hosted .NET API ([CvCreatorBackend](https://github.com/mehmtcankilnc/CvCreatorBackend)) that rendered PDFs with Playwright. That server was retired in favor of Supabase's free tier. The client now queries Postgres directly through supabase-js, and security is enforced by Row Level Security rather than by an API layer.
- **PDFs are generated on the device.** Templates are plain HTML + Handlebars. `scripts/build-templates.js` precompiles them into `src/pdf/compiledTemplates.js` so the app only ships the Handlebars runtime, not the compiler. `react-native-html-to-pdf` then prints the rendered HTML to an A4 PDF. No file storage and no server-side rendering are needed, which keeps the project within free-tier limits.
- **Form data is a JSON document.** Resumes and cover letters are stored as a `form_values` JSONB column next to a template code and file name. The same JSON drives the form (for editing) and the template (for rendering), so there is a single source of truth and no per-field schema to migrate.
- **Row Level Security everywhere.** Both tables have select/insert/update/delete policies restricted to `auth.uid() = user_id`. `user_id` defaults to `auth.uid()` so the client never has to send it. Account deletion runs through a `security definer` RPC (`delete_my_account`) that removes the caller's `auth.users` row; documents cascade.
- **Guests are real users.** Guest mode uses Supabase anonymous sign-in, so guests get a genuine session and RLS applies to them like anyone else. `AuthContext` restores a guest session automatically if the session is lost.
- **Locale-aware PDFs.** `src/pdf/labels.ts` holds Turkish/English section labels and `src/pdf/formatDates.ts` turns stored dates into human-readable text in the active language before they reach the template.
- **Free-tier keepalive.** Supabase pauses inactive free projects. A scheduled GitHub Actions workflow (`.github/workflows/supabase-keepalive.yml`) calls a trivial `keepalive()` RPC twice a week to keep the project awake.

## Project structure

```
App.tsx                     # Providers, theme sync, update check, notification handler
index.js                    # Entry point, background notification handler
src/
  components/               # Shared UI, plus the resume/cover letter form steps
    CreateResumeSteps/
    CreateCoverLetterSteps/
  context/AuthContext.tsx   # Supabase session, guest and Google sign-in, account deletion
  data/                     # Template and language metadata
  lib/supabase.ts           # Supabase client
  locales/                  # en.json, tr.json
  navigation/               # Root stack and drawer
  pdf/                      # Templates, Handlebars rendering, date/label helpers, PDF generation
    templates/              # classic, minimal, modern, vertical, coverletter (HTML)
  screens/                  # Home, My Resumes, My Cover Letters, Settings, About, viewer, creators
  services/                 # Supabase queries for resumes, cover letters, and users
  store/                    # Redux Toolkit slices
  types/                    # Shared TypeScript types
  utilities/                # i18n setup, downloads, notifications, sharing
scripts/build-templates.js  # Precompiles Handlebars templates
supabase/migrations/        # Postgres schema, RLS policies, RPCs
__tests__/                  # Jest tests (PDF rendering, date formatting, auth context)
version.json                # Latest version and store URL for the in-app update prompt
```

## Running locally

### Prerequisites

- Node.js 20+
- JDK 17 and Android Studio (Android SDK, an emulator or a device)
- A Supabase project
- A Google Cloud project with OAuth clients (see below)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill it in:

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
GOOGLE_CLIENT_ID=
```

`GOOGLE_CLIENT_ID` is the **Web** OAuth client ID. The same client ID and secret must also be configured in the Supabase dashboard under Authentication, Providers, Google. Anonymous sign-ins must be enabled there as well.

### 3. Create the database schema

Link the Supabase CLI to your project and push the migration:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

This creates the `resumes` and `cover_letters` tables, indexes, `updated_at` triggers, RLS policies, and the `delete_my_account` and `keepalive` functions.

### 4. Google sign-in on Android

Create an **Android** OAuth client in Google Cloud for each signing key you use, with package name `com.mehmtcankilinc.cvcreator`:

- the debug keystore SHA-1 (local development)
- the upload key SHA-1 (if you want Google sign-in in locally built release APKs)
- the Play App Signing SHA-1 (builds installed from Google Play)

Without a matching SHA-1, Google sign-in fails with `DEVELOPER_ERROR`.

### 5. Run

```bash
npm start
```

In another terminal:

```bash
npm run android
```

### Tests and linting

```bash
npm test
npm run lint
```

Note: `__tests__/App.test.tsx` currently fails on the `global.css` import; the remaining suites pass.

### Changing a template

Edit the HTML in `src/pdf/templates/`, then regenerate the compiled bundle:

```bash
node scripts/build-templates.js
```

## Release build

Signing credentials are read from `~/.gradle/gradle.properties`:

```
CVCREATOR_STORE_FILE=
CVCREATOR_STORE_PASSWORD=
CVCREATOR_KEY_ALIAS=
CVCREATOR_KEY_PASSWORD=
```

Then build the Play Store bundle:

```bash
cd android
./gradlew app:bundleRelease
```

The output is `android/app/build/outputs/bundle/release/app-release.aab`. Bump `version` in `package.json`, `CURRENT_VERSION` in `App.tsx`, and `versionCode`/`versionName` in `android/app/build.gradle` together. After the new version is live on Google Play, update `version.json` so older installs are prompted to update. Updating it earlier would send users to an update that does not exist yet.

## GitHub Actions

`supabase-keepalive.yml` needs two repository secrets: `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

## Related

- [CvCreatorBackend](https://github.com/mehmtcankilnc/CvCreatorBackend): the original .NET 8 backend, now archived
