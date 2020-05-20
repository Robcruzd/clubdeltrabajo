import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInformacionAcademica, InformacionAcademica } from 'app/shared/model/informacion-academica.model';
import { InformacionAcademicaService } from './informacion-academica.service';
import { InformacionAcademicaComponent } from './informacion-academica.component';
import { InformacionAcademicaDetailComponent } from './informacion-academica-detail.component';
import { InformacionAcademicaUpdateComponent } from './informacion-academica-update.component';

@Injectable({ providedIn: 'root' })
export class InformacionAcademicaResolve implements Resolve<IInformacionAcademica> {
  constructor(private service: InformacionAcademicaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInformacionAcademica> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((informacionAcademica: HttpResponse<InformacionAcademica>) => {
          if (informacionAcademica.body) {
            return of(informacionAcademica.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InformacionAcademica());
  }
}

export const informacionAcademicaRoute: Routes = [
  {
    path: '',
    component: InformacionAcademicaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.informacionAcademica.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InformacionAcademicaDetailComponent,
    resolve: {
      informacionAcademica: InformacionAcademicaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionAcademica.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InformacionAcademicaUpdateComponent,
    resolve: {
      informacionAcademica: InformacionAcademicaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionAcademica.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InformacionAcademicaUpdateComponent,
    resolve: {
      informacionAcademica: InformacionAcademicaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.informacionAcademica.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
