import { useRef, useState } from 'react'
import { Trash2, UploadCloud } from 'lucide-react'
import styles from './CoverUpload.module.css'

interface CoverUploadProps {
  value?: string
  onChange: (cover: string | undefined) => void
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png']
const MAX_BYTES = 2 * 1024 * 1024

export function CoverUpload({ value, onChange }: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File | undefined) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Formato inválido. Escolha um arquivo .jpg ou .png.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('A imagem deve ter no máximo 2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setError(null)
      onChange(typeof reader.result === 'string' ? reader.result : undefined)
    }
    reader.onerror = () => setError('Não foi possível ler o arquivo.')
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Capa do projeto</span>

      {value ? (
        <div className={styles.preview}>
          <img
            src={value}
            alt="Pré-visualização da capa do projeto"
            className={styles.image}
          />
          <button
            type="button"
            className={styles.removeButton}
            aria-label="Remover capa"
            onClick={() => {
              onChange(undefined)
              setError(null)
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ) : (
        <div className={styles.dropzone}>
          <UploadCloud size={20} className={styles.dropIcon} />
          <p className={styles.hint}>
            Escolha uma imagem .jpg ou .png no seu dispositivo
          </p>
          <button
            type="button"
            className={styles.selectButton}
            onClick={() => inputRef.current?.click()}
          >
            Selecionar
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        className={styles.input}
        onChange={(event) => {
          handleFile(event.target.files?.[0])
          event.target.value = ''
        }}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
