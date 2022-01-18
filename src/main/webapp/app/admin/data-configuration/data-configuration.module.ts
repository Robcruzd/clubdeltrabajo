import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CtProjectSharedModule } from 'app/shared/shared.module';

import { ConfigurationComponent } from './data-configuration.component';

import { configurationRoute } from './data-configuration.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild([configurationRoute])],
  declarations: [ConfigurationComponent]
})
export class ConfigurationModule {}
