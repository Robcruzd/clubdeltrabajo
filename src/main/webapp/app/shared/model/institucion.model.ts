export interface IInstitucion {
  id?: number;
  institucion?: string;
}

export class Institucion implements IInstitucion {
  constructor(public id?: number, public institucion?: string) {}
}
