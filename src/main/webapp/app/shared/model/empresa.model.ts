import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';

export interface IEmpresa {
  id?: number;
  razonSocial?: string;
  razonComercial?: string;
  email?: string;
  numeroDocumento?: string;
  tipoUsuario?: ITipoUsuario;
  tipoDocumento?: ITipoDocumento;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public razonComercial?: string,
    public email?: string,
    public numeroDocumento?: string,
    public tipoUsuario?: ITipoUsuario,
    public tipoDocumento?: ITipoDocumento
  ) {}
}
