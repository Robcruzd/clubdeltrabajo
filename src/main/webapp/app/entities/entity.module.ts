import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EntityRoutingModule } from './entity-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EntityRoutingModule, FontAwesomeModule],
  declarations: []
})
export class CtProjectEntityModule {}
