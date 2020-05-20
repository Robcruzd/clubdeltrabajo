export interface IIdioma {
  id?: number;
  idioma?: string;
}

export class Idioma implements IIdioma {
  constructor(public id?: number, public idioma?: string) {}
}
