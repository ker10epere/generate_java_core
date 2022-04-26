import { getRepositoryImplName, getRepositoryName } from '../nameUtils'
import { State } from '../State'
import { create } from './create'
import { insert } from './insert'
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
    
    ${create(state, props)}

    ${insert(state, props)}

    ${list(state, props)}

    ${updateWithResult(state, props)}
}
  `
}
