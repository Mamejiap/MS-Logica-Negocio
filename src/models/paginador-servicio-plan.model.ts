import {Model, model, property} from '@loopback/repository';
import {ServicioPlan} from './servicio-plan.model';

@model()
export class PaginadorServicioPlan extends Model {
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
  registros: ServicioPlan[];


  constructor(data?: Partial<PaginadorServicioPlan>) {
    super(data);
  }
}

export interface PaginadorServicioPlanRelations {
  // describe navigational properties here
}

export type PaginadorServicioPlanWithRelations = PaginadorServicioPlan & PaginadorServicioPlanRelations;
