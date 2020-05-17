export interface IDependencia {
  id?: number;
  dependencia?: string;
}

export class Dependencia implements IDependencia {
  constructor(public id?: number, public dependencia?: string) {}
}
