import {Model, model, property} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class PaginadorFactura extends Model {
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
  registros: Factura[];


  constructor(data?: Partial<PaginadorFactura>) {
    super(data);
  }
}

export interface PaginadorFacturaRelations {
  // describe navigational properties here
}

export type PaginadorFacturaWithRelations = PaginadorFactura & PaginadorFacturaRelations;
