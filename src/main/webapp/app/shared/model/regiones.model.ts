export interface IRegiones {
  id?: number;
  region?: string;
  codigoDaneDelDepartamento?: number;
  departamento?: string;
  codigoDaneDelMunicipio?: number;
  municipio?: string;
}

export class Regiones implements IRegiones {
  constructor(
    public id?: number,
    public region?: string,
    public codigoDaneDelDepartamento?: number,
    public departamento?: string,
    public codigoDaneDelMunicipio?: number,
    public municipio?: string
  ) {}
}
