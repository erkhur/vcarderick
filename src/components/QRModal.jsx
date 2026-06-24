import { Modal, Typography } from 'antd'
import { QRCodeSVG } from 'qrcode.react'

const { Text } = Typography

const VCARD_URL = 'https://coderk.netlify.app'

export default function QRModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title="Compartir tarjeta"
      width={240}
      styles={{ body: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0 4px' } }}
    >
      <QRCodeSVG
        value={VCARD_URL}
        size={160}
        bgColor="transparent"
        fgColor="currentColor"
        level="H"
        includeMargin
      />
      <Text type="secondary" style={{ marginTop: 8, fontSize: 12 }}>
        Escanea para compartir
      </Text>
      <Text
        copyable={{ text: VCARD_URL }}
        style={{ fontSize: 11, marginTop: 4, color: '#6b7280' }}
      >
        {VCARD_URL}
      </Text>
    </Modal>
  )
}
