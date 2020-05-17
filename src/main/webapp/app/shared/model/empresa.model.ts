import { IUsuario } from 'app/shared/model/usuario.model';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';

export interface IEmpresa {
  id?: number;
  razonSocial?: string;
  razonComercial?: string;
  email?: string;
  numeroDocumento?: IUsuario;
  tipoUsuario?: ITipoUsuario;
  tipoDocumento?: ITipoDocumento;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public razonComercial?: string,
    public email?: string,
    public numeroDocumento?: IUsuario,
    public tipoUsuario?: ITipoUsuario,
    public tipoDocumento?: ITipoDocumento
  ) {}
}
