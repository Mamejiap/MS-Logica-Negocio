import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pqrs2} from '../models';
import {Pqrs2Repository} from '../repositories';

export class Pqrs2Controller {
  constructor(
    @repository(Pqrs2Repository)
    public pqrs2Repository : Pqrs2Repository,
  ) {}

  @post('/pqrs2s')
  @response(200, {
    description: 'Pqrs2 model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pqrs2)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs2, {
            title: 'NewPqrs2',
            exclude: ['id'],
          }),
        },
      },
    })
    pqrs2: Omit<Pqrs2, 'id'>,
  ): Promise<Pqrs2> {
    return this.pqrs2Repository.create(pqrs2);
  }

  @get('/pqrs2s/count')
  @response(200, {
    description: 'Pqrs2 model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pqrs2) where?: Where<Pqrs2>,
  ): Promise<Count> {
    return this.pqrs2Repository.count(where);
  }

  @get('/pqrs2s')
  @response(200, {
    description: 'Array of Pqrs2 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pqrs2, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pqrs2) filter?: Filter<Pqrs2>,
  ): Promise<Pqrs2[]> {
    return this.pqrs2Repository.find(filter);
  }

  @patch('/pqrs2s')
  @response(200, {
    description: 'Pqrs2 PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs2, {partial: true}),
        },
      },
    })
    pqrs2: Pqrs2,
    @param.where(Pqrs2) where?: Where<Pqrs2>,
  ): Promise<Count> {
    return this.pqrs2Repository.updateAll(pqrs2, where);
  }

  @get('/pqrs2s/{id}')
  @response(200, {
    description: 'Pqrs2 model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pqrs2, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pqrs2, {exclude: 'where'}) filter?: FilterExcludingWhere<Pqrs2>
  ): Promise<Pqrs2> {
    return this.pqrs2Repository.findById(id, filter);
  }

  @patch('/pqrs2s/{id}')
  @response(204, {
    description: 'Pqrs2 PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs2, {partial: true}),
        },
      },
    })
    pqrs2: Pqrs2,
  ): Promise<void> {
    await this.pqrs2Repository.updateById(id, pqrs2);
  }

  @put('/pqrs2s/{id}')
  @response(204, {
    description: 'Pqrs2 PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pqrs2: Pqrs2,
  ): Promise<void> {
    await this.pqrs2Repository.replaceById(id, pqrs2);
  }

  @del('/pqrs2s/{id}')
  @response(204, {
    description: 'Pqrs2 DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pqrs2Repository.deleteById(id);
  }
}
