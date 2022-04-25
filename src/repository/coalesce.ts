import { readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'
import { State } from '../State'

export const coalesce = (state: State): string => {
  return state.columns
    .filter((col) => col !== 'id')
    .reduce((acc, curr) => {
      return [...acc, ` ${curr} = COALESCE( ? , ${curr} ) `]
    }, [] as String[])
    .join('\n, ')
}
