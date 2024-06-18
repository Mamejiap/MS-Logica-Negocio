import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  Pqrs2,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePqrs2Controller {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/pqrs2s', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Pqrs2',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pqrs2)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pqrs2>,
  ): Promise<Pqrs2[]> {
    return this.clienteRepository.pqrs2s(id).find(filter);
  }

  @post('/clientes/{id}/pqrs2s', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pqrs2)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs2, {
            title: 'NewPqrs2InCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) pqrs2: Omit<Pqrs2, 'id'>,
  ): Promise<Pqrs2> {
    return this.clienteRepository.pqrs2s(id).create(pqrs2);
  }

  @patch('/clientes/{id}/pqrs2s', {
    responses: {
      '200': {
        description: 'Cliente.Pqrs2 PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs2, {partial: true}),
        },
      },
    })
    pqrs2: Partial<Pqrs2>,
    @param.query.object('where', getWhereSchemaFor(Pqrs2)) where?: Where<Pqrs2>,
  ): Promise<Count> {
    return this.clienteRepository.pqrs2s(id).patch(pqrs2, where);
  }

  @del('/clientes/{id}/pqrs2s', {
    responses: {
      '200': {
        description: 'Cliente.Pqrs2 DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pqrs2)) where?: Where<Pqrs2>,
  ): Promise<Count> {
    return this.clienteRepository.pqrs2s(id).delete(where);
  }
}
