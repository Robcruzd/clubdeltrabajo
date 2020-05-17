import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { IUsuario } from 'app/shared/model/usuario.model';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';

export interface IPersona {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  tipoUsuario?: ITipoUsuario;
  numeroDocumento?: IUsuario;
  tipoDocumento?: ITipoDocumento;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public email?: string,
    public tipoUsuario?: ITipoUsuario,
    public numeroDocumento?: IUsuario,
    public tipoDocumento?: ITipoDocumento
  ) {}
}
