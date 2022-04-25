import { readFileSync } from 'fs'
import { resolve, join } from 'path'
import { parse } from 'csv-parse/sync'
import { coalesce } from './repository/coalesce'
import { outputFileSync } from 'fs-extra'
import { State } from './State'
import { saveModel } from './model'

const properties = JSON.parse(
  readFileSync('properties.json', 'utf8')
) as Properties

const file = 'model.csv'
const columns = readFileSync(file, 'utf-8')
const databaseColumns: Data[] = parse(columns, {
  delimiter: ',',
  columns: true,
  comment: '#',
})

const state = new State(databaseColumns)

// saveModel(state, properties)

// console.log(state.columns)
// console.log(state.properties)
// console.log(state.getters)
// console.log(state.setters)
// console.log(state.optionals)
// saveRepo(databaseColumns, properties)
// saveClass(databaseColumns, properties)
// saveService(properties)
