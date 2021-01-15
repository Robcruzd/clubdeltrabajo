import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router, NavigationEnd } from '@angular/router';
import { IRegiones } from 'app/shared/model/regiones.model';

declare let gtag: Function;

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  region: Array<IRegiones> = [];

  constructor(private accountService: AccountService, private loginModalService: LoginModalService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-181764554-1', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    const vid = document.getElementById('vid') as HTMLVideoElement;
    vid.muted = true;
    vid.loop = true;
    vid?.play();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  abrirAgregarUsuario(): void {
    this.router.navigate(['/previo-registrar']);
  }

  ventanaInicioSesion(): void {
    this.router.navigate(['/inicio-sesion']);
  }
}
