import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOferta } from 'app/shared/model/oferta.model';
// import { Oferta } from '../../shared/model/oferta.model';

type EntityResponseType = HttpResponse<IOferta>;
type EntityArrayResponseType = HttpResponse<IOferta[]>;

@Injectable({ providedIn: 'root' })
export class OfertaService {
  public resourceUrl = SERVER_API_URL + 'api/ofertas';
  public resourceUrlFiltro = SERVER_API_URL + 'api/ofertas/filtroOfertas';

  constructor(protected http: HttpClient) {}

  create(oferta: IOferta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oferta);
    return this.http
      .post<IOferta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(oferta: IOferta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oferta);
    return this.http
      .put<IOferta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOferta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOferta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(oferta: IOferta): IOferta {
    const copy: IOferta = Object.assign({}, oferta, {
      fechaPublicacion:
        oferta.fechaPublicacion && oferta.fechaPublicacion.isValid() ? oferta.fechaPublicacion.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPublicacion = res.body.fechaPublicacion ? moment(res.body.fechaPublicacion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((oferta: IOferta) => {
        oferta.fechaPublicacion = oferta.fechaPublicacion ? moment(oferta.fechaPublicacion) : undefined;
      });
    }
    return res;
  }

  // getOfertasFiltro(oferta: IOferta): Observable<EntityResponseType>{
  //   const copy = this.convertDateFromClient(oferta);
  //   return this.http
  //     .get<IOferta>(this.resourceUrlFiltro, { params: copy,observe: 'response' })
  //     .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

}
