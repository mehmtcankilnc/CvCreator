import { supabase } from '../lib/supabase';

export const deleteUser = async () => {
  try {
    const { error } = await supabase.rpc('delete_my_account');
    if (error) throw error;

    return { isSuccess: true };
  } catch (error) {
    console.error('Kullanıcı silinirken bir hata oluştu: ', error);
  }
};
