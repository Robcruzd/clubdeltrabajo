import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { Persona } from 'app/shared/model/persona.model';

type EntityResponseType = HttpResponse<IAplicacionOferta>;
type EntityArrayResponseType = HttpResponse<IAplicacionOferta[]>;

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
      if (i > 0 && path !== '?' && value !== null) {
        path += '&';
      }
      if (value !== null) {
        path += field + '=' + value;
      }
    });
    return path !== '?' ? path : '';
  }
}

@Injectable({ providedIn: 'root' })
export class AplicacionOfertaService {
  public resourceUrl = SERVER_API_URL + 'api/aplicacion-ofertas';
  public resourceUrlFiltroByPersona = SERVER_API_URL + 'api/aplicacion-ofertas/filtroByPersona';
  public resourceUrlFiltroByOferta = SERVER_API_URL + 'api/aplicacion-ofertas/filtroByOferta';
  public resourceUrlFiltroByOfertaAndPersona = SERVER_API_URL + 'api/aplicacion-ofertas/filtroByOfertaAndPersona';

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

  public getPersonaFiltro(persona?: Persona): Observable<any> {
    const params = PathUtil.getPathParams({ persona: persona?.id});
    const url = this.resourceUrlFiltroByPersona + params;
    return this.http.get<any>(url);
  }

  public getOfertaFiltro(oferta?: any): Observable<any> {
    const params = PathUtil.getPathParams({ oferta: oferta?.id});
    const url = this.resourceUrlFiltroByOferta + params;
    return this.http.get<any>(url);
  }

  public getByOfertaAndPersonaFiltro(oferta?: any, persona?: any): Observable<any> {
    const params = PathUtil.getPathParams({ oferta: oferta?.id, persona: persona?.id});
    const url = this.resourceUrlFiltroByOfertaAndPersona + params;
    return this.http.get<any>(url);
  }

  // public listar(parameters: any): Observable<any>{
  //   const path:string = PathUtil2.getPathParams(parameters);
  //   const url = this.resourceUrl + "/aplicacionOferta"+path;
  //   return this.get(url);
  // }

  public get(url: string, headers?:any):Observable<any>{
    return this.http.get<any>(url,headers);
  }
}
