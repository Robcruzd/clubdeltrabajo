import { Moment } from "moment";
import { IEmpresa } from "../model/empresa.model";

export interface IOfertaFiltro {
    salario?: number;
    cargo?: number;
    experiencia?: string;
    ciudad?: number;
    area?: number;
    fechaPublicacion?: Moment;
    estado?: string;
    usuario?: IEmpresa | null;
    profesion?: number;
    modalidad?: number;
  }
  
  export class OfertaFiltro implements IOfertaFiltro {
    constructor(
      public salario?: number,
      public cargo?: number,
      public experiencia?: string,
      public ciudad?: number,
      public area?: number,
      public fechaPublicacion?: Moment,
      public estado?: string,
      public usuario?: IEmpresa | null,
      public profesion?: number,
      public modalidad?: number
    ) {}
  }
  