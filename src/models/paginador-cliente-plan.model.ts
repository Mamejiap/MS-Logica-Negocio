import {Model, model, property} from '@loopback/repository';
import {ClientePlan} from './cliente-plan.model';

@model()
export class PaginadorClientePlan extends Model {
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
  registros: ClientePlan[];


  constructor(data?: Partial<PaginadorClientePlan>) {
    super(data);
  }
}

export interface PaginadorClientePlanRelations {
  // describe navigational properties here
}

export type PaginadorClientePlanWithRelations = PaginadorClientePlan & PaginadorClientePlanRelations;
