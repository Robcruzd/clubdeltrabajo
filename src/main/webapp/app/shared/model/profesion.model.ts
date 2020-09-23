export interface IProfesion {
  id?: number;
  profesion?: string;
}

export class Profesion implements IProfesion {
  constructor(public id?: number, public profesion?: string) {}
}
