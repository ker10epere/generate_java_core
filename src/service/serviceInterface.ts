import { getServiceName } from '../nameUtils'

export const serviceInterface = (props: Properties): string => {
  const { className } = props
  const serviceName = getServiceName(props.className)

  return `public interface ${serviceName} extends AbstractService<${className}> { 
}`
}
