import { Moment } from 'moment';
import { Empresa } from './empresa.model';
import { Membresia } from './membresias.model';

export interface IMembresiaEmpresa {
  id?: number;
  empresa?: Empresa;
  membresia?: Membresia;
  fechaVencimiento?: Moment;
  publicaciones?: number;
  estado?: string;
}

export class MembresiaEmpresa implements IMembresiaEmpresa {
  constructor(
    public id?: number,
    public empresa?: Empresa,
    public membresia?: Membresia,
    public fechaVencimiento?: Moment,
    public publicaciones?: number,
    public estado?: string
  ) {}
}
