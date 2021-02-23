import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOferta } from 'app/shared/model/oferta.model';
import { Oferta } from '../../shared/model/oferta.model';

type EntityResponseType = HttpResponse<IOferta>;
type EntityArrayResponseType = HttpResponse<IOferta[]>;

export class PathUtil {
  public static getPathParams(parameters: any): string {
      const fields: string[] = Object.getOwnPropertyNames(parameters);
      let path = "?";
      fields.forEach(
          (field: string, i: number) => {
            const value: any = Object.values(parameters)[i];
              if (i > 0 && path !== "?" && (value !== null && value.toString().trim()!=="")) {
                  path += "&";
              }
              if (value !== null && value.toString().trim()!=="") {
                  path += (field + "=" + value);
              }
          }
      );
      return (path!=="?"?path:"");
  }
}

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

@Injectable({ providedIn: 'root' })
export class OfertaService {
  public resourceUrl = SERVER_API_URL + 'api/ofertas';
  public resourceUrlFiltro = SERVER_API_URL + 'api/ofertas/filtroOfertas';
  public resourceUrlEmpresa = SERVER_API_URL + 'api/ofertas/filtroOfertasEmpresa';

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

  public getOfertasFiltro(oferta: Oferta): Observable<any> {
    const params = PathUtil.getPathParams({ciudad:oferta.ciudad,salario:oferta.salario,fecha:oferta.fecha})
    const url = this.resourceUrlFiltro + params
    return this.http.get<any>(url);
  }

  public getOfertasEmpresa(oferta: Oferta): Observable<any> {
    const params = PathUtil.getPathParams({usuario:oferta.usuario?.id})
    const url = this.resourceUrlEmpresa + params
    return this.http.get<any>(url);
  }

  public listar(parameters: any): Observable<any>{
    const path:string = PathUtil2.getPathParams(parameters);
    const url = this.resourceUrl + "/obtenerOfertas"+path;
    return this.get(url)
  }

  public get(url: string, headers?:any):Observable<any>{
    return this.http.get<any>(url,headers);
  }

}
