import {Model, model, property} from '@loopback/repository';
import {SedesFuneraria} from './sedes-funeraria.model';

@model()
export class PaginadorSedesFuneraria extends Model {
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
  registros: SedesFuneraria[];


  constructor(data?: Partial<PaginadorSedesFuneraria>) {
    super(data);
  }
}

export interface PaginadorSedesFunerariaRelations {
  // describe navigational properties here
}

export type PaginadorSedesFunerariaWithRelations = PaginadorSedesFuneraria & PaginadorSedesFunerariaRelations;
