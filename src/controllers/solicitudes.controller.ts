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
import {PaginadorSolicitud, Solicitudes} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository : SolicitudesRepository,
  ) {}

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuSolicitudesId, ConfiguracionSeguridad.guardarAccion]
  })

  @post('/solicitud')
  @response(200, {
    description: 'Solicitudes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudes',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.solicitudesRepository.create(solicitudes);
  }

  @get('/solicitud/count')
  @response(200, {
    description: 'Solicitudes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitudes) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.solicitudesRepository.count(where);
  }

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuSolicitudesId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/solicitud')
  @response(200, {
    description: 'Array of Solicitudes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaginadorSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitudes) filter?: Filter<Solicitudes>,
  ): Promise<object> {
    const total: number = (await this.solicitudesRepository.count()).count;
    const registros: Solicitudes[] = await this.solicitudesRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total,
    };
    return respuesta;
  }

  @patch('/solicitud')
  @response(200, {
    description: 'Solicitudes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Solicitudes,
    @param.where(Solicitudes) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.solicitudesRepository.updateAll(solicitudes, where);
  }

  @get('/solicitud/{id}')
  @response(200, {
    description: 'Solicitudes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitudes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Solicitudes, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitudes>
  ): Promise<Solicitudes> {
    return this.solicitudesRepository.findById(id, filter);
  }

  @patch('/solicitud/{id}')
  @response(204, {
    description: 'Solicitudes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Solicitudes,
  ): Promise<void> {
    await this.solicitudesRepository.updateById(id, solicitudes);
  }

  @put('/solicitud/{id}')
  @response(204, {
    description: 'Solicitudes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudes: Solicitudes,
  ): Promise<void> {
    await this.solicitudesRepository.replaceById(id, solicitudes);
  }

  @del('/solicitud/{id}')
  @response(204, {
    description: 'Solicitudes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudesRepository.deleteById(id);
  }
}
