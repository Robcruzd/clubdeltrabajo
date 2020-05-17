export interface IUsuario {
  id?: number;
  usuario?: number;
  clave?: string;
  estado?: string;
}

export class Usuario implements IUsuario {
  constructor(public id?: number, public usuario?: number, public clave?: string, public estado?: string) {}
}
