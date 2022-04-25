import { readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

const file = 'table'
// const fileDir = join(__dirname, 'columns')

// const columns: String[] = readFileSync(file, 'utf-8').split(/\r?\n/)
// const tableName = columns.shift()

export const coalesce = (columns: string[], tableName: string): string => {
  const coalesce = columns
    .reduce((acc, curr) => {
      return [...acc, ` ${curr} = COALESCE( ? , ${curr} ) `]
    }, [] as String[])
    .join('\n, ')

  const updateQuery = `SET ${tableName} UPDATE ${coalesce} WHERE id = 1 `

  return updateQuery
  // const fileOut = `UPDATE-${tableName}.sql`
  // writeFileSync(fileOut, updateQuery)
  // console.log(columns)
}
