import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInformacionPersonal, InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { InformacionPersonalService } from './informacion-personal.service';
import { InformacionPersonalComponent } from './informacion-personal.component';
import { InformacionPersonalDetailComponent } from './informacion-personal-detail.component';
import { InformacionPersonalUpdateComponent } from './informacion-personal-update.component';

@Injectable({ providedIn: 'root' })
export class InformacionPersonalResolve implements Resolve<IInformacionPersonal> {
  constructor(private service: InformacionPersonalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInformacionPersonal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((informacionPersonal: HttpResponse<InformacionPersonal>) => {
          if (informacionPersonal.body) {
            return of(informacionPersonal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InformacionPersonal());
  }
}

export const informacionPersonalRoute: Routes = [
  {
    path: '',
    component: InformacionPersonalComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.informacionPersonal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InformacionPersonalDetailComponent,
    resolve: {
      informacionPersonal: InformacionPersonalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionPersonal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InformacionPersonalUpdateComponent,
    resolve: {
      informacionPersonal: InformacionPersonalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionPersonal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InformacionPersonalUpdateComponent,
    resolve: {
      informacionPersonal: InformacionPersonalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionPersonal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
