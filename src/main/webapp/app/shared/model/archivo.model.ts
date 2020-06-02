import { IPersona } from 'app/shared/model/persona.model';

export interface IArchivo {
  id?: number;
  tipo?: number;
  archivo?: string | ArrayBuffer | null;
  nombre?: string;
  extension?: string;
  usuario?: IPersona;
}

export class Archivo implements IArchivo {
  constructor(
    public id?: number,
    public tipo?: number,
    public archivo?: string | ArrayBuffer | null,
    public nombre?: string,
    public extension?: string,
    public usuario?: IPersona
  ) {}
}
