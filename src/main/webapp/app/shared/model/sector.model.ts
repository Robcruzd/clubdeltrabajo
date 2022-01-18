export interface ISector {
  id?: number;
  sector?: string;
}

export class Sector implements ISector {
  constructor(public id?: number, public sector?: string) {}
}
