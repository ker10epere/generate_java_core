import { State } from '../State'

export const insert = (state: State, props: Properties): string => {
  const { columns, getterNames } = state
  const { className } = props
  let noIdColumns: string[] = []
  const placeHolderValues = []
  for (let i = 1; i < state.length; i++) {
    noIdColumns.push(columns[i])
    const placeHolderValue = `        values.add(item.${getterNames[i]}());`
    placeHolderValues.push(placeHolderValue)
  }

  let joinedValues = noIdColumns.map((col) => ' ? ').join(',')
  let joinedColumns = noIdColumns.join(' , ')

  return `@Override
    public ${className} insert(${className} item) throws ClassNotFoundException, SQLException, NamingException {
        debug(item);
        final StringBuilder sb = new StringBuilder()//
                .append("INSERT INTO ")
                .append(tableName)
                .append(" ( ${joinedColumns} ) ")
                .append(" VALUES ")
                .append(" ( ${joinedValues} )  RETURNING id ");
        final List<Object> values = new ArrayList<>();
        Long id = null;
        ResultSet rs = null;

${placeHolderValues.join('\n')}

        try (Connection cn = getConnection(); PreparedStatement ps = cn.prepareStatement(sb.toString());) {
            SetPreparedStatement.set(ps, values);
            sql(ps);
            ps.execute();
            rs = ps.getGeneratedKeys();
            while (rs.next()) {
                id = rs.getLong("id");
            }
        } catch (Throwable e) {
            String throwables = ThrowableUtils.stringifyThrowables(e.getSuppressed());
            error(throwables);
            throw e;
        } finally {
          if (rs != null) rs.close();
      }
        return new ${className}(id);
    }`
}
