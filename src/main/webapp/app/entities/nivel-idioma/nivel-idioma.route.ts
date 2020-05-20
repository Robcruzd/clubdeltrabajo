import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INivelIdioma, NivelIdioma } from 'app/shared/model/nivel-idioma.model';
import { NivelIdiomaService } from './nivel-idioma.service';
import { NivelIdiomaComponent } from './nivel-idioma.component';
import { NivelIdiomaDetailComponent } from './nivel-idioma-detail.component';
import { NivelIdiomaUpdateComponent } from './nivel-idioma-update.component';

@Injectable({ providedIn: 'root' })
export class NivelIdiomaResolve implements Resolve<INivelIdioma> {
  constructor(private service: NivelIdiomaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INivelIdioma> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((nivelIdioma: HttpResponse<NivelIdioma>) => {
          if (nivelIdioma.body) {
            return of(nivelIdioma.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NivelIdioma());
  }
}

export const nivelIdiomaRoute: Routes = [
  {
    path: '',
    component: NivelIdiomaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.nivelIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NivelIdiomaDetailComponent,
    resolve: {
      nivelIdioma: NivelIdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.nivelIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NivelIdiomaUpdateComponent,
    resolve: {
      nivelIdioma: NivelIdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.nivelIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NivelIdiomaUpdateComponent,
    resolve: {
      nivelIdioma: NivelIdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.nivelIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
