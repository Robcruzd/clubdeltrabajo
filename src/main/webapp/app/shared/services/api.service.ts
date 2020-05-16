import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_UBICACIONES } from '../constants/constantes.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getInformacionGeografica(): Observable<any> {
    return this.http.get<any>(URL_UBICACIONES);
  }
}
