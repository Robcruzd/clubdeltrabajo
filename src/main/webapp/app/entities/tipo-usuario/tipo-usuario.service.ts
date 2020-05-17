import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';

type EntityResponseType = HttpResponse<ITipoUsuario>;
type EntityArrayResponseType = HttpResponse<ITipoUsuario[]>;

@Injectable({ providedIn: 'root' })
export class TipoUsuarioService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-usuarios';

  constructor(protected http: HttpClient) {}

  create(tipoUsuario: ITipoUsuario): Observable<EntityResponseType> {
    return this.http.post<ITipoUsuario>(this.resourceUrl, tipoUsuario, { observe: 'response' });
  }

  update(tipoUsuario: ITipoUsuario): Observable<EntityResponseType> {
    return this.http.put<ITipoUsuario>(this.resourceUrl, tipoUsuario, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
