import { getRepositoryImplName, getRepositoryName } from '../nameUtils'
import { State } from '../State'
import { list } from './list'
import { updateWithResult } from './updateWithResult'

export const classImpl = (state: State, props: Properties): string => {
  const { className, tableName } = props
  const repositoryName = getRepositoryName(className)
  const repositoryImplName = getRepositoryImplName(className)

  return `public class ${repositoryImplName} extends AbstractRepositoryImpl< ${className} > implements ${repositoryName} {

    public ${repositoryImplName}(String tableName,DatabaseManager databaseManager, Logger logger) {
        super(${className}.class,tableName, databaseManager, logger);
    }
    
    ${list(state, props)}

    ${updateWithResult(state, props)}
}
  `
}
