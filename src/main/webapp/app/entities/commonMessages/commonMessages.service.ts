import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICommonMessages } from 'app/shared/model/commonMessages.model';

type EntityResponseType = HttpResponse<ICommonMessages>;
type EntityArrayResponseType = HttpResponse<ICommonMessages[]>;

@Injectable({ providedIn: 'root' })
export class CommonMessagesService {
  public resourceUrl = SERVER_API_URL + 'api/commonMessages';

  constructor(protected http: HttpClient) {}

  create(commonMessages: ICommonMessages): Observable<EntityResponseType> {
    return this.http.post<ICommonMessages>(this.resourceUrl, commonMessages, { observe: 'response' });
  }

  update(commonMessages: ICommonMessages): Observable<EntityResponseType> {
    return this.http.put<ICommonMessages>(this.resourceUrl, commonMessages, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommonMessages>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommonMessages[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
