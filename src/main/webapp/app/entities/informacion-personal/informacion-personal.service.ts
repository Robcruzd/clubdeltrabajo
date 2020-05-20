import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInformacionPersonal } from 'app/shared/model/informacion-personal.model';

type EntityResponseType = HttpResponse<IInformacionPersonal>;
type EntityArrayResponseType = HttpResponse<IInformacionPersonal[]>;

@Injectable({ providedIn: 'root' })
export class InformacionPersonalService {
  public resourceUrl = SERVER_API_URL + 'api/informacion-personals';

  constructor(protected http: HttpClient) {}

  create(informacionPersonal: IInformacionPersonal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(informacionPersonal);
    return this.http
      .post<IInformacionPersonal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(informacionPersonal: IInformacionPersonal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(informacionPersonal);
    return this.http
      .put<IInformacionPersonal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInformacionPersonal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInformacionPersonal[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(informacionPersonal: IInformacionPersonal): IInformacionPersonal {
    const copy: IInformacionPersonal = Object.assign({}, informacionPersonal, {
      fechaNacimiento:
        informacionPersonal.fechaNacimiento && informacionPersonal.fechaNacimiento.isValid()
          ? informacionPersonal.fechaNacimiento.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento ? moment(res.body.fechaNacimiento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((informacionPersonal: IInformacionPersonal) => {
        informacionPersonal.fechaNacimiento = informacionPersonal.fechaNacimiento ? moment(informacionPersonal.fechaNacimiento) : undefined;
      });
    }
    return res;
  }
}
