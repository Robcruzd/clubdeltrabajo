import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';

type EntityResponseType = HttpResponse<IAplicacionOferta>;
type EntityArrayResponseType = HttpResponse<IAplicacionOferta[]>;

@Injectable({ providedIn: 'root' })
export class AplicacionOfertaService {
  public resourceUrl = SERVER_API_URL + 'api/aplicacion-ofertas';

  constructor(protected http: HttpClient) {}

  create(aplicacionOferta: IAplicacionOferta): Observable<EntityResponseType> {
    return this.http.post<IAplicacionOferta>(this.resourceUrl, aplicacionOferta, { observe: 'response' });
  }

  update(aplicacionOferta: IAplicacionOferta): Observable<EntityResponseType> {
    return this.http.put<IAplicacionOferta>(this.resourceUrl, aplicacionOferta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAplicacionOferta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAplicacionOferta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
