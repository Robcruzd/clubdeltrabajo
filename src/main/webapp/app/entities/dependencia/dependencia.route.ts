import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDependencia, Dependencia } from 'app/shared/model/dependencia.model';
import { DependenciaService } from './dependencia.service';
import { DependenciaComponent } from './dependencia.component';
import { DependenciaDetailComponent } from './dependencia-detail.component';
import { DependenciaUpdateComponent } from './dependencia-update.component';

@Injectable({ providedIn: 'root' })
export class DependenciaResolve implements Resolve<IDependencia> {
  constructor(private service: DependenciaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDependencia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dependencia: HttpResponse<Dependencia>) => {
          if (dependencia.body) {
            return of(dependencia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Dependencia());
  }
}

export const dependenciaRoute: Routes = [
  {
    path: '',
    component: DependenciaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.dependencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DependenciaDetailComponent,
    resolve: {
      dependencia: DependenciaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.dependencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DependenciaUpdateComponent,
    resolve: {
      dependencia: DependenciaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.dependencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DependenciaUpdateComponent,
    resolve: {
      dependencia: DependenciaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.dependencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
