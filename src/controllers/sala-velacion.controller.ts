import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {PaginadorSalaVelacion, SalaVelacion} from '../models';
import {SalaVelacionRepository} from '../repositories';

export class SalaVelacionController {
  constructor(
    @repository(SalaVelacionRepository)
    public salaVelacionRepository: SalaVelacionRepository,
  ) { }

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuSalaVelacionId, ConfiguracionSeguridad.guardarAccion]
  })

  @post('/sala-velacion')
  @response(200, {
    description: 'SalaVelacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(SalaVelacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaVelacion, {
            title: 'NewSalaVelacion',
            exclude: ['id'],
          }),
        },
      },
    })
    salaVelacion: Omit<SalaVelacion, 'id'>,
  ): Promise<SalaVelacion> {
    return this.salaVelacionRepository.create(salaVelacion);
  }

  @get('/sala-velacion/count')
  @response(200, {
    description: 'SalaVelacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SalaVelacion) where?: Where<SalaVelacion>,
  ): Promise<Count> {
    return this.salaVelacionRepository.count(where);
  }

  @get('/sala-velacion')
  @response(200, {
    description: 'Array of SalaVelacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaginadorSalaVelacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SalaVelacion) filter?: Filter<SalaVelacion>,
  ): Promise<object> {
    const total: number = (await this.salaVelacionRepository.count()).count;
    const registros: SalaVelacion[] = await this.salaVelacionRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total,
    };
    return respuesta;
  }

  @patch('/sala-velacion')
  @response(200, {
    description: 'SalaVelacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaVelacion, {partial: true}),
        },
      },
    })
    salaVelacion: SalaVelacion,
    @param.where(SalaVelacion) where?: Where<SalaVelacion>,
  ): Promise<Count> {
    return this.salaVelacionRepository.updateAll(salaVelacion, where);
  }

  @get('/sala-velacion/{id}')
  @response(200, {
    description: 'SalaVelacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SalaVelacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalaVelacion, {exclude: 'where'}) filter?: FilterExcludingWhere<SalaVelacion>
  ): Promise<SalaVelacion> {
    return this.salaVelacionRepository.findById(id, filter);
  }

  @patch('/sala-velacion/{id}')
  @response(204, {
    description: 'SalaVelacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaVelacion, {partial: true}),
        },
      },
    })
    salaVelacion: SalaVelacion,
  ): Promise<void> {
    await this.salaVelacionRepository.updateById(id, salaVelacion);
  }

  @put('/sala-velacion/{id}')
  @response(204, {
    description: 'SalaVelacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salaVelacion: SalaVelacion,
  ): Promise<void> {
    await this.salaVelacionRepository.replaceById(id, salaVelacion);
  }

  @del('/sala-velacion/{id}')
  @response(204, {
    description: 'SalaVelacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salaVelacionRepository.deleteById(id);
  }
}
