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
import {SedesFuneraria} from '../models';
import {SedesFunerariaRepository} from '../repositories';

export class SedeFunerariaController {
  constructor(
    @repository(SedesFunerariaRepository)
    public sedesFunerariaRepository : SedesFunerariaRepository,
  ) {}

  @post('/sede-funeraria')
  @response(200, {
    description: 'SedesFuneraria model instance',
    content: {'application/json': {schema: getModelSchemaRef(SedesFuneraria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedesFuneraria, {
            title: 'NewSedesFuneraria',
            exclude: ['id'],
          }),
        },
      },
    })
    sedesFuneraria: Omit<SedesFuneraria, 'id'>,
  ): Promise<SedesFuneraria> {
    return this.sedesFunerariaRepository.create(sedesFuneraria);
  }

  @get('/sede-funeraria/count')
  @response(200, {
    description: 'SedesFuneraria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SedesFuneraria) where?: Where<SedesFuneraria>,
  ): Promise<Count> {
    return this.sedesFunerariaRepository.count(where);
  }

  @get('/sede-funeraria')
  @response(200, {
    description: 'Array of SedesFuneraria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SedesFuneraria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SedesFuneraria) filter?: Filter<SedesFuneraria>,
  ): Promise<SedesFuneraria[]> {
    return this.sedesFunerariaRepository.find(filter);
  }

  @patch('/sede-funeraria')
  @response(200, {
    description: 'SedesFuneraria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedesFuneraria, {partial: true}),
        },
      },
    })
    sedesFuneraria: SedesFuneraria,
    @param.where(SedesFuneraria) where?: Where<SedesFuneraria>,
  ): Promise<Count> {
    return this.sedesFunerariaRepository.updateAll(sedesFuneraria, where);
  }

  @get('/sede-funeraria/{id}')
  @response(200, {
    description: 'SedesFuneraria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SedesFuneraria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SedesFuneraria, {exclude: 'where'}) filter?: FilterExcludingWhere<SedesFuneraria>
  ): Promise<SedesFuneraria> {
    return this.sedesFunerariaRepository.findById(id, filter);
  }

  @patch('/sede-funeraria/{id}')
  @response(204, {
    description: 'SedesFuneraria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedesFuneraria, {partial: true}),
        },
      },
    })
    sedesFuneraria: SedesFuneraria,
  ): Promise<void> {
    await this.sedesFunerariaRepository.updateById(id, sedesFuneraria);
  }

  @put('/sede-funeraria/{id}')
  @response(204, {
    description: 'SedesFuneraria PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sedesFuneraria: SedesFuneraria,
  ): Promise<void> {
    await this.sedesFunerariaRepository.replaceById(id, sedesFuneraria);
  }

  @del('/sede-funeraria/{id}')
  @response(204, {
    description: 'SedesFuneraria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sedesFunerariaRepository.deleteById(id);
  }
}
