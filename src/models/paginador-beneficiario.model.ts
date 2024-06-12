import {Model, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';

@model()
export class PaginadorBeneficiario extends Model {
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
  registros: Beneficiario[];


  constructor(data?: Partial<PaginadorBeneficiario>) {
    super(data);
  }
}

export interface PaginadorBeneficiarioRelations {
  // describe navigational properties here
}

export type PaginadorBeneficiarioWithRelations = PaginadorBeneficiario & PaginadorBeneficiarioRelations;
