import { useState, useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import VCard from './components/VCard'

export default function App() {
  // ── Modo oscuro persistente con localStorage ──
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('coderk-theme') === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('coderk-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#4f46e5',
          borderRadius: 12,
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(135deg, #020617, #0f172a)'
            : 'linear-gradient(135deg, #0f172a, #1e293b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          transition: 'background 0.4s ease',
        }}
      >
        <VCard isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
      </div>
    </ConfigProvider>
  )
}