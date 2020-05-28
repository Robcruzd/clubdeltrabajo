import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersonaIdioma, PersonaIdioma } from 'app/shared/model/persona-idioma.model';
import { PersonaIdiomaService } from './persona-idioma.service';
import { PersonaIdiomaComponent } from './persona-idioma.component';
import { PersonaIdiomaDetailComponent } from './persona-idioma-detail.component';
import { PersonaIdiomaUpdateComponent } from './persona-idioma-update.component';

@Injectable({ providedIn: 'root' })
export class PersonaIdiomaResolve implements Resolve<IPersonaIdioma> {
  constructor(private service: PersonaIdiomaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonaIdioma> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((personaIdioma: HttpResponse<PersonaIdioma>) => {
          if (personaIdioma.body) {
            return of(personaIdioma.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersonaIdioma());
  }
}

export const personaIdiomaRoute: Routes = [
  {
    path: '',
    component: PersonaIdiomaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ctProjectApp.personaIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PersonaIdiomaDetailComponent,
    resolve: {
      personaIdioma: PersonaIdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.personaIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PersonaIdiomaUpdateComponent,
    resolve: {
      personaIdioma: PersonaIdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.personaIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PersonaIdiomaUpdateComponent,
    resolve: {
      personaIdioma: PersonaIdiomaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ctProjectApp.personaIdioma.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
