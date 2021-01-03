import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegiones, Regiones } from 'app/shared/model/regiones.model';
import { RegionesService } from './regiones.service';
import { RegionesComponent } from './regiones.component';
import { RegionesDetailComponent } from './regiones-detail.component';
import { RegionesUpdateComponent } from './regiones-update.component';

@Injectable({ providedIn: 'root' })
export class RegionesResolve implements Resolve<IRegiones> {
  constructor(private service: RegionesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegiones> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((regiones: HttpResponse<Regiones>) => {
          if (regiones.body) {
            return of(regiones.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Regiones());
  }
}

export const regionesRoute: Routes = [
  {
    path: '',
    component: RegionesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.regiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RegionesDetailComponent,
    resolve: {
      regiones: RegionesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.regiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RegionesUpdateComponent,
    resolve: {
      regiones: RegionesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.regiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RegionesUpdateComponent,
    resolve: {
      regiones: RegionesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.regiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
