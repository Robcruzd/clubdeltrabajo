import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  params: any;

  set data(params: any) {
    this.params = params;
  }

  get data(): any {
    return this.params;
  }

  constructor() {}
}
