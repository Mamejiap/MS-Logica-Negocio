import {Model, model, property} from '@loopback/repository';
import {SalaVelacion} from './sala-velacion.model';

@model()
export class PaginadorSalaVelacion extends Model {
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
  registros: SalaVelacion[];


  constructor(data?: Partial<PaginadorSalaVelacion>) {
    super(data);
  }
}

export interface PaginadorSalaVelacionRelations {
  // describe navigational properties here
}

export type PaginadorSalaVelacionWithRelations = PaginadorSalaVelacion & PaginadorSalaVelacionRelations;
