import { IPersona } from 'app/shared/model/persona.model';

export interface IArchivo {
  id?: number;
  tipo?: number;
  archivo?: string;
  usuario?: IPersona;
}

export class Archivo implements IArchivo {
  constructor(public id?: number, public tipo?: number, public archivo?: string, public usuario?: IPersona) {}
}
