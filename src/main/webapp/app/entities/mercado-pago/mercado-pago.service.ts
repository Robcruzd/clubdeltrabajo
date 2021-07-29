import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';

type EntityResponseType = HttpResponse<any>;
// type EntityArrayResponseType = HttpResponse<ITipoLicencia[]>;

@Injectable({ providedIn: 'root' })
export class MercadoPagoService {
  public resourceUrl = SERVER_API_URL + 'api/mercado-pago';
  public resourceUrlNoti = SERVER_API_URL + 'api/notiMercadoPago?topic=payment&id=123456789';

  constructor(protected http: HttpClient) {}

  goToPayment(body: String): any {
    // eslint-disable-next-line no-console
    console.log('probando2', body);
    return this.http.post<any>(this.resourceUrl, body);
  }

  getNoti(): any {
    return this.http.post(this.resourceUrlNoti, 'testing', { responseType: 'arraybuffer' });
  }
}
