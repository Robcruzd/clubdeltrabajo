import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOferta, Oferta } from 'app/shared/model/oferta.model';
import { OfertaService } from './oferta.service';
import { OfertaComponent } from './oferta.component';
import { OfertaDetailComponent } from './oferta-detail.component';
import { OfertaUpdateComponent } from './oferta-update.component';

@Injectable({ providedIn: 'root' })
export class OfertaResolve implements Resolve<IOferta> {
  constructor(private service: OfertaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOferta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((oferta: HttpResponse<Oferta>) => {
          if (oferta.body) {
            return of(oferta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Oferta());
  }
}

export const ofertaRoute: Routes = [
  {
    path: '',
    component: OfertaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.oferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OfertaDetailComponent,
    resolve: {
      oferta: OfertaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.oferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OfertaUpdateComponent,
    resolve: {
      oferta: OfertaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.oferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OfertaUpdateComponent,
    resolve: {
      oferta: OfertaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.oferta.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
