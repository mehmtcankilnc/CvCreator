type Fetcher = (url: string, options?: RequestInit) => Promise<Response>;

export const deleteUser = async (authenticatedFetch: Fetcher) => {
  try {
    const response = await authenticatedFetch('/users', {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    return await response.json();
  } catch (error) {
    console.error('Kullanıcı silinirken bir hata oluştu: ', error);
  }
};
