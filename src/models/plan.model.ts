import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {ClientePlan} from './cliente-plan.model';
import {ServicioPlan} from './servicio-plan.model';
import {PlanServicioPlan} from './plan-servicio-plan.model';

@model({
})

export class Plan extends Entity {
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
  nombrePlan: string;

  @property({
    type: 'string',
  })
  detalle?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadBeneficiario: number;

  @property({
    type: 'string',
    required: true,
  })
  valorPlan: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @hasMany(() => Cliente, {through: {model: () => ClientePlan}})
  clientes: Cliente[];

  @hasMany(() => ServicioPlan, {through: {model: () => PlanServicioPlan}})
  serviciosPlan: ServicioPlan[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
