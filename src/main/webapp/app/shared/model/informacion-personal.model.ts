import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';
import { IProfesion } from './profesion.model';

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
  tipoLicenciaConduccion?: string;
  anioExperiencia?: number;
  mesExperiencia?: number;
  aspiracionSalarial?: number;
  mudarme?: boolean;
  viajar?: boolean;
  paisPermisoTrabajo?: string;
  estadoCivil?: number;
  nivelEducativoProfesion?: number;
  profesion?: IProfesion;
  activoNotificaciones?: boolean;
  usuarioId?: number;
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
    public perfilProfesional?: string,
    public usuario?: IPersona,
    public tipoLicenciaConduccion?: string,
    public anioExperiencia?: number,
    public mesExperiencia?: number,
    public aspiracionSalarial?: number,
    public mudarme?: boolean,
    public viajar?: boolean,
    public paisPermisoTrabajo?: string,
    public estadoCivil?: number,
    public nivelEducativoProfesion?: number,
    public profesion?: IProfesion,
    public activoNotificaciones?: boolean,
    public usuarioId?: number,
    public profesionId?: number
  ) {}
}
