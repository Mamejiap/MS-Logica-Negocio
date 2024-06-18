import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {ClientePlan, ClientePlanRelations, Factura, Cliente} from '../models';
import {FacturaRepository} from './factura.repository';
import {ClienteRepository} from './cliente.repository';

export class ClientePlanRepository extends DefaultCrudRepository<
  ClientePlan,
  typeof ClientePlan.prototype.id,
  ClientePlanRelations
> {

  public readonly factura: HasOneRepositoryFactory<Factura, typeof ClientePlan.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof ClientePlan.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(ClientePlan, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
