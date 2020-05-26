import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CtProjectSharedModule } from 'app/shared/shared.module';
import { CtProjectCoreModule } from 'app/core/core.module';
import { CtProjectAppRoutingModule } from './app-routing.module';
import { CtProjectHomeModule } from './home/home.module';
import { CtProjectEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    BrowserModule,
    CtProjectSharedModule,
    CtProjectCoreModule,
    CtProjectHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CtProjectEntityModule,
    CtProjectAppRoutingModule,
    QRCodeModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class CtProjectAppModule {}
