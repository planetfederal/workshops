<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/x-json" %>

<sql:query var="rs" dataSource="jdbc/medford">
${param.sql}
</sql:query>

{"type":"FeatureCollection",
 "features":[
<c:forEach var="row" items="${rs.rows}" varStatus="rowStatus">
<c:set var="propCount" value="0"/>
 {"type":"Feature",
  "geometry":<c:out value="${row.st_asgeojson}" escapeXml="false" />,
  "properties":{
  <c:forEach var="column" items="${row}" varStatus="columnStatus">
   <c:if test="${column.key != 'st_asgeojson'}">
    <c:if test="${propCount > 0}">,</c:if>
    "<c:out value="${column.key}" escapeXml="false" />":"<c:out value="${column.value}" escapeXml="false" />"
    <c:set var="propCount" value="${propCount + 1}"/>
   </c:if>
  </c:forEach>
 } }
 <c:if test="${! rowStatus.last}">,</c:if>
</c:forEach>
]}