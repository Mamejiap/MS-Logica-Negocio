import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysqlproy',
  connector: 'mysql',
  url: '',
  host: 'mysqlaws.c304moqwyl1q.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'Admin12345',
  database: 'funerariaDB'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlproyDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysqlproy';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlproy', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
