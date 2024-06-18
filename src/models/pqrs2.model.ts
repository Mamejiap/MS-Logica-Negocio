import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Pqrs2 extends Entity {
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
  nombreCompleto: string;

  @property({
    type: 'string',
  })
  Correo?: string;

  @property({
    type: 'string',
    required: true,
  })
  Asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Cliente, {name: 'pqrsClientes'})
  clienteId: number;

  constructor(data?: Partial<Pqrs2>) {
    super(data);
  }
}

export interface Pqrs2Relations {
  // describe navigational properties here
}

export type Pqrs2WithRelations = Pqrs2 & Pqrs2Relations;
