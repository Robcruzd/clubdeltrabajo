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
  direccion?: string;
  telefono?: number;
  ciudad?: number;
  sector?: string;
  subsector?: string;
  paginaWeb?: string;
  cantidadEmpleados?: string;
  descripcionEmpresa?: string;
  nombreRepresentanteLegal?: string;
  apellidosRepresentanteLegal?: string;
  telefonoEmpresa?: number;
  descargasHv?: number;
  publicacionesOferta?: number;
  numero?: number;
  pais?: string;
  codigoPostal?: string;
  link?: string;
  visualizacionesHv?: number;
  membresia?: boolean;
  replicasOferta?: number;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public razonComercial?: string,
    public email?: string,
    public numeroDocumento?: string,
    public tipoUsuario?: ITipoUsuario,
    public tipoDocumento?: ITipoDocumento,
    public direccion?: string,
    public telefono?: number,
    public ciudad?: number,
    public sector?: string,
    public subsector?: string,
    public paginaWeb?: string,
    public cantidadEmpleados?: string,
    public descripcionEmpresa?: string,
    public nombreRepresentanteLegal?: string,
    public apellidosRepresentanteLegal?: string,
    public telefonoEmpresa?: number,
    public descargasHv?: number,
    public publicacionesOferta?: number,
    public numero?: number,
    public pais?: string,
    public codigoPostal?: string,
    public link?: string,
    public visualizacionesHv?: number,
    public membresia?: boolean,
    public replicasOferta?: number
  ) {}
}
