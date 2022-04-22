import { readFileSync } from 'fs'
import { resolve, join } from 'path'
import { parse } from 'csv-parse/sync'
import saveRepo from './generate_repo'
import { saveClass } from './generate-model'
import saveService from './generate_service'
import { updateRepo } from './coalesce/update_repo'

const properties = JSON.parse(
  readFileSync('properties.json', 'utf8')
) as Properties

const file = 'model.csv'
const columns = readFileSync(file, 'utf-8')
const databaseColumns: Data[] = parse(columns, {
  delimiter: ',',
  columns: true,
})

const update = updateRepo(
  databaseColumns.map((i) => i.columnName),
  properties.tableName
)

console.log(update)
// saveRepo(databaseColumns, properties)
// saveClass(databaseColumns, properties)
// saveService(properties)
