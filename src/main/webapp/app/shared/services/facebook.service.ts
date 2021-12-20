import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  public resourceUrl = SERVER_API_URL + 'api/facebookPost';

  constructor(protected http: HttpClient) {}

  publicarPost(oferta: String, empresa: String): Observable<string> {
    const params = PathUtil.getPathParams({ codigoOferta: oferta, codigoEmpresa: empresa });
    const url = this.resourceUrl + params;
    return this.http.get<string>(url);
  }
}
