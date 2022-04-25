import { outputFileSync } from 'fs-extra'
import { State } from '../State'
import { modelPath } from '../dirUtils'

export function saveModel(state: State, props: Properties): void {
  const { className } = props
  let classBody: string[] = Object.assign([], state.properties)

  for (let i = 0; i < state.length; i++) {
    classBody.push(state.getters[i])
    classBody.push(state.setters[i])
  }

  const classTemplate = `@JsonInclude(NON_NULL)
@JsonIgnoreProperties({"name", "description"})
public class ${className} extends AbstractModel {
// TODO: constructors
${classBody.join('\n')}
// TODO: toString()
}
`
  // console.log(`${modelPath}/${fileName}`)
  outputFileSync(modelPath(className), classTemplate)
}
