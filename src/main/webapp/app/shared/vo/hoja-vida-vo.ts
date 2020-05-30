import { IInformacionAcademica } from '../model/informacion-academica.model';
import { IInformacionLaboral } from '../model/informacion-laboral.model';
import { IInformacionPersonal } from '../model/informacion-personal.model';
import { IPersonaIdioma } from '../model/persona-idioma.model';
/* export interface IdiomaVo {
  idioma: IIdioma;
  nivel: INivelIdioma;
} */
export class HojaVidaVo {
  informacionPersonal?: IInformacionPersonal;
  informacionAcademica?: Array<IInformacionAcademica>;
  idiomas?: Array<IPersonaIdioma>;
  experienciaLaboral?: Array<IInformacionLaboral>;
}
