const getRepositoryName = (className: string): string => {
  return `${className}Repository`
}
const getRepositoryImplName = (className: string): string => {
  return `${className}RepositoryImpl`
}
const getServiceName = (className: string): string => {
  return `${className}Service`
}
const getServiceImplName = (className: string): string => {
  return `${className}ServiceImpl`
}

export {
  getRepositoryName,
  getRepositoryImplName,
  getServiceName,
  getServiceImplName,
}
