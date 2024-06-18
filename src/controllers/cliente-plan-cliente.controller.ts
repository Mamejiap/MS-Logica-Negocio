import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClientePlan,
  Cliente,
} from '../models';
import {ClientePlanRepository} from '../repositories';

export class ClientePlanClienteController {
  constructor(
    @repository(ClientePlanRepository)
    public clientePlanRepository: ClientePlanRepository,
  ) { }

  @get('/cliente-plans/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to ClientePlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof ClientePlan.prototype.id,
  ): Promise<Cliente> {
    return this.clientePlanRepository.cliente(id);
  }
}
