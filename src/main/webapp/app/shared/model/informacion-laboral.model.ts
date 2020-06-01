import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';
import { IDependencia } from 'app/shared/model/dependencia.model';
import { ICargo } from 'app/shared/model/cargo.model';

export interface IInformacionLaboral {
  id?: number;
  nombreEmpresa?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  direccion?: string;
  cuidad?: number;
  departamento?: number;
  pais?: string;
  telefonoEmpresa?: string;
  usuario?: IPersona;
  dependencia?: IDependencia;
  cargo?: ICargo;
}

export class InformacionLaboral implements IInformacionLaboral {
  constructor(
    public id?: number,
    public nombreEmpresa?: string,
    public fechaInicio?: Moment,
    public fechaFin?: Moment,
    public direccion?: string,
    public cuidad?: number,
    public departamento?: number,
    public pais?: string,
    public telefonoEmpresa?: string,
    public usuario?: IPersona,
    public dependencia?: IDependencia,
    public cargo?: ICargo
  ) {}
}
