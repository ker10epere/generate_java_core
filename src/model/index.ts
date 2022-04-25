import { outputFileSync } from 'fs-extra'
import { State } from '../State'
import { modelPath } from '../dirUtils'

export function saveModel(state: State, props: Properties): void {
  const { properties, getters, setters, optionals } = state
  const { className } = props
  let classBody: string[] = Object.assign([], properties)

  for (let i = 0; i < state.length; i++) {
    classBody.push(getters[i])
    classBody.push(setters[i])
  }

  const classTemplate = `@JsonInclude(NON_NULL)
@JsonIgnoreProperties({"name", "description"})
public class ${className} extends AbstractModel {
// TODO: constructors
${classBody.join('\n\n')}

${optionals.join('\n\n')}
// TODO: toString()
}
`
  // console.log(`${modelPath}/${fileName}`)
  outputFileSync(modelPath(className), classTemplate)
}
