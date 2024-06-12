import {Model, model, property} from '@loopback/repository';
import {Resenas} from './resenas.model';

@model()
export class PaginadorResena extends Model {
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
  registros: Resenas[];


  constructor(data?: Partial<PaginadorResena>) {
    super(data);
  }
}

export interface PaginadorResenaRelations {
  // describe navigational properties here
}

export type PaginadorResenaWithRelations = PaginadorResena & PaginadorResenaRelations;
