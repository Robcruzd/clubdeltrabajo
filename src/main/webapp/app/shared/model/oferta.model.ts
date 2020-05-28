import { Moment } from 'moment';
import { IEmpresa } from 'app/shared/model/empresa.model';

export interface IOferta {
  id?: number;
  descripcion?: string;
  titulo?: string;
  salario?: number;
  cargo?: number;
  experiencia?: string;
  ciudad?: number;
  area?: number;
  fechaPublicacion?: Moment;
  estado?: string;
  usuario?: IEmpresa;
}

export class Oferta implements IOferta {
  constructor(
    public id?: number,
    public descripcion?: string,
    public titulo?: string,
    public salario?: number,
    public cargo?: number,
    public experiencia?: string,
    public ciudad?: number,
    public area?: number,
    public fechaPublicacion?: Moment,
    public estado?: string,
    public usuario?: IEmpresa
  ) {}
}
