export interface IPaises {
  id?: number;
  nombre?: string;
  iso2?: string;
}

export class Paises implements IPaises {
  constructor(public id?: number, public nombre?: string, public iso2?: string) {}
}
