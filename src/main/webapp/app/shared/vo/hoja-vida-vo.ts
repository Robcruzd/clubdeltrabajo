import { Archivo } from '../model/archivo.model';
import { IInformacionAcademica } from '../model/informacion-academica.model';
import { IInformacionLaboral } from '../model/informacion-laboral.model';
import { IInformacionPersonal } from '../model/informacion-personal.model';
import { IPersonaIdioma } from '../model/persona-idioma.model';
import { IPersona } from '../model/persona.model';

export class HojaVidaVo {
  archivos!: Array<Archivo>;
  informacionPersonal!: IInformacionPersonal;
  informacionAcademica!: Array<IInformacionAcademica>;
  idiomas!: Array<IPersonaIdioma>;
  experienciaLaboral!: Array<IInformacionLaboral>;
  persona!: IPersona;
}
