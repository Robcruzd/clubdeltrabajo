import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoDocumento, TipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { TipoDocumentoDetailComponent } from './tipo-documento-detail.component';
import { TipoDocumentoUpdateComponent } from './tipo-documento-update.component';

@Injectable({ providedIn: 'root' })
export class TipoDocumentoResolve implements Resolve<ITipoDocumento> {
  constructor(private service: TipoDocumentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDocumento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoDocumento: HttpResponse<TipoDocumento>) => {
          if (tipoDocumento.body) {
            return of(tipoDocumento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoDocumento());
  }
}

export const tipoDocumentoRoute: Routes = [
  {
    path: '',
    component: TipoDocumentoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.tipoDocumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoDocumentoDetailComponent,
    resolve: {
      tipoDocumento: TipoDocumentoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.tipoDocumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoDocumentoUpdateComponent,
    resolve: {
      tipoDocumento: TipoDocumentoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.tipoDocumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoDocumentoUpdateComponent,
    resolve: {
      tipoDocumento: TipoDocumentoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.tipoDocumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
