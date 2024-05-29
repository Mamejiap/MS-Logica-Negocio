import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Pqrs, PqrsRelations} from '../models';

export class PqrsRepository extends DefaultCrudRepository<
  Pqrs,
  typeof Pqrs.prototype.id_Pqrs,
  PqrsRelations
> {
  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource,
  ) {
    super(Pqrs, dataSource);
  }
}
