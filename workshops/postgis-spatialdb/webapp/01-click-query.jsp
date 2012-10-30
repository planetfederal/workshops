<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" %>

<sql:query var="rs" dataSource="jdbc/medford">
select 
  st_geometrytype(the_geom) as geometrytype,
  st_area(the_geom) as area,  
  *
from ${param.table}
where
  st_contains(
    the_geom,
    st_transform(
      st_setsrid(
        st_makepoint(${param.lon},${param.lat}),
        4326),
      2270))
</sql:query>

<html>
<head>
<link rel="stylesheet" href="style.css" type="text/css" />
</head>
<body style="width:95%">
<c:forEach var="row" items="${rs.rows}">
 <table>
  <c:forEach var="column" items="${row}">
   <c:if test="${column.key != 'the_geom'}">
   <tr>
    <th><c:out value="${column.key}"/></th>
    <td><c:out value="${column.value}"/></td>
   </tr>
   </c:if>
  </c:forEach>
 </table>
</c:forEach>
</body>
</html>
