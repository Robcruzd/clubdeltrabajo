export class GeografiaVo {
  constructor(public codigoDpto: string, public nombreDpto: string, public codigoMpio: string, public nombreMpio: string) {}
}

export class PaisesVo {
  constructor(public iso2: string, public nombre: string) {}
}
