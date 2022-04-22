import { readFileSync, writeFileSync, createReadStream } from 'fs'
import { resolve, join } from 'path'
import { parse } from 'csv-parse/sync'
import camelcase from 'camelcase'
import fs from 'fs-extra'
import { list } from './templates/repo/list'
import { repoClassImpl } from './templates/repo/classImpl'

export default function saveRepo(
  databaseColumns: Data[],
  properties: Properties
) {
  // join for SELECT query
  const columnNames: string[] = []
  // join() for contructor arguments
  const camelCasedProperties: string[] = []
  const repoVariables = databaseColumns.reduce((acc, curr) => {
    return [...acc, transformToGetter(curr)]
  }, [] as Model[])

  function transformToGetter(item: Data): Model {
    columnNames.push(item.columnName)
    const camelCasedColumnName = camelcase(item.columnName)
    camelCasedProperties.push(camelCasedColumnName)
    const findProperty = camelcase(`find_${item.columnName}`)
    const findIsPresent = `item.${findProperty}().ifPresent(listConsumer(sb, "${item.columnName}", values));`
    const rsGet = `final ${item.dataType} ${camelCasedColumnName} = rs.get${item.dataType}("${item.columnName}");`
    return { findIsPresent, rsGet }
  }

  const findIsPresentJoined = repoVariables
    .map((item) => item.findIsPresent)
    .join('\n')
  const rsGetJoined = repoVariables.map((item) => item.rsGet).join('\n')
  const camelCasedPropertiesJoined = camelCasedProperties.join('\n,')
  const columnNamesJoined = columnNames.join(', ')

  const repositoryImplTemplate = repoClassImpl(
    properties,
    columnNamesJoined,
    findIsPresentJoined,
    rsGetJoined,
    camelCasedPropertiesJoined
  )

  const outDirPath = join(__dirname, '..', `/generated/repository/`)
  fs.outputFileSync(
    join(outDirPath, `${properties.fileClassName}RepositoryImpl.java`),
    repositoryImplTemplate
  )
  fs.outputFileSync(
    join(outDirPath, `${properties.fileClassName}Repository.java`),
    `public interface ${properties.className}Repository extends AbstractRepository<${properties.className}> {
  }`
  )
}
