import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { ProjectFieldName, ProjectFormValues } from '../../utils/validation'
import { validateProjectForm } from '../../utils/validation'
import { CoverUpload } from '../CoverUpload/CoverUpload'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
  initialValues?: Partial<ProjectFormValues>
  submitLabel: string
  onSubmit: (values: ProjectFormValues) => void
}

const EMPTY_VALUES: ProjectFormValues = {
  name: '',
  client: '',
  startDate: '',
  endDate: '',
  cover: undefined,
}

export function ProjectForm({ initialValues, submitLabel, onSubmit }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>({
    ...EMPTY_VALUES,
    ...initialValues,
  })
  const [touched, setTouched] = useState<Record<ProjectFieldName, boolean>>({
    name: false,
    client: false,
    startDate: false,
    endDate: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validateProjectForm(values), [values])
  const isValid = Object.keys(errors).length === 0

  const errorFor = (field: ProjectFieldName) =>
    touched[field] || submitted ? errors[field] : undefined

  const setField = (field: ProjectFieldName, value: string) =>
    setValues((current) => ({ ...current, [field]: value }))

  const markTouched = (field: ProjectFieldName) =>
    setTouched((current) => ({ ...current, [field]: true }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (isValid) onSubmit(values)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label
          htmlFor="project-name"
          className={`${styles.label} ${errorFor('name') ? styles.labelError : ''}`}
        >
          Nome do projeto <span className={styles.optional}>(Obrigatório)</span>
        </label>
        <input
          id="project-name"
          type="text"
          className={`${styles.input} ${errorFor('name') ? styles.inputError : ''}`}
          value={values.name}
          onChange={(event) => setField('name', event.target.value)}
          onBlur={() => markTouched('name')}
        />
        {errorFor('name') && <p className={styles.errorText}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label
          htmlFor="project-client"
          className={`${styles.label} ${errorFor('client') ? styles.labelError : ''}`}
        >
          Cliente <span className={styles.optional}>(Obrigatório)</span>
        </label>
        <input
          id="project-client"
          type="text"
          className={`${styles.input} ${errorFor('client') ? styles.inputError : ''}`}
          value={values.client}
          onChange={(event) => setField('client', event.target.value)}
          onBlur={() => markTouched('client')}
        />
        {errorFor('client') && <p className={styles.errorText}>{errors.client}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label
            htmlFor="project-start"
            className={`${styles.label} ${errorFor('startDate') ? styles.labelError : ''}`}
          >
            Data de Início <span className={styles.optional}>(Obrigatório)</span>
          </label>
          <input
            id="project-start"
            type="date"
            className={`${styles.input} ${errorFor('startDate') ? styles.inputError : ''}`}
            value={values.startDate}
            onChange={(event) => setField('startDate', event.target.value)}
            onBlur={() => markTouched('startDate')}
          />
          {errorFor('startDate') && (
            <p className={styles.errorText}>{errors.startDate}</p>
          )}
        </div>

        <div className={styles.field}>
          <label
            htmlFor="project-end"
            className={`${styles.label} ${errorFor('endDate') ? styles.labelError : ''}`}
          >
            Data Final <span className={styles.optional}>(Obrigatório)</span>
          </label>
          <input
            id="project-end"
            type="date"
            className={`${styles.input} ${errorFor('endDate') ? styles.inputError : ''}`}
            value={values.endDate}
            onChange={(event) => setField('endDate', event.target.value)}
            onBlur={() => markTouched('endDate')}
          />
          {errorFor('endDate') && <p className={styles.errorText}>{errors.endDate}</p>}
        </div>
      </div>

      <CoverUpload
        value={values.cover}
        onChange={(cover) => setValues((current) => ({ ...current, cover }))}
      />

      <button type="submit" className={styles.submit} disabled={!isValid}>
        {submitLabel}
      </button>
    </form>
  )
}
