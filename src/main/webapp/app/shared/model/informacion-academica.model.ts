import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';
import { IInstitucion } from 'app/shared/model/institucion.model';

export interface IInformacionAcademica {
  id?: number;
  nivelEstudio?: number;
  estado?: number;
  ciudadAcademica?: number;
  fechaFin?: Moment;
  tituloOtorgado?: string;
  usuario?: IPersona;
  institucion?: IInstitucion;
}

export class InformacionAcademica implements IInformacionAcademica {
  constructor(
    public id?: number,
    public nivelEstudio?: number,
    public estado?: number,
    public ciudadAcademica?: number,
    public fechaFin?: Moment,
    public tituloOtorgado?: string,
    public usuario?: IPersona,
    public institucion?: IInstitucion
  ) {}
}
