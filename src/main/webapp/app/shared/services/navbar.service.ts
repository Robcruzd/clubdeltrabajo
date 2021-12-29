import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarState = new BehaviorSubject<any>(null);

  cast = this.navbarState.asObservable();

  constructor(private sessionStorage: SessionStorageService, private commonMessagesService: CommonMessagesService) {
    /* eslint-disable no-console */
    console.log('api services');
    // this.commonMessagesService.find(1).subscribe(res =>
    //   {
    //     /* eslint-disable no-console */
    //     console.log('common Messages: ', res.body?.mensajes);
    //     // this.commonMessages = res.body?.mensajes;
    //     this.sessionStorage.store('commonMessages', res.body?.mensajes);
    //   })
  }

  setNavbarState(status: boolean): void {
    this.navbarState.next(status);
  }
}
