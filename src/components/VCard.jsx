import { useState } from 'react'
import {
  Card, Switch, Avatar, Typography, Button,
  Tag, Divider, Tooltip, Space,
} from 'antd'
import {
  QrcodeOutlined,
  BulbOutlined,
  BulbFilled,
  UserAddOutlined,
  ShareAltOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import QRModal from './QRModal'
import { useVisitas } from '../hooks/useVisitas'

const { Title, Text, Paragraph } = Typography

const NOTAS = [
  'Vivo en Lima, Perú',
  'Apasionado por crear y comunicar',
  'Construyendo soluciones con propósito',
]

function descargarContacto() {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Erick Hurtado',
    'N:Hurtado;Erick;;;',
    'TITLE:Sales & Operations TI | Manager',
    'ORG:Tecdata Perú / Coderk',
    'EMAIL;TYPE=WORK:erickh@tecdataperu.com',
    'TEL;TYPE=CELL:+51937842695',
    'URL:https://coderk.netlify.app',
    'URL;TYPE=LinkedIn:https://www.linkedin.com/in/erickmhurtado/',
    'ADR;TYPE=WORK:;;Lima;;;PE',
    'END:VCARD',
  ].join('\n')
  const blob = new Blob([vcf], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Erick_Hurtado_Coderk.vcf'
  a.click()
  URL.revokeObjectURL(url)
}

async function compartirTarjeta() {
  const datos = {
    title: 'Erick Hurtado — Coderk',
    text: 'Sales & Operations TI | Manager\nTecdata Perú / Coderk',
    url: 'https://coderk.netlify.app',
  }
  if (navigator.share) {
    try { await navigator.share(datos) } catch (e) {}
  } else {
    await navigator.clipboard.writeText(datos.url)
    alert('¡Link copiado al portapapeles!')
  }
}

const sectionStyle = (delay) => ({
  opacity: 0,
  animation: 'fadeUp 0.5s ease forwards',
  animationDelay: `${delay}ms`,
})

export default function VCard({ isDark, onToggle }) {
  const [qrOpen, setQrOpen] = useState(false)
  const { total, loading } = useVisitas()

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
        }}
        styles={{ body: { padding: 0 } }}
        cover={<VCardHeader isDark={isDark} onToggle={onToggle} />}
      >
        <div style={{ padding: '20px 20px 24px', position: 'relative' }}>

          {/* SECCIÓN 1 — Perfil */}
          <div style={sectionStyle(100)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <Space align="center" size={12}>
                <Avatar
                  src="/img/erk_avatar.jpeg"
                  size={70}
                  className="erk-avatar"
                  style={{ border: '2px solid white', boxShadow: '0 6px 15px rgba(0,0,0,0.3)' }}
                />
                <div>
                  <Text strong style={{ display: 'block', fontSize: 16 }}>Erick Hurtado</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Sales &amp; Operations TI | Manager</Text>
                </div>
              </Space>

              <Space direction="vertical" align="center" size={8}>
                <Tooltip title="LinkedIn Premium">
                  <a href="https://www.linkedin.com/in/erickmhurtado/" target="_blank" rel="noreferrer" className="tap-link">
                    <img src="/img/linkedin_premium.png" alt="LinkedIn" style={{ width: 32 }} />
                  </a>
                </Tooltip>
                <Tooltip title="Tecdata Perú">
                  <a href="https://tecdataperu.com/" target="_blank" rel="noreferrer" className="tap-link">
                    <img src="/img/tecdata_logo.png" alt="Tecdata" style={{ width: 48, objectFit: 'contain' }} />
                  </a>
                </Tooltip>
              </Space>
            </div>
          </div>

          {/* SECCIÓN 2 — Empresas */}
          <div style={sectionStyle(200)}>
            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>Empresas:</Text>
              <Space wrap size={6}>
                <Tag color="blue" style={{ borderRadius: 20, padding: '2px 10px' }}>
                  Tecdata Perú | Soluciones TI
                </Tag>
                <Tag color="purple" style={{ borderRadius: 20, padding: '2px 10px' }}>
                  Coderk | Desarrollo Full Stack
                </Tag>
              </Space>
            </div>
          </div>

          {/* SECCIÓN 3 — Descripción */}
          <div style={sectionStyle(300)}>
            <Card size="small" style={{ marginBottom: 16, borderRadius: 10 }}>
              <Text strong>Descripción</Text>
              <Paragraph type="secondary" style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.6 }}>
                Ayudo a empresas a potenciar resultados mediante soluciones
                tecnológicas combinando desarrollo, ventas y creatividad.
              </Paragraph>
            </Card>
          </div>

          {/* SECCIÓN 4 — Contacto */}
          <div style={sectionStyle(400)}>
            <Space direction="vertical" size={10} style={{ width: '100%', marginBottom: 16 }}>
              <a
                href="mailto:erickh@tecdataperu.com"
                className="tap-link"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2563eb', fontSize: 13 }}
              >
                <img src="/img/email_icon.png" alt="Email" style={{ width: 20 }} />
                erickh@tecdataperu.com
              </a>
              <a
                href="https://wa.me/51937842695"
                target="_blank"
                rel="noreferrer"
                className="tap-link"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontSize: 13 }}
              >
                <img src="/img/whatsapp_logo.jpg" alt="WhatsApp" style={{ width: 20, borderRadius: 4 }} />
                (+51) 937 842 695
              </a>
            </Space>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          {/* SECCIÓN 5 — Notas */}
          <div style={sectionStyle(500)}>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Notas:</Text>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                {NOTAS.map((nota, i) => (
                  <li key={i} style={{ fontSize: 13, marginBottom: 4 }}>
                    <Text type="secondary">{nota}</Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECCIÓN 6 — Contador de visitas */}
          <div style={sectionStyle(550)}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 16,
              padding: '6px 12px',
              borderRadius: 20,
              background: isDark ? 'rgba(79,70,229,0.15)' : 'rgba(79,70,229,0.08)',
              width: 'fit-content',
            }}>
              <EyeOutlined style={{ color: '#4f46e5', fontSize: 14 }} />
              <Text style={{ fontSize: 12, color: '#4f46e5', fontWeight: 500 }}>
                {loading ? '...' : `${total?.toLocaleString()} visitas`}
              </Text>
            </div>
          </div>

          {/* SECCIÓN 7 — Botones */}
          <div style={sectionStyle(600)}>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              <Tooltip title="Guarda mi contacto en tu celular">
                <Button
                  icon={<UserAddOutlined />}
                  onClick={descargarContacto}
                  type="primary"
                  style={{ flex: 1, borderRadius: 20, fontWeight: 500 }}
                >
                  Guardar
                </Button>
              </Tooltip>

              <Tooltip title="Compartir tarjeta">
                <Button
                  icon={<ShareAltOutlined />}
                  onClick={compartirTarjeta}
                  style={{ flex: 1, borderRadius: 20, background: '#0f172a', color: 'white', border: 'none', fontWeight: 500 }}
                >
                  Compartir
                </Button>
              </Tooltip>

              <Tooltip title="Generar QR">
                <Button
                  icon={<QrcodeOutlined />}
                  onClick={() => setQrOpen(true)}
                  style={{ borderRadius: 20, background: '#1e293b', color: 'white', border: 'none' }}
                />
              </Tooltip>
            </div>
          </div>

        </div>
      </Card>

      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  )
}

function VCardHeader({ isDark, onToggle }) {
  return (
    <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
      <img
        src="/img/header.png"
        alt="Header"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(135deg, rgba(79,70,229,0.85), rgba(109,40,217,0.9))'
            : 'linear-gradient(135deg, rgba(79,70,229,0.75), rgba(139,92,246,0.85))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.4s ease',
        }}
      >
        <Tooltip title={isDark ? 'Modo claro' : 'Modo oscuro'}>
          <div style={{ position: 'absolute', top: 12, right: 14 }}>
            <Switch
              checked={isDark}
              onChange={onToggle}
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
              size="default"
            />
          </div>
        </Tooltip>

        <Title level={4} style={{ color: 'white', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          Infraestructura TI
        </Title>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
          Soluciones de Video Colaboración
        </Text>
      </div>
    </div>
  )
}