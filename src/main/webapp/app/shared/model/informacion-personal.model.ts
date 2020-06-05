import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';

export interface IInformacionPersonal {
  id?: number;
  fechaNacimiento?: Moment;
  lugarNacimiento?: string;
  direccionResidencia?: string;
  genero?: string;
  departamento?: number;
  ciudad?: number;
  telefono?: string;
  discapacidad?: number;
  redesSociales?: string;
  licencenciaConduccion?: boolean;
  perfilProfesional?: string;
  usuario?: IPersona;
}

export class InformacionPersonal implements IInformacionPersonal {
  constructor(
    public id?: number,
    public fechaNacimiento?: Moment,
    public lugarNacimiento?: string,
    public direccionResidencia?: string,
    public genero?: string,
    public departamento?: number,
    public ciudad?: number,
    public telefono?: string,
    public discapacidad?: number,
    public redesSociales?: string,
    public licencenciaConduccion?: boolean,
    public perfilProfesional?: string,
    public usuario?: IPersona
  ) {
    this.licencenciaConduccion = this.licencenciaConduccion || false;
  }
}
