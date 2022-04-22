import { readFileSync, writeFileSync, createReadStream } from 'fs'
import { resolve, join } from 'path'
import { parse } from 'csv-parse/sync'
import camelcase from 'camelcase'

// const properties = JSON.parse(
//   readFileSync('properties.json', 'utf8')
// ) as Properties

// const file = 'model.csv'
// const columns = readFileSync(file, 'utf-8')
// const databaseColumns: Data[] = parse(columns, {
//   delimiter: ',',
//   columns: true,
// })
