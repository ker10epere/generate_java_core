import camelcase from 'camelcase'
export class State {
  private _columns: string[] = []
  private _properties: string[] = []
  private _setters: string[] = []
  private _getters: string[] = []
  private _optionals: string[] = []
  private _length: number = 0

  public constructor(data: Data[]) {
    data.forEach((v) => {
      const column = v.columnName
      const dataType = v.dataType
      this._length = data.length

      const propertyName = camelcase(column)
      const setterName = camelcase(`set_${column}`)
      const getterName = camelcase(`get_${column}`)
      const optionalName = camelcase(`find_${column}`)

      const property = `  private  ${dataType}  ${propertyName};`
      const setterMethod = `  public void ${setterName}(${dataType} ${propertyName}) {
    this.${propertyName} = ${propertyName};
  }
  `
      const getterMethod = `  public ${dataType} ${getterName}() {
    return ${propertyName};
  }
  `
      const optionalMethod = `  public Optional< ${dataType} > ${optionalName}() {
    return Optional.ofNullable(${propertyName});
  }
  `

      this._columns.push(column)
      this._properties.push(property)
      this._getters.push(getterMethod)
      this._setters.push(setterMethod)
      this._optionals.push(optionalMethod)
    })
  }
  public get columns(): string[] {
    return this._columns
  }
  public get properties(): string[] {
    return this._properties
  }
  public get setters(): string[] {
    return this._setters
  }
  public get getters(): string[] {
    return this._getters
  }
  public get optionals(): string[] {
    return this._optionals
  }
  public get length(): number {
    return this._length
  }
}
