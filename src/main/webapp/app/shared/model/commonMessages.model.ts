export interface ICommonMessages {
  id?: number;
  tipoMensaje?: string;
  mensajes?: string;
}

export class CommonMessages implements ICommonMessages {
  constructor(public id?: number, public tipoMensaje?: string, public mensajes?: string) {}
}
