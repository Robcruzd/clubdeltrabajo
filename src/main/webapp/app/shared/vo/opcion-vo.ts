export interface IOpcionVo {
  codigo: string | number;
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

export interface IlistarOfertas {
  id: string | undefined;
  profesion: string | undefined;
  salario: string | undefined;
  ciudad: string | undefined;
  activado: boolean | undefined;
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
