import { Route } from '@angular/router';

import { NavbarCtComponent } from './navbar-ct.component';

export const navbarCtRoute: Route = {
  path: '',
  component: NavbarCtComponent,
  outlet: 'navbar-ct'
};
