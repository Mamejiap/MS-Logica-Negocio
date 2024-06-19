import {Model, model, property} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';

@model()
export class PaginadorSolicitud extends Model {
  @property({
    type: 'number',
    required: true,
  })
  totalRegistros: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  registros: Solicitudes[];


  constructor(data?: Partial<PaginadorSolicitud>) {
    super(data);
  }
}

export interface PaginadorSolicitudRelations {
  // describe navigational properties here
}

export type PaginadorSolicitudWithRelations = PaginadorSolicitud & PaginadorSolicitudRelations;
