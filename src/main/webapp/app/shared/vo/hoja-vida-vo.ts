import { IInformacionPersonal } from '../model/informacion-personal.model';
import { IInformacionAcademica } from '../model/informacion-academica.model';
import { IInformacionLaboral } from '../model/informacion-laboral.model';
import { INivelIdioma } from '../model/nivel-idioma.model';
import { IIdioma } from '../model/idioma.model';
export interface IdiomaVo {
  idioma: IIdioma;
  nivel: INivelIdioma;
}
export class HojaVidaVo {
  informacionPersonal?: IInformacionPersonal;
  informacionAcademica?: Array<IInformacionAcademica>;
  idiomas?: Array<IdiomaVo>;
  experienciaLaboral?: Array<IInformacionLaboral>;
}
