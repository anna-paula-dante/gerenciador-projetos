import { Link, useNavigate, useParams } from 'react-router-dom'
import { BackLink } from '../../components/BackLink/BackLink'
import { ProjectForm } from '../../components/ProjectForm/ProjectForm'
import { getProjectById, updateProject } from '../../services/projects'
import { toDraft } from '../../utils/validation'
import styles from '../formPage.module.css'

export function EditProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = id ? getProjectById(id) : undefined

  if (!project) {
    return (
      <div className={styles.page}>
        <BackLink />
        <h1 className={styles.title}>Projeto não encontrado</h1>
        <div className={styles.panel}>
          <p className={styles.notFound}>
            O projeto que você procura não existe mais.{' '}
            <Link to="/">Voltar para a lista de projetos</Link>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <BackLink />
      <h1 className={styles.title}>Editar projeto</h1>
      <div className={styles.panel}>
        <ProjectForm
          submitLabel="Salvar projeto"
          initialValues={{
            name: project.name,
            client: project.client,
            startDate: project.startDate,
            endDate: project.endDate,
            cover: project.cover,
          }}
          onSubmit={(values) => {
            updateProject(project.id, toDraft(values))
            navigate('/')
          }}
        />
      </div>
    </div>
  )
}
