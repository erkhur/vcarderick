import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const TABLA = 'vcarderick_page_views'

export function useVisitas() {
  const [total, setTotal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function registrarYContar() {
      // 1 — Registra la visita
      await supabase.from(TABLA).insert({})

      // 2 — Cuenta el total
      const { count } = await supabase
        .from(TABLA)
        .select('*', { count: 'exact', head: true })

      setTotal(count ?? 0)
      setLoading(false)
    }

    registrarYContar()
  }, [])

  return { total, loading }
}