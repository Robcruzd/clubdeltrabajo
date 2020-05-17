export interface ICargo {
  id?: number;
  cargo?: string;
}

export class Cargo implements ICargo {
  constructor(public id?: number, public cargo?: string) {}
}
