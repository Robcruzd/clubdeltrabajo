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

export class PathUtil2 {
  public static getPathParams(parameters: any): string {
      const fields: string[] = Object.getOwnPropertyNames(parameters);
      let path = "?";
      fields.forEach(
          (field: string, i: number) => {
            const value: any = Object.values(parameters)[i];
            if(value !== undefined && value !== null){
              if (i > 0 && path !== "?" && (value !== null)) {
                path += "&";
              }
              if (value !== null) {
                  path += (field + ".equals=" + value);
              }
            }
          }
      );
      return (path!=="?"?path:"");
  }
}

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
export class InformacionAcademicaService {
  public resourceUrl = SERVER_API_URL + 'api/informacion-academicas';
  public resourceUrlByUsuario = SERVER_API_URL + 'api/informacion-academicas/obtenerInfoUsuario';

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
      fechaFin:
        informacionAcademica.fechaFin && informacionAcademica.fechaFin.isValid()
          ? informacionAcademica.fechaFin.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaFin = res.body.fechaFin ? moment(res.body.fechaFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((informacionAcademica: IInformacionAcademica) => {
        informacionAcademica.fechaFin = informacionAcademica.fechaFin ? moment(informacionAcademica.fechaFin) : undefined;
      });
    }
    return res;
  }

  public listar(parameters: any): Observable<any>{
    const path:string = PathUtil2.getPathParams(parameters);
    const url = this.resourceUrl + "/informacionAcademica"+path;
    return this.get(url)
  }

  public get(url: string, headers?:any):Observable<any>{
    return this.http.get<any>(url,headers);
  }

  public getPersonaFiltro(idPersona?: any): Observable<any> {
    const params = PathUtil.getPathParams({ persona: idPersona });
    const url = this.resourceUrlByUsuario + params;
    return this.http.get<any>(url);
  }
}
