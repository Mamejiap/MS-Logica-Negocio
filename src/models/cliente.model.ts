import {Entity, model, property, hasMany} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {Plan} from './plan.model';
import {ClientePlan} from './cliente-plan.model';
import {Resenas} from './resenas.model';
import {Pqrs2} from './pqrs2.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
    required: true,
  })
  celular: number;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaRegistro: string;

  @property({
    type: 'string',
    required: false,
  })
  foto: string;

  @hasMany(() => Beneficiario)
  beneficiarios: Beneficiario[];

  @hasMany(() => Plan, {through: {model: () => ClientePlan}})
  planes: Plan[];

  @hasMany(() => Resenas)
  resenas: Resenas[];

  @hasMany(() => Pqrs2)
  pqrs2s: Pqrs2[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
