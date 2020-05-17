import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICargo, Cargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';
import { CargoComponent } from './cargo.component';
import { CargoDetailComponent } from './cargo-detail.component';
import { CargoUpdateComponent } from './cargo-update.component';

@Injectable({ providedIn: 'root' })
export class CargoResolve implements Resolve<ICargo> {
  constructor(private service: CargoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICargo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cargo: HttpResponse<Cargo>) => {
          if (cargo.body) {
            return of(cargo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cargo());
  }
}

export const cargoRoute: Routes = [
  {
    path: '',
    component: CargoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.cargo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CargoDetailComponent,
    resolve: {
      cargo: CargoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.cargo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CargoUpdateComponent,
    resolve: {
      cargo: CargoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.cargo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CargoUpdateComponent,
    resolve: {
      cargo: CargoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.cargo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
