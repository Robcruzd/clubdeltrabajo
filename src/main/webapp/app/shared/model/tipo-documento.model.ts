export interface ITipoDocumento {
  id?: number;
  nombreTipo?: string;
}

export class TipoDocumento implements ITipoDocumento {
  constructor(public id?: number, public nombreTipo?: string) {}
}
