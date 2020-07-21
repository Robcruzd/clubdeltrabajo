import { IInformacionLaboral } from './informacion-laboral.model';
import { IInformacionAcademica } from './informacion-academica.model';
import { IPersona } from 'app/shared/model/persona.model';

export interface IArchivo {
  id?: number;
  tipo?: number;
  archivo?: string | ArrayBuffer | null;
  nombre?: string;
  extension?: string;
  usuario?: IPersona;
  informacionAcademica?: IInformacionAcademica;
  informacionLaboral?: IInformacionLaboral;
}

export class Archivo implements IArchivo {
  constructor(
    public id?: number,
    public tipo?: number,
    public archivo?: string | ArrayBuffer | null,
    public nombre?: string,
    public extension?: string,
    public usuario?: IPersona,
    public informacionAcademica?: IInformacionAcademica,
    public informacionLaboral?: IInformacionLaboral
  ) {}
}
