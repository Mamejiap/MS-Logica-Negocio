import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Pqrs2, Pqrs2Relations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class Pqrs2Repository extends DefaultCrudRepository<
  Pqrs2,
  typeof Pqrs2.prototype.id,
  Pqrs2Relations
> {

  public readonly pqrsClientes: BelongsToAccessor<Cliente, typeof Pqrs2.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pqrs2, dataSource);
    this.pqrsClientes = this.createBelongsToAccessorFor('pqrsClientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('pqrsClientes', this.pqrsClientes.inclusionResolver);
  }
}
