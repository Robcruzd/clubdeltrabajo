export interface INivelIdioma {
  id?: number;
  nivel?: string;
}

export class NivelIdioma implements INivelIdioma {
  constructor(public id?: number, public nivel?: string) {}
}
