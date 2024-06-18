import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys:
    {
      fkClientePlanClienteID: {
        name: 'fkClientePlanClienteID',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId'
      },
      fkClientePlanPlanID: {
        name: 'fkClientePlanPlanID',
        entity: 'Plan',
        entityKey: 'id',
        foreignKey: 'planId'
      }
    }
  }
})
export class ClientePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  tarifa: number;

  @property({
    type: 'string',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaFin: string;
  @property({
    type: 'number',
  })
  planId?: number;

  @hasOne(() => Factura)
  factura: Factura;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<ClientePlan>) {
    super(data);
  }
}

export interface ClientePlanRelations {
  // describe navigational properties here
}

export type ClientePlanWithRelations = ClientePlan & ClientePlanRelations;
