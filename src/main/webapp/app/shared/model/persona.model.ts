import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { Moment } from 'moment';

export interface IPersona {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  numeroDocumento?: string;
  tipoUsuario?: ITipoUsuario;
  tipoDocumento?: ITipoDocumento;
  fechaRecordatorio?: Moment;
  estadohv?: boolean;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public email?: string,
    public numeroDocumento?: string,
    public tipoUsuario?: ITipoUsuario,
    public tipoDocumento?: ITipoDocumento,
    public fechaRecordatorio?: Moment,
    public estadohv?: boolean
  ) {}
}
