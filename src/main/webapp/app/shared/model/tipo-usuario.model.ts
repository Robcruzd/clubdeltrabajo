export interface ITipoUsuario {
  id?: number;
  nombre?: string;
}

export class TipoUsuario implements ITipoUsuario {
  constructor(public id?: number, public nombre?: string) {}
}
