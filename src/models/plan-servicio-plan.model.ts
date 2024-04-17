import {Entity, model, property} from '@loopback/repository';

@model()
export class PlanServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  @property({
    type: 'number',
  })
  servicioPlanId?: number;

  constructor(data?: Partial<PlanServicioPlan>) {
    super(data);
  }
}

export interface PlanServicioPlanRelations {
  // describe navigational properties here
}

export type PlanServicioPlanWithRelations = PlanServicioPlan & PlanServicioPlanRelations;
