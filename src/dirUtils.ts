import { join } from 'path'
import {
  getRepositoryImplName,
  getRepositoryName,
  getServiceImplName,
  getServiceName,
} from './nameUtils'

const modelPath = (className: string): string =>
  join(__dirname, '..', `/generated/model`, `${className}.java`)

const repoPath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/repository`,
    `${getRepositoryName(className)}.java`
  )

const repoImplPath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/repository/impl`,
    `${getRepositoryImplName(className)}.java`
  )

const servicePath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/service`,
    `${getServiceName(className)}.java`
  )

const serviceImplPath = (className: string): string =>
  join(
    __dirname,
    '..',
    `/generated/service/impl`,
    `${getServiceImplName(className)}.java`
  )

export { modelPath, repoPath, repoImplPath, servicePath, serviceImplPath }
