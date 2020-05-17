import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';

export interface IInformacionPersonal {
  id?: number;
  fechaNacimiento?: Moment;
  lugarNacimiento?: string;
  direccionResidencia?: string;
  genero?: string;
  ciudad?: number;
  telefono?: string;
  discapacidad?: number;
  redesSociales?: number;
  licencenciaConduccion?: boolean;
  usuario?: IPersona;
}

export class InformacionPersonal implements IInformacionPersonal {
  constructor(
    public id?: number,
    public fechaNacimiento?: Moment,
    public lugarNacimiento?: string,
    public direccionResidencia?: string,
    public genero?: string,
    public ciudad?: number,
    public telefono?: string,
    public discapacidad?: number,
    public redesSociales?: number,
    public licencenciaConduccion?: boolean,
    public usuario?: IPersona
  ) {
    this.licencenciaConduccion = this.licencenciaConduccion || false;
  }
}
