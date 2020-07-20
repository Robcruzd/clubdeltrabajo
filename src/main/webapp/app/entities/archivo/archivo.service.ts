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
  public s3Service = SERVER_API_URL + 'api/uploadFileS3';

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

  uploadS3(file: File): any {
    // eslint-disable-next-line no-console
    console.log('file: ', file);
    return this.http.post(this.s3Service, file);
  }
}
