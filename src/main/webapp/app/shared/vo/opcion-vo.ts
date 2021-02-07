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
  profesion: string | undefined;
  salario: string | undefined;
  ciudad: string | undefined;
  activado: boolean | undefined;
}
