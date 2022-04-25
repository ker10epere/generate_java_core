import { outputFileSync } from 'fs-extra'
import { repoImplPath, repoPath } from '../dirUtils'
import { saveModel } from '../model'
import { getRepositoryImplName, getRepositoryName } from '../nameUtils'
import { State } from '../State'
import { classImpl } from './classImpl'
import { coalesce } from './coalesce'
import { repositoryInterface } from './repositoryInterface'

export const saveRepository = (state: State, props: Properties): void => {
  const { className } = props

  const repoImpl = classImpl(state, props)
  const repoInterface = repositoryInterface(props)

  outputFileSync(repoImplPath(className), repoImpl)
  outputFileSync(repoPath(className), repoInterface)
  // const x = coalesce(props)
  // console.log(x)
}
