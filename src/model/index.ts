import fs from 'fs-extra'
import { resolve, join } from 'path'
import { parse } from 'csv-parse/sync'
import camelcase from 'camelcase'
import { State } from '../State'

export function saveModel(state: State, props: Properties) {
  const fileName = `${props.className}.java`
  let classBody: string[] = Object.assign([], state.properties)

  for (let i = 0; i < state.length; i++) {
    classBody.push(state.getters[i])
    classBody.push(state.setters[i])
  }

  const classTemplate = `@JsonInclude(NON_NULL)
@JsonIgnoreProperties({"name", "description"})
public class ${props.className} extends AbstractModel {
// TODO: constructors
${classBody.join('\n')}
// TODO: toString()
}
`
  const outDirPath = join(__dirname, '..', `/generated/model/`)
  fs.outputFileSync(join(outDirPath, `${fileName}`), classTemplate)
}
