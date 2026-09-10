import { useNavigate } from 'react-router-dom'
import { BackLink } from '../../components/BackLink/BackLink'
import { ProjectForm } from '../../components/ProjectForm/ProjectForm'
import { createProject } from '../../services/projects'
import { toDraft } from '../../utils/validation'
import styles from '../formPage.module.css'

export function NewProjectPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <BackLink />
      <h1 className={styles.title}>Novo projeto</h1>
      <div className={styles.panel}>
        <ProjectForm
          submitLabel="Salvar projeto"
          onSubmit={(values) => {
            createProject(toDraft(values))
            navigate('/')
          }}
        />
      </div>
    </div>
  )
}
