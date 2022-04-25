import { join } from 'path'
import fs from 'fs-extra'
import { serviceImplPath, servicePath } from '../dirUtils'
import { classImpl } from './classImpl'
import { serviceInterface } from './serviceInterface'

export default function saveService(props: Properties) {
  const { className } = props

  const service = serviceInterface(props)
  const serviceImpl = classImpl(props)

  fs.outputFileSync(serviceImplPath(className), serviceImpl)
  fs.outputFileSync(servicePath(className), service)
}
