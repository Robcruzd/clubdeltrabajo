import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IArchivo } from 'app/shared/model/archivo.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IArchivo>;
type EntityArrayResponseType = HttpResponse<IArchivo[]>;

export class PathUtil {
  public static getPathParams(parameters: any): string {
    const fields: string[] = Object.getOwnPropertyNames(parameters);
    let path = '?';
    fields.forEach((field: string, i: number) => {
      const value: any = Object.values(parameters)[i];
      if (i > 0 && path !== '?' && value !== null) {
        path += '&';
      }
      if (value !== null) {
        path += field + '=' + value;
      }
    });
    return path !== '?' ? path : '';
  }
}

@Injectable({ providedIn: 'root' })
export class ArchivoService {
  public resourceUrl = SERVER_API_URL + 'api/archivos';
  public uploads3Service = SERVER_API_URL + 'api/uploadFileS3';
  public deletes3Service = SERVER_API_URL + 'api/deleteFileS3';
  public gets3Service = SERVER_API_URL + 'api/getFileS3';
  public resourceUrlFiltroByTipoAndEmpresa = SERVER_API_URL + 'api/archivos/filtroByTipoAndEmpresa';

  constructor(protected http: HttpClient) {}

  create(archivo: IArchivo): Observable<EntityResponseType> {
    return this.http.post<IArchivo>(this.resourceUrl, archivo, { observe: 'response' });
  }

  update(archivo: IArchivo): Observable<EntityResponseType> {
    return this.http.put<IArchivo>(this.resourceUrl, archivo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArchivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArchivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  get(usuarioid: number, tipo: number): Observable<EntityResponseType> {
    return this.http.get<IArchivo>(`${this.resourceUrl}/perfil/${usuarioid}/tipo/${tipo}`, { observe: 'response' });
  }

  getEmp(tipo: number, empresaid: number): Observable<EntityResponseType> {
    return this.http.get<IArchivo>(`${this.resourceUrl}/tipo/${tipo}/empPerfil/${empresaid}`, { observe: 'response' });
  }

  uploadS3(file: FormData): any {
    return this.http.post(this.uploads3Service, file, { responseType: 'text' });
  }

  deleteS3(name: string): any {
    return this.http.post(this.deletes3Service, name, { responseType: 'text' });
  }

  getS3(keyName: string, name: string): any {
    const a = document.createElement('a');
    a.href = `${this.gets3Service}/${keyName}/${name}`;
    a.download = name;
    a.click();
    // return this.http.get<any>(`${this.gets3Service}/${name}`);
  }

  getImageS3(keyName: string, name: string): any {
    /* eslint-disable no-console */
    console.log('base href: ', this.gets3Service);
    return `${this.gets3Service}/${keyName}/${name}`;
  }

  public getArchivoByTipoAndEmpresa(tipoId?: any, empresa?: any): Observable<any> {
    const params = PathUtil.getPathParams({ tipo: tipoId, empresa: empresa?.id });
    const url = this.resourceUrlFiltroByTipoAndEmpresa + params;
    /* eslint-disable no-console */
    console.log('url: ', url);
    return this.http.get<any>(url);
  }
}
