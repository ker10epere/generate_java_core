import { State } from '../State'
import { coalesce } from './coalesce'

export const updateWithResult = (state: State, props: Properties): string => {
  const { className } = props
  const { getterNames } = state

  const placeHolderValues = []

  for (let i = 1; i < state.length; i++) {
    const placeHolderValue = `values.add(item.${getterNames[i]}());`
    placeHolderValues.push(placeHolderValue)
  }

  return `
  @Override
  public Integer updateWithResult(Client item) throws ClassNotFoundException, SQLException, NamingException {
      debug(item);
      final StringBuilder sb = new StringBuilder()//
              .append("UPDATE ")
              .append(tableName)
              .append(
" ${coalesce(state)} ")
              .append(" WHERE id = ? ");
      final List<Object> values = new ArrayList<>();
      Integer result = null;

      ${placeHolderValues.join('\n')}
      values.add(item.getId());
      
      try (Connection cn = getConnection(); PreparedStatement ps = cn.prepareStatement(sb.toString());) {
          SetPreparedStatement.set(ps, values);
          sql(ps);
          result = ps.executeUpdate();
          debug("result = " + result);
      } catch (Throwable e) {
          String throwables = ThrowableUtils.stringifyThrowables(e.getSuppressed());
          error(throwables);
          throw e;
      }
      return result;
  }
    `
}
