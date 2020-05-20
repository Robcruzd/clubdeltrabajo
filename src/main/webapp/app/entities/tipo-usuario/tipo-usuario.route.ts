import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoUsuario, TipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';
import { TipoUsuarioComponent } from './tipo-usuario.component';
import { TipoUsuarioDetailComponent } from './tipo-usuario-detail.component';
import { TipoUsuarioUpdateComponent } from './tipo-usuario-update.component';

@Injectable({ providedIn: 'root' })
export class TipoUsuarioResolve implements Resolve<ITipoUsuario> {
  constructor(private service: TipoUsuarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoUsuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoUsuario: HttpResponse<TipoUsuario>) => {
          if (tipoUsuario.body) {
            return of(tipoUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoUsuario());
  }
}

export const tipoUsuarioRoute: Routes = [
  {
    path: '',
    component: TipoUsuarioComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.tipoUsuario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoUsuarioDetailComponent,
    resolve: {
      tipoUsuario: TipoUsuarioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.tipoUsuario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoUsuarioUpdateComponent,
    resolve: {
      tipoUsuario: TipoUsuarioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.tipoUsuario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoUsuarioUpdateComponent,
    resolve: {
      tipoUsuario: TipoUsuarioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.tipoUsuario.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
