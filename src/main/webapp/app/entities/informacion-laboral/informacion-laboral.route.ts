import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInformacionLaboral, InformacionLaboral } from 'app/shared/model/informacion-laboral.model';
import { InformacionLaboralService } from './informacion-laboral.service';
import { InformacionLaboralComponent } from './informacion-laboral.component';
import { InformacionLaboralDetailComponent } from './informacion-laboral-detail.component';
import { InformacionLaboralUpdateComponent } from './informacion-laboral-update.component';

@Injectable({ providedIn: 'root' })
export class InformacionLaboralResolve implements Resolve<IInformacionLaboral> {
  constructor(private service: InformacionLaboralService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInformacionLaboral> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((informacionLaboral: HttpResponse<InformacionLaboral>) => {
          if (informacionLaboral.body) {
            return of(informacionLaboral.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InformacionLaboral());
  }
}

export const informacionLaboralRoute: Routes = [
  {
    path: '',
    component: InformacionLaboralComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.informacionLaboral.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InformacionLaboralDetailComponent,
    resolve: {
      informacionLaboral: InformacionLaboralResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionLaboral.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InformacionLaboralUpdateComponent,
    resolve: {
      informacionLaboral: InformacionLaboralResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionLaboral.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InformacionLaboralUpdateComponent,
    resolve: {
      informacionLaboral: InformacionLaboralResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionLaboral.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
