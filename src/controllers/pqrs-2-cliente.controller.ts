import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pqrs2,
  Cliente,
} from '../models';
import {Pqrs2Repository} from '../repositories';

export class Pqrs2ClienteController {
  constructor(
    @repository(Pqrs2Repository)
    public pqrs2Repository: Pqrs2Repository,
  ) { }

  @get('/pqrs2s/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Pqrs2',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Pqrs2.prototype.id,
  ): Promise<Cliente> {
    return this.pqrs2Repository.pqrsClientes(id);
  }
}
