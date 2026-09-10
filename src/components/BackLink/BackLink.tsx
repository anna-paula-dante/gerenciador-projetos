import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './BackLink.module.css'

export function BackLink() {
  const navigate = useNavigate()

  return (
    <button type="button" className={styles.link} onClick={() => navigate('/')}>
      <ArrowLeft size={13} />
      Voltar
    </button>
  )
}
