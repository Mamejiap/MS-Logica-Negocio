import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Cliente, ClienteRelations, Beneficiario, Plan, ClientePlan, Resenas, Pqrs2} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';
import {ClientePlanRepository} from './cliente-plan.repository';
import {PlanRepository} from './plan.repository';
import {ResenasRepository} from './resenas.repository';
import {Pqrs2Repository} from './pqrs2.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly beneficiarios: HasManyRepositoryFactory<Beneficiario, typeof Cliente.prototype.id>;

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          ClientePlan,
          typeof Cliente.prototype.id
        >;

  public readonly resenas: HasManyRepositoryFactory<Resenas, typeof Cliente.prototype.id>;

  public readonly pqrs2s: HasManyRepositoryFactory<Pqrs2, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ResenasRepository') protected resenasRepositoryGetter: Getter<ResenasRepository>, @repository.getter('Pqrs2Repository') protected pqrs2RepositoryGetter: Getter<Pqrs2Repository>,
  ) {
    super(Cliente, dataSource);
    this.pqrs2s = this.createHasManyRepositoryFactoryFor('pqrs2s', pqrs2RepositoryGetter,);
    this.registerInclusionResolver('pqrs2s', this.pqrs2s.inclusionResolver);
    this.resenas = this.createHasManyRepositoryFactoryFor('resenas', resenasRepositoryGetter,);
    this.registerInclusionResolver('resenas', this.resenas.inclusionResolver);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.beneficiarios = this.createHasManyRepositoryFactoryFor('beneficiarios', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiarios', this.beneficiarios.inclusionResolver);
  }
}
