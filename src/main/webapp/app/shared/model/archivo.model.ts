import { IPersona } from 'app/shared/model/persona.model';

export interface IArchivo {
  id?: number;
  tipo?: number;
  nombre?: string;
  archivo?: string | ArrayBuffer | null;
  usuario?: IPersona;
}

export class Archivo implements IArchivo {
  constructor(
    public id?: number,
    public tipo?: number,
    public nombre?: string,
    public archivo?: string | ArrayBuffer | null,
    public usuario?: IPersona
  ) {}
}
