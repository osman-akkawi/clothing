import { supabase } from '../../../lib/supabase';

export const handlePasswordReset = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
};

export const handleEmailConfirmation = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) throw error;
  return session;
};

export const isValidAuthHash = (hash: string) => {
  return hash && hash.includes('access_token');
};