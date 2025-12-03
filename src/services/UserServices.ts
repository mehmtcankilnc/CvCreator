import { supabase } from '../lib/supabase';

export const deleteUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/pdf',
  };

  if (session?.access_token && !session?.user.is_anonymous) {
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  try {
    const response = await fetch(`http://localhost:5128/api/users`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Kullanıcı silinemedi!');
    } else {
      return response;
    }
  } catch (error) {
    console.error('Kullanıcı silinirken bir hata oluştu: ', error);
  }
};
