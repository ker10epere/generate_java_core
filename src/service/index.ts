import { join } from 'path'
import fs from 'fs-extra'

export default function saveService(properties: Properties) {
  const serviceImplTemplate = `
  public class ${properties.className}ServiceImpl extends AbstractServiceImpl<${properties.className}> implements ${properties.className}Service {

    private final ${properties.className}Repository repository;

    public ${properties.className}ServiceImpl(String tableName, DatabaseManager databaseManager, Logger logger) {
        super(new ${properties.className}RepositoryImpl(tableName, databaseManager, logger));
        this.repository = (${properties.className}Repository) super.repository;
    }

}
  `
  const outDirPath = join(__dirname, '..', `/generated/service/`)
  fs.outputFileSync(
    join(outDirPath, `${properties.fileClassName}ServiceImpl.java`),
    serviceImplTemplate
  )
  fs.outputFileSync(
    join(outDirPath, `${properties.fileClassName}Service.java`),
    `public interface ${properties.className}Service extends AbstractService<${properties.className}> {
  }`
  )
}
