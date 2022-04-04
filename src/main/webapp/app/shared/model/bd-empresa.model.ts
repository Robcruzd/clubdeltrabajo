import { IEmpresa } from './empresa.model';
import { IPersona } from './persona.model';

export interface IBdEmpresa {
  id?: number;
  empresa?: IEmpresa;
  usuario?: IPersona;
}

export class BdEmpresa implements IBdEmpresa {
  constructor(public id?: number, public empresa?: IEmpresa, public usuario?: IPersona) {}
}
