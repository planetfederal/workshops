<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" %>

<html>
<head>
<link rel="stylesheet" href="style.css" type="text/css" />
</head>
<body style="width:95%">

<h2>Neighborhood Summary (<c:out value="${param.radius}"/> feet)</h2>

<sql:query var="rs" dataSource="jdbc/medford">
select 
  count(*) as "Number of Lots",
  round(avg(st_area(the_geom))::numeric/43560,1) || ' acres' as "Average Lot Area", 
  '$' || avg(impvalue)::integer as "Average Improvement Value",
  '$' || avg(landvalue)::integer as "Average Land Value",
  '$' || avg(impvalue+landvalue)::integer as "Average Total Value", 
  avg(yearblt)::integer as "Average Year Built"
from medford.taxlots
where
  st_dwithin(
    the_geom,
    st_transform(
      st_setsrid(
        st_makepoint(${param.lon},${param.lat}),
        4326),
      2270),
    ${param.radius}
  )
</sql:query>

<c:forEach var="row" items="${rs.rows}">
 <table>
  <c:forEach var="column" items="${row}">
   <tr>
    <th><c:out value="${column.key}"/></th>
    <td><c:out value="${column.value}"/></td>
   </tr>
  </c:forEach>
 </table>
</c:forEach>

</body>
</html>
