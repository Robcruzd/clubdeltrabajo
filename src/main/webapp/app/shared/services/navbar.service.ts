import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarState = new BehaviorSubject<any>(null);

  cast = this.navbarState.asObservable();

  constructor() {}

  setNavbarState(status: boolean): void {
    this.navbarState.next(status);
  }
}
