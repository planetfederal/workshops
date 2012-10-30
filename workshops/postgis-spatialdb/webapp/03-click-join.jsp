<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" %>

<html>
<head>
<link rel="stylesheet" href="style.css" type="text/css" />
</head>
<body style="width:95%">

<h2>Zoning Summary (<c:out value="${param.radius}"/> feet)</h2>

<sql:query var="rs" dataSource="jdbc/medford">
select 
  count(*) as num_lots,
  round(sum(st_area(taxlot.the_geom))::numeric/43560,1) || ' acres' as total_lot_area, 
  zone.zoning as zoning,
  '$' || sum(taxlot.landvalue)::integer as total_land_value,
  '$' || (sum(taxlot.landvalue) / sum(st_area(taxlot.the_geom)))::integer || ' / sqft' as value_per_ft
from 
  medford.taxlots taxlot join medford.zoning zone 
  on (st_contains(zone.the_geom, st_centroid(taxlot.the_geom)))
where
  st_dwithin(
    taxlot.the_geom,
    st_transform(
      st_setsrid(
        st_makepoint(${param.lon},${param.lat}),
        4326),
      2270),
    ${param.radius}
  )
group by zone.zoning
order by total_lot_area desc
</sql:query>

<table cellpadding="4">
 <tr>
  <th>Zoning</th>
  <th># of Lots</th>
  <th>Total Lot Area</th>
  <th>Total Land Value</th>
  <th>$ / SqFt</th>
 </tr>
<c:forEach var="row" items="${rs.rows}">
 <tr>
  <th><c:out value="${row.zoning}"/></th>
  <td><c:out value="${row.num_lots}"/></td>
  <td><c:out value="${row.total_lot_area}"/></td>
  <td><c:out value="${row.total_land_value}"/></td>
  <td><c:out value="${row.value_per_ft}"/></td>
 </tr>
</c:forEach>
</table>

</body>
</html>
