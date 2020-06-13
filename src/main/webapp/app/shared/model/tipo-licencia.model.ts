export interface ITipoLicencia {
  id?: number;
  nombreTipo?: string;
}

export class TipoLicencia implements ITipoLicencia {
  constructor(public id?: number, public nombreTipo?: string) {}
}
