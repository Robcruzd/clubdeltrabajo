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
  usuario?: IEmpresa | null;
  sector?: number;
  idioma?: number;
  nivelIdioma?: string;
  nivelLaboral?: number;
  tipoContrato?: number;
  profesion?: number;
  modalidad?: number;
  nivelEstudios?: number;
  activado?: boolean;
  fecha?: number;
  mostrarSalario?: boolean;
  genero?: string;
  fechaPublicacionVip?: Moment;
  fechaOfertaCaducacion?: Moment;
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
    public usuario?: IEmpresa | null,
    public sector?: number,
    public idioma?: number,
    public nivelLaboral?: number,
    public tipoContrato?: number,
    public profesion?: number,
    public modalidad?: number,
    public nivelEstudios?: number,
    public subNivelLaboral?: number,
    public nivelIdioma?: string,
    public genero?: string,
    public activado?: boolean,
    public fecha?: number,
    public mostrarSalario?: boolean,
    public fechaPublicacionVip?: Moment,
    public fechaOfertaCaducacion?: Moment
  ) {}
}
