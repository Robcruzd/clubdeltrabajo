import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IIdioma, Idioma } from 'app/shared/model/idioma.model';
import { IdiomaService } from './idioma.service';
import { IdiomaComponent } from './idioma.component';
import { IdiomaDetailComponent } from './idioma-detail.component';
import { IdiomaUpdateComponent } from './idioma-update.component';

@Injectable({ providedIn: 'root' })
export class IdiomaResolve implements Resolve<IIdioma> {
  constructor(private service: IdiomaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIdioma> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((idioma: HttpResponse<Idioma>) => {
          if (idioma.body) {
            return of(idioma.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Idioma());
  }
}

export const idiomaRoute: Routes = [
  {
    path: '',
    component: IdiomaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.idioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IdiomaDetailComponent,
    resolve: {
      idioma: IdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.idioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IdiomaUpdateComponent,
    resolve: {
      idioma: IdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.idioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IdiomaUpdateComponent,
    resolve: {
      idioma: IdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.idioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
