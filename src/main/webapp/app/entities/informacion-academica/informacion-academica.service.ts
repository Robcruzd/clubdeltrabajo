import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInformacionAcademica } from 'app/shared/model/informacion-academica.model';

type EntityResponseType = HttpResponse<IInformacionAcademica>;
type EntityArrayResponseType = HttpResponse<IInformacionAcademica[]>;

@Injectable({ providedIn: 'root' })
export class InformacionAcademicaService {
  public resourceUrl = SERVER_API_URL + 'api/informacion-academicas';

  constructor(protected http: HttpClient) {}

  create(informacionAcademica: IInformacionAcademica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(informacionAcademica);
    return this.http
      .post<IInformacionAcademica>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(informacionAcademica: IInformacionAcademica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(informacionAcademica);
    return this.http
      .put<IInformacionAcademica>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInformacionAcademica>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInformacionAcademica[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(informacionAcademica: IInformacionAcademica): IInformacionAcademica {
    const copy: IInformacionAcademica = Object.assign({}, informacionAcademica, {
      fechaInicio:
        informacionAcademica.fechaInicio && informacionAcademica.fechaInicio.isValid()
          ? informacionAcademica.fechaInicio.format(DATE_FORMAT)
          : undefined,
      fechaFin:
        informacionAcademica.fechaFin && informacionAcademica.fechaFin.isValid()
          ? informacionAcademica.fechaFin.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio ? moment(res.body.fechaInicio) : undefined;
      res.body.fechaFin = res.body.fechaFin ? moment(res.body.fechaFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((informacionAcademica: IInformacionAcademica) => {
        informacionAcademica.fechaInicio = informacionAcademica.fechaInicio ? moment(informacionAcademica.fechaInicio) : undefined;
        informacionAcademica.fechaFin = informacionAcademica.fechaFin ? moment(informacionAcademica.fechaFin) : undefined;
      });
    }
    return res;
  }
}
