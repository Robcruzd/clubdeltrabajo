import { IPersona } from 'app/shared/model/persona.model';
import { IIdioma } from 'app/shared/model/idioma.model';

export interface IPersonaIdioma {
  id?: number;
  nivel?: string | null;
  idPersona?: IPersona;
  idIdioma?: IIdioma;
}

export class PersonaIdioma implements IPersonaIdioma {
  constructor(public id?: number, public nivel?: string, public idPersona?: IPersona, public idIdioma?: IIdioma) {}
}
