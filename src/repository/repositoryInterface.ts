import { getRepositoryName } from '../nameUtils'

export const repositoryInterface = (props: Properties): string => {
  const { className } = props
  const repositoryName = getRepositoryName(className)

  return `public interface ${repositoryName} extends AbstractRepository<${className}> {
}`
}
