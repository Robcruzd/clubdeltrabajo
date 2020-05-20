import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';
import { IIdioma } from 'app/shared/model/idioma.model';
import { INivelIdioma } from 'app/shared/model/nivel-idioma.model';
import { IInstitucion } from 'app/shared/model/institucion.model';

export interface IInformacionAcademica {
  id?: number;
  nivelEstudio?: number;
  estado?: number;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  tituloOtorgado?: string;
  perfilProfesional?: string;
  usuario?: IPersona;
  idioma?: IIdioma;
  nivelIdioma?: INivelIdioma;
  institucion?: IInstitucion;
}

export class InformacionAcademica implements IInformacionAcademica {
  constructor(
    public id?: number,
    public nivelEstudio?: number,
    public estado?: number,
    public fechaInicio?: Moment,
    public fechaFin?: Moment,
    public tituloOtorgado?: string,
    public perfilProfesional?: string,
    public usuario?: IPersona,
    public idioma?: IIdioma,
    public nivelIdioma?: INivelIdioma,
    public institucion?: IInstitucion
  ) {}
}
