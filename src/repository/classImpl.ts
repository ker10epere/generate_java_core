import { list } from './list'

export const classImpl = (
  properties: Properties,
  columnNamesJoined: string,
  findIsPresentJoined: string,
  rsGetJoined: string,
  camelCasedPropertiesJoined: string
) => {
  const repoList = list(
    properties,
    columnNamesJoined,
    findIsPresentJoined,
    rsGetJoined,
    camelCasedPropertiesJoined
  )
  return `
    public class ${properties.className}RepositoryImpl extends AbstractRepositoryImpl<${properties.className}> implements ${properties.className}Repository {
    
      public ${properties.className}RepositoryImpl(String tableName,DatabaseManager databaseManager, Logger logger) {
          super(${properties.className}.class,tableName, databaseManager, logger);
      }
    
     ${repoList}
    
    }
    `
}
