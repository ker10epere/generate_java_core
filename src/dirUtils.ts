import { join } from 'path'
import {
  getRepositoryImplName,
  getRepositoryName,
  getServiceImplName,
  getServiceName,
} from './nameUtils'

const modelPath = (className: string): string =>
  join(__dirname, '..', `/generated/${className}/model`, `${className}.java`)

const repoPath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/${className}/repository`,
    `${getRepositoryName(className)}.java`
  )

const repoImplPath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/${className}/repository/impl`,
    `${getRepositoryImplName(className)}.java`
  )

const servicePath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/${className}/service`,
    `${getServiceName(className)}.java`
  )

const serviceImplPath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/${className}/service/impl`,
    `${getServiceImplName(className)}.java`
  )

export { modelPath, repoPath, repoImplPath, servicePath, serviceImplPath }
