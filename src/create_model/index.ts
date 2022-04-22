import { readFileSync, writeFileSync, createReadStream } from 'fs'
import { resolve, join } from 'path'
import { parse } from 'csv-parse/sync'
import camelcase from 'camelcase'
// console.log(camelcase('as_haha'))

// const file = 'model.csv'
// const columns = readFileSync(file, 'utf-8')
// const databaseColumns: Data[] = parse(columns, {
//   delimiter: ',',
//   columns: true,
// })

function generate_class(databaseColumns: Data[], properties: Properties) {
  const getModelProperties = databaseColumns.reduce((acc, curr) => {
    return [...acc, transformToGetter(curr)]
  }, [] as ClassModel[])

  function transformToGetter(item: Data): ClassModel {
    // camel_case => camelCase
    const propertyName = camelcase(item.columnName)

    // get_camel_case => getCamelCase
    const getMethodName = camelcase(`get_${item.columnName}`)
    // set_camel_case => setCamelCase
    const setMethodName = camelcase(`set_${item.columnName}`)
    // find_camel_case => findCamelCase
    const optionalMethodName = camelcase(`find_${item.columnName}`)

    const classProperties = `
private ${item.dataType} ${propertyName};`

    const getterMethod = `
public ${item.dataType} ${getMethodName}() {
    return ${propertyName};
}`
    const setterMethod = `
public void ${setMethodName}(${item.dataType} ${propertyName}) {
    this.${propertyName} = ${propertyName};
}`
    const optionalMethod = `
public Optional<${item.dataType}> ${optionalMethodName}() {
    return Optional.ofNullable(${propertyName});
}`

    return {
      classProperties,
      getterMethod,
      setterMethod,
      optionalMethod,
    }
  }

  const classProperties: string[] = []
  const optionalGetters: string[] = []

  const getterSetter = getModelProperties.reduce((acc, curr) => {
    classProperties.push(curr.classProperties)
    optionalGetters.push(curr.optionalMethod)
    return [...acc, curr.getterMethod, curr.setterMethod, curr.optionalMethod]
  }, [] as string[])

  getModelProperties.forEach((item) => {})

  const classBody: string = ['']
    .concat(classProperties, getterSetter, optionalGetters)
    .join('\n')

  const classTemplate = `
@JsonInclude(NON_NULL)
@JsonIgnoreProperties({"name", "description"})
public class ####### extends AbstractModel {
// TODO: constructors
${classBody}

// TODO: toString()
}

`

  writeFileSync('test.java', classTemplate)
}
