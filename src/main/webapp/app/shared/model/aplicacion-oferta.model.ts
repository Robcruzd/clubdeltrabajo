import { IPersona } from 'app/shared/model/persona.model';
import { IOferta } from 'app/shared/model/oferta.model';
import { Moment } from 'moment';

export interface IAplicacionOferta {
  id?: number;
  usuario?: IPersona;
  oferta?: IOferta;
  estado?: string;
  fechaPostulacion?: Moment;
}

export class AplicacionOferta implements IAplicacionOferta {
  constructor(
    public id?: number,
    public usuario?: IPersona,
    public oferta?: IOferta,
    public estado?: string,
    public fechaPostulacion?: Moment
  ) {}
}
