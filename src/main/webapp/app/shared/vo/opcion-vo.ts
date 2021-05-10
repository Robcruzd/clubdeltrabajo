import { Archivo, IArchivo } from '../model/archivo.model';

export interface IOpcionVo {
  codigo: string | number | undefined;
  nombre: string;
}

export interface IOpcionVoDescripcion {
  codigo: string | number;
  descripcion: string;
}

export interface IOpcionVoMunicipio {
  codigo: string | number;
  municipio: string;
}

export interface ISubnivelVo {
  codigo: string | number;
  nombre: string;
  subniveles: Array<IOpcionVo>;
}

export interface IlistarOfertas {
  id: string | undefined;
  profesion: string | undefined;
  salario: string | undefined;
  ciudad: string | undefined;
  activado: boolean | undefined;
  totalSeleccionado?: number | undefined;
  totalTodo?: number | undefined;
  totalNinguno?: number | undefined;
}

export interface IResultadoBusquedaOfertas {
  empresa: string | undefined;
  profesion: string | undefined;
  salario: string | undefined;
  ciudad: string | undefined;
  fechaPublicacion: string | undefined;
  idEmpresa?: number | undefined;
  idOferta?: number | undefined;
}

export interface IResultadoBusquedaAspirantes {
  nombre: string | undefined | null;
  apellido: string | undefined | null;
  profesion: string | undefined | null;
  edad: number | undefined | null;
  ciudad: string | undefined | null;
  experiencia: string | undefined | null;
  titulo: string | undefined | null;
  fechaPostulacion: string | undefined | null;
  idPersona?: number | undefined | null;
  idOferta?: number | undefined | null;
  color?: string | undefined | null;
  verh?: boolean | undefined | null;
  verche?: boolean | undefined | null;
  verno?: boolean | undefined | null;
  btnestado?: boolean | undefined | null;
  imagen?: string | ArrayBuffer | null | undefined;
}

export interface IResultadoOfertas {
  titulo: string | undefined;
  descripcion: string | undefined;
  tipoContrato: string | undefined;
  publicado: string | undefined;
  experiencia: string | undefined;
  ciudad: string | undefined;
  salario: string | undefined;
  mostrarSalario?: boolean | undefined;
  // idEmpresa?: number | undefined;
  // idOferta?: number | undefined;
}

export interface IResultadoHojaCandidato {
  nombre: string | undefined;
  apellido: string | undefined;
  profesion: string | undefined;
  descripcion: string | undefined;
  // idEmpresa?: number | undefined;
  // idOferta?: number | undefined;
}
