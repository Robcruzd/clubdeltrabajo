import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ICommonMessages } from 'app/shared/model/commonMessages.model';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<ICommonMessages>;
type EntityArrayResponseType = HttpResponse<ICommonMessages[]>;

export interface ConfigProps {
  contexts: Contexts;
}

export interface Contexts {
  [key: string]: Context;
}

export interface Context {
  beans: Beans;
  parentId?: any;
}

export interface Beans {
  [key: string]: Bean;
}

export interface Bean {
  id: number;
  tipoMensaje: string;
  properties: any;
}

export interface Env {
  activeProfiles?: string[];
  propertySources: PropertySource[];
}

export interface PropertySource {
  name: string;
  properties: Properties;
}

export interface Properties {
  [key: string]: Property;
}

export interface Property {
  value: string;
  origin?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getBeans(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommonMessages[]>(SERVER_API_URL + 'api/commonMessages', { params: options, observe: 'response' });
  }

  update(commonMessages: ICommonMessages): Observable<EntityResponseType> {
    // eslint-disable-next-line no-console
    console.log('commonMUpd: ', commonMessages);
    return this.http.put<ICommonMessages>(SERVER_API_URL + 'api/commonMessages', commonMessages, { observe: 'response' });
  }
}
