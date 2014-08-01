.. _cmd.troubleshooting:

Troubleshooting
===============

Sometimes during the process of working with a GeoGig repository, an error will occur. When this happens, it is important to know what to do.

When you run a GeoGig command, you may see an error. In some cases, the error may be descriptive, but in other situations, you may have to do more investigation.

Logs
----

Every GeoGig repository contains its own log file. This file is located at :file:`.geogig/log/geogig.log`. In this file, more details of the error will be shown as standard Java stack traces. While these can be verbose, they will usually contain more specifics as to what the problem is.

For example, here is the log file output that shows when a connection parameter was input incorrectly (for example, running an ``import`` command but specifying the wrong port):

::

    2014-08-01 11:38:50,557 ERROR [main] o.g.c.GeogitCLI [GeogitCLI.java:399] null
    org.apache.commons.dbcp.SQLNestedException: Cannot create PoolableConnectionFactory (Protocol error.  Session setup failed.)
      at org.apache.commons.dbcp.BasicDataSource.createPoolableConnectionFactory(BasicDataSource.java:1549) ~[commons-dbcp-1.3.jar:1.3]
      at org.apache.commons.dbcp.BasicDataSource.createDataSource(BasicDataSource.java:1388) ~[commons-dbcp-1.3.jar:1.3]
      at org.apache.commons.dbcp.BasicDataSource.getConnection(BasicDataSource.java:1044) ~[commons-dbcp-1.3.jar:1.3]
      at org.geotools.data.jdbc.datasource.AbstractManageableDataSource.getConnection(AbstractManageableDataSource.java:48) ~[gt-jdbc-10.5.jar:na]
      at org.geogit.geotools.cli.porcelain.AbstractPGCommand.getDataStore(AbstractPGCommand.java:78) ~[geogit-geotools-0.10.0.jar:0.10.0]
      at org.geogit.geotools.cli.porcelain.PGImport.runInternal(PGImport.java:76) ~[geogit-geotools-0.10.0.jar:0.10.0]
      at org.geogit.cli.AbstractCommand.run(AbstractCommand.java:60) ~[geogit-cli-0.10.0.jar:0.10.0]
      at org.geogit.cli.GeogitCLI.executeInternal(GeogitCLI.java:521) [geogit-cli-0.10.0.jar:0.10.0]
      at org.geogit.cli.GeogitCLI.execute(GeogitCLI.java:379) [geogit-cli-0.10.0.jar:0.10.0]
      at org.geogit.cli.GeogitCLI.main(GeogitCLI.java:324) [geogit-cli-0.10.0.jar:0.10.0]
    Caused by: org.postgresql.util.PSQLException: Protocol error.  Session setup failed.
      at org.postgresql.core.v3.ConnectionFactoryImpl.doAuthentication(ConnectionFactoryImpl.java:402) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.core.v3.ConnectionFactoryImpl.openConnectionImpl(ConnectionFactoryImpl.java:108) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.core.ConnectionFactory.openConnection(ConnectionFactory.java:66) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.jdbc2.AbstractJdbc2Connection.<init>(AbstractJdbc2Connection.java:125) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.jdbc3.AbstractJdbc3Connection.<init>(AbstractJdbc3Connection.java:30) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.jdbc3.Jdbc3Connection.<init>(Jdbc3Connection.java:24) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.Driver.makeConnection(Driver.java:393) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.postgresql.Driver.connect(Driver.java:267) ~[postgresql-8.4-701.jdbc3.jar:na]
      at org.apache.commons.dbcp.DriverConnectionFactory.createConnection(DriverConnectionFactory.java:38) ~[commons-dbcp-1.3.jar:1.3]
      at org.apache.commons.dbcp.PoolableConnectionFactory.makeObject(PoolableConnectionFactory.java:582) ~[commons-dbcp-1.3.jar:1.3]
      at org.apache.commons.dbcp.BasicDataSource.validateConnectionFactory(BasicDataSource.java:1556) ~[commons-dbcp-1.3.jar:1.3]
      at org.apache.commons.dbcp.BasicDataSource.createPoolableConnectionFactory(BasicDataSource.java:1545) ~[commons-dbcp-1.3.jar:1.3]
      ... 9 common frames omitted

#. Open your repository's log file in a text editor.

#. View errors in the log file, if any. (They will include the all-caps "ERROR" string.)

Reasons for errors
------------------

There are a few main reasons for errors when working with GeoGig.

Bad input
~~~~~~~~~

It is possible that the data that you wish to work with is not compatible with GeoGig. For example, GeoGig doesn't support multidimensional geometries, so you would have to convert them to 2D before importing.

Also, connection parameters, paths, authentication information, could all be input incorrectly. Or, if input correctly, perhaps the server that contains the connection is down.

Program errors
~~~~~~~~~~~~~~

GeoGig is a stable utility, but errors do arise. If you've checked all of your data, connections, and other parameters and you're sure that they are working correctly, you may have encountered a bug in GeoGig.

If that happens, please connect with the GeoGig development team and let us know. You can find out how to get in contact on the :ref:`moreinfo.resources` page.

