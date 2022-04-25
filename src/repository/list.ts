import { State } from '../State'

export const list = (state: State, props: Properties) => {
  const { className } = props
  const { columns, properties, optionalNames, dataTypes, propertyNames } = state

  const conditionals: string[] = []
  const rsGetters: string[] = []
  for (let i = 0; i < state.length; i++) {
    const conditional = `item.${optionalNames[i]}().ifPresent(listConsumer(sb, "${columns[i]}", values));`

    const rsGetter = `final ${dataTypes[i]} ${propertyNames[i]} = rs.get${dataTypes[i]}("${columns[i]}");`

    conditionals.push(conditional)
    rsGetters.push(rsGetter)
  }
  const joinedColumn = columns.join(', ')
  const joinedPropertyNames = propertyNames.join(', ')
  const joinRsGetters = rsGetters.join('\n')

  return `  @Override
    public Collection<${className}> list() throws ClassNotFoundException, SQLException, NamingException {
        return list(new ${className}());
    }

    @Override
    public Collection<${className}> list(${className} item) throws ClassNotFoundException, SQLException, NamingException {
        final StringBuilder sb = new StringBuilder()//
                .append("SELECT ${joinedColumn} ")//
                .append(" FROM ").append(tableName).append(" WHERE 1=1 ");

        final List<Object> values = new ArrayList<>();

        ${conditionals.join('\n')}

        final List<${className}> list = new ArrayList<>();
        ResultSet rs = null;
        try (Connection cn = getConnection(); PreparedStatement ps = cn.prepareStatement(sb.toString());) {
            SetPreparedStatement.set(ps, values);
            sql(ps);
            rs = ps.executeQuery();
            while (rs.next()) {
                ${joinRsGetters}
                
                list.add(new ${className}(${joinedPropertyNames});
            }

        } catch (Throwable e) {
            String throwables = ThrowableUtils.stringifyThrowables(e.getSuppressed());
            error(throwables);
            throw e;
        } finally {
            if (rs != null) rs.close();
        }

        return list;
    }`
}
