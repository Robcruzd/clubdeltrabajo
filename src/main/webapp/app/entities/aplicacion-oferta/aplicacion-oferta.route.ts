import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAplicacionOferta, AplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { AplicacionOfertaService } from './aplicacion-oferta.service';
import { AplicacionOfertaComponent } from './aplicacion-oferta.component';
import { AplicacionOfertaDetailComponent } from './aplicacion-oferta-detail.component';
import { AplicacionOfertaUpdateComponent } from './aplicacion-oferta-update.component';

@Injectable({ providedIn: 'root' })
export class AplicacionOfertaResolve implements Resolve<IAplicacionOferta> {
  constructor(private service: AplicacionOfertaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAplicacionOferta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((aplicacionOferta: HttpResponse<AplicacionOferta>) => {
          if (aplicacionOferta.body) {
            return of(aplicacionOferta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AplicacionOferta());
  }
}

export const aplicacionOfertaRoute: Routes = [
  {
    path: '',
    component: AplicacionOfertaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.aplicacionOferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AplicacionOfertaDetailComponent,
    resolve: {
      aplicacionOferta: AplicacionOfertaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.aplicacionOferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AplicacionOfertaUpdateComponent,
    resolve: {
      aplicacionOferta: AplicacionOfertaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.aplicacionOferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AplicacionOfertaUpdateComponent,
    resolve: {
      aplicacionOferta: AplicacionOfertaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.aplicacionOferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
