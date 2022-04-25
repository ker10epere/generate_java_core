import {
  getRepositoryImplName,
  getRepositoryName,
  getServiceImplName,
  getServiceName,
} from '../nameUtils'
import { State } from '../State'

export const classImpl = (props: Properties): string => {
  const { className } = props

  const repoName = getRepositoryName(className)
  const repoImplName = getRepositoryImplName(className)

  const serviceImplName = getServiceImplName(className)
  const serviceName = getServiceName(className)

  return `public class ${serviceImplName} extends AbstractServiceImpl<${className}> implements ${serviceName} {

        private final ${repoName} repository;
    
        public ${serviceImplName}(String tableName, DatabaseManager databaseManager, Logger logger) {
            super(new ${repoImplName}(tableName, databaseManager, logger));
            this.repository = (${repoName}) super.repository;
        }
    
    }`
}
