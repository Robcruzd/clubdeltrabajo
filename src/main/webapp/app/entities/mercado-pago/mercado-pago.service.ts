import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

type EntityResponseType = HttpResponse<any>;
// type EntityArrayResponseType = HttpResponse<ITipoLicencia[]>;

@Injectable({ providedIn: 'root' })
export class MercadoPagoService {
  public resourceUrl = SERVER_API_URL + 'api/mercado-pago';

  constructor(protected http: HttpClient) {}

  goToPayment(body: String): any {
    // eslint-disable-next-line no-console
    console.log('probando2', body);
    return this.http.get<any>(this.resourceUrl);
  }

  // create(tipoLicencia: ITipoLicencia): Observable<EntityResponseType> {
  //   return this.http.post<ITipoLicencia>(this.resourceUrl, tipoLicencia, { observe: 'response' });
  // }

  // update(tipoLicencia: ITipoLicencia): Observable<EntityResponseType> {
  //   return this.http.put<ITipoLicencia>(this.resourceUrl, tipoLicencia, { observe: 'response' });
  // }

  // find(id: number): Observable<EntityResponseType> {
  //   return this.http.get<ITipoLicencia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  // }

  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ITipoLicencia[]>(this.resourceUrl, { params: options, observe: 'response' });
  // }

  // delete(id: number): Observable<HttpResponse<{}>> {
  //   return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  // }
}
