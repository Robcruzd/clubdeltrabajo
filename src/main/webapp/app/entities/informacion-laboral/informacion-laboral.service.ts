import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInformacionLaboral } from 'app/shared/model/informacion-laboral.model';
import { Persona } from 'app/shared/model/persona.model';

type EntityResponseType = HttpResponse<IInformacionLaboral>;
type EntityArrayResponseType = HttpResponse<IInformacionLaboral[]>;

export class PathUtil {
  public static getPathParams(parameters: any): string {
    const fields: string[] = Object.getOwnPropertyNames(parameters);
    let path = '?';
    fields.forEach((field: string, i: number) => {
      const value: any = Object.values(parameters)[i];
      if (i > 0 && path !== '?' && value !== null && value.toString().trim() !== '') {
        path += '&';
      }
      if (value !== null && value.toString().trim() !== '') {
        path += field + '=' + value;
      }
    });
    return path !== '?' ? path : '';
  }
}

@Injectable({ providedIn: 'root' })
export class InformacionLaboralService {
  public resourceUrl = SERVER_API_URL + 'api/informacion-laborals';
  public resourceUrlFiltroByPersona = SERVER_API_URL + 'api/informacion-laborals/filtroByPersona';

  constructor(protected http: HttpClient) {}

  create(informacionLaboral: IInformacionLaboral): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(informacionLaboral);
    return this.http
      .post<IInformacionLaboral>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(informacionLaboral: IInformacionLaboral): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(informacionLaboral);
    return this.http
      .put<IInformacionLaboral>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInformacionLaboral>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInformacionLaboral[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(informacionLaboral: IInformacionLaboral): IInformacionLaboral {
    const copy: IInformacionLaboral = Object.assign({}, informacionLaboral, {
      fechaInicio:
        informacionLaboral.fechaInicio && informacionLaboral.fechaInicio.isValid()
          ? informacionLaboral.fechaInicio.format(DATE_FORMAT)
          : undefined,
      fechaFin:
        informacionLaboral.fechaFin && informacionLaboral.fechaFin.isValid() ? informacionLaboral.fechaFin.format(DATE_FORMAT) : undefined
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
      res.body.forEach((informacionLaboral: IInformacionLaboral) => {
        informacionLaboral.fechaInicio = informacionLaboral.fechaInicio ? moment(informacionLaboral.fechaInicio) : undefined;
        informacionLaboral.fechaFin = informacionLaboral.fechaFin ? moment(informacionLaboral.fechaFin) : undefined;
      });
    }
    return res;
  }

  public getPersonaFiltro(persona?: Persona): Observable<any> {
    const params = PathUtil.getPathParams({ persona: persona?.id });
    const url = this.resourceUrlFiltroByPersona + params;
    return this.http.get<any>(url);
  }
}
