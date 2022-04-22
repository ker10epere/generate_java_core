export const list = (
  properties: Properties,
  columnNamesJoined: string,
  findIsPresentJoined: string,
  rsGetJoined: string,
  camelCasedPropertiesJoined: string
) => {
  return ` @Override
    public Collection<${properties.className}> list() throws ClassNotFoundException, SQLException, NamingException {
        return list(new ${properties.className}());
    }
  
    @Override
    public Collection<${properties.className}> list(${properties.className} item) throws ClassNotFoundException, SQLException, NamingException {
        final StringBuilder sb = new StringBuilder()//
                .append("SELECT ${columnNamesJoined} ")//
                .append(" FROM ").append(tableName).append(" WHERE 1=1 ");
  
        final List<Object> values = new ArrayList<>();
  
        ${findIsPresentJoined}
  
        final List<${properties.className}> list = new ArrayList<>();
        ResultSet rs = null;
        try (Connection cn = getConnection(); PreparedStatement ps = cn.prepareStatement(sb.toString());) {
            SetPreparedStatement.set(ps, values);
            sql(ps);
            rs = ps.executeQuery();
            while (rs.next()) {
                ${rsGetJoined}
                
                list.add(new ${properties.className}(${camelCasedPropertiesJoined});
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
