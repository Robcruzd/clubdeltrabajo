export interface IMembresias {
  id?: number;
  nombreMembresia?: string;
  precioMembresia?: string;
  descargas?: number;
  ofertas?: number;
  visualizaciones?: number;
  membresiaclub?: boolean;
  juridica?: boolean;
  replicasoferta?: number;
}

export class Paises implements IMembresias {
  constructor(
    public id?: number,
    public nombreMembresia?: string,
    public precioMembresia?: string,
    public descargas?: number,
    public ofertas?: number,
    public visualizaciones?: number,
    public membresiaclub?: boolean,
    public juridica?: boolean,
    public replicasoferta?: number
  ) {}
}
