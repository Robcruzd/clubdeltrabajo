import { IPersona } from 'app/shared/model/persona.model';
import { IOferta } from 'app/shared/model/oferta.model';

export interface IAplicacionOferta {
  id?: number;
  usuario?: IPersona;
  oferta?: IOferta;
  estado?: string;
}

export class AplicacionOferta implements IAplicacionOferta {
  constructor(public id?: number, public usuario?: IPersona, public oferta?: IOferta, public estado?:string) {}
}
