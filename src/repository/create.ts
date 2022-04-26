import { State } from '../State'

export const create = (state: State, props: Properties): string => {
  const { columns, getterNames } = state
  const { className } = props

  const columnWithoutId: string[] = []
  const placeHolderValues: string[] = []

  for (let i = 1; i < state.length; i++) {
    columnWithoutId.push(columns[i])
    placeHolderValues.push(
      `                values.add(item.${getterNames[i]}());`
    )
  }

  const joinedColumnNamesWithoutId = columnWithoutId.join(' , ')
  const joinedPlaceHolderSymbolWithoutId = columnWithoutId
    .map((i) => '?')
    .join(' , ')
  const joinedPlaceHolderValues = placeHolderValues.join('\n')

  return `@Override
public void create(List<${className}> items) throws ClassNotFoundException, SQLException, NamingException {
    final StringBuilder sb = new StringBuilder()//
            .append("INSERT INTO ")
            .append(tableName)
            .append(" ( ${joinedColumnNamesWithoutId} ) ")
            .append(" VALUES ")
            .append(" (  ${joinedPlaceHolderSymbolWithoutId}  ) RETURNING id ");

    try (Connection cn = getConnection();) {
        cn.setAutoCommit(false);

        try (PreparedStatement ps = cn.prepareStatement(sb.toString());) {
            for (Recipient item : items) {
                debug(item);

                final List<Object> values = new ArrayList<>();

${joinedPlaceHolderValues}

                SetPreparedStatement.set(ps, values);
                ps.addBatch();
            }

            final int[] results = ps.executeBatch();
            final String batchResult = IntStream.of(results)
                    .mapToObj(Integer::toString)
                    .collect(Collectors.joining(" , "));

            debug("batch insert = " + batchResult);
        } catch (Throwable e) {
            e.printStackTrace();
            cn.rollback();
            cn.setAutoCommit(true);
            throw e;
        }
        cn.commit();
        cn.setAutoCommit(true);
    } catch (Throwable e) {
        error(ThrowableUtils.stringify(e));
        error(ThrowableUtils.stringify(e.getSuppressed()));
        throw e;
    }
}`
}
