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
import {Beneficiario, PaginadorBeneficiario} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioController {
  constructor(
    @repository(BeneficiarioRepository)
    public beneficiarioRepository : BeneficiarioRepository,
  ) {}

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.guardarAccion]
  })

  @post('/beneficiario')
  @response(200, {
    description: 'Beneficiario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Beneficiario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {
            title: 'NewBeneficiario',
            exclude: ['id'],
          }),
        },
      },
    })
    beneficiario: Omit<Beneficiario, 'id'>,
  ): Promise<Beneficiario> {
    return this.beneficiarioRepository.create(beneficiario);
  }

  @get('/beneficiario/count')
  @response(200, {
    description: 'Beneficiario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Beneficiario) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.count(where);
  }

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.listarAccion]
  })

  @get('/beneficiario')
  @response(200, {
    description: 'Array of Beneficiario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaginadorBeneficiario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Beneficiario) filter?: Filter<Beneficiario>,
  ): Promise<object> {
    const total: number = (await this.beneficiarioRepository.count()).count;
    const registros: Beneficiario[] = await this.beneficiarioRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total,
    };
    return respuesta;
  }

  @patch('/beneficiario')
  @response(200, {
    description: 'Beneficiario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Beneficiario,
    @param.where(Beneficiario) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.updateAll(beneficiario, where);
  }

  @get('/beneficiario/{id}')
  @response(200, {
    description: 'Beneficiario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Beneficiario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Beneficiario, {exclude: 'where'}) filter?: FilterExcludingWhere<Beneficiario>
  ): Promise<Beneficiario> {
    return this.beneficiarioRepository.findById(id, filter);
  }

  @patch('/beneficiario/{id}')
  @response(204, {
    description: 'Beneficiario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Beneficiario,
  ): Promise<void> {
    await this.beneficiarioRepository.updateById(id, beneficiario);
  }

  @put('/beneficiario/{id}')
  @response(204, {
    description: 'Beneficiario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() beneficiario: Beneficiario,
  ): Promise<void> {
    await this.beneficiarioRepository.replaceById(id, beneficiario);
  }

  @del('/beneficiario/{id}')
  @response(204, {
    description: 'Beneficiario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.beneficiarioRepository.deleteById(id);
  }
}
