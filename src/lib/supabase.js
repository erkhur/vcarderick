import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dsfguitbukyaejvddmdf.supabase.co'
const SUPABASE_KEY = 'sb_publishable_UuRS4XUQT4Ppu2ZuPxop3A_AeLfW2Fu'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)