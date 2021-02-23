import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IArchivo } from 'app/shared/model/archivo.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IArchivo>;
type EntityArrayResponseType = HttpResponse<IArchivo[]>;

@Injectable({ providedIn: 'root' })
export class ArchivoService {
  public resourceUrl = SERVER_API_URL + 'api/archivos';
  public uploads3Service = SERVER_API_URL + 'api/uploadFileS3';
  public deletes3Service = SERVER_API_URL + 'api/deleteFileS3';

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
    // eslint-disable-next-line no-console
    console.log('prooooooooooobando ');
    return this.http.get<IArchivo>(`${this.resourceUrl}/perfil/${usuarioid}/tipo/${tipo}`, { observe: 'response' });
  }

  getEmp(empresaid: number, tipo: number): Observable<EntityResponseType> {
    // eslint-disable-next-line no-console
    console.log('consultar:     ', empresaid);
    return this.http.get<IArchivo>(`${this.resourceUrl}/empPerfil/${empresaid}/tipo/${tipo}`, { observe: 'response' });
  }

  uploadS3(file: FormData): any {
    return this.http.post(this.uploads3Service, file, { responseType: 'text' });
  }

  deleteS3(name: string): any {
    return this.http.post(this.deletes3Service, name, { responseType: 'text' });
  }
}
