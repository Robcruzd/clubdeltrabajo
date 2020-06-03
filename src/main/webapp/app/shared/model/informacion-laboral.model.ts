import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';
import { ICargo } from 'app/shared/model/cargo.model';

export interface IInformacionLaboral {
  id?: number;
  nombreEmpresa?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  direccion?: string;
  ciudad?: number;
  departamento?: number;
  pais?: string;
  telefonoEmpresa?: string;
  dependencia?: string;
  ciudadExtranjera?: string;
  usuario?: IPersona;
  cargo?: ICargo;
}

export class InformacionLaboral implements IInformacionLaboral {
  constructor(
    public id?: number,
    public nombreEmpresa?: string,
    public fechaInicio?: Moment,
    public fechaFin?: Moment,
    public direccion?: string,
    public ciudad?: number,
    public departamento?: number,
    public pais?: string,
    public telefonoEmpresa?: string,
    public dependencia?: string,
    public ciudadExtranjera?: string,
    public usuario?: IPersona,
    public cargo?: ICargo
  ) {}
}
