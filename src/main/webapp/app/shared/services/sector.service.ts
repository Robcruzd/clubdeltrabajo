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
export class SectorService {
  public resourceUrl = SERVER_API_URL + 'api/sector';
  public resourceUrlById = SERVER_API_URL + 'api/sector/id';

  constructor(protected http: HttpClient) {}

  getSector(): Observable<any> {
    const params = PathUtil.getPathParams({});
    const url = this.resourceUrl + params;
    return this.http.get<any>(url);
  }

  getSectorById(ide: string): Observable<any> {
    const params = PathUtil.getPathParams({ id: ide });
    const url = this.resourceUrlById + params;
    return this.http.get<any>(url);
  }
}
