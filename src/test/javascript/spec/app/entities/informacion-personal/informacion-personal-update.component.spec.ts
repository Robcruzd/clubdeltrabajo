import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionPersonalUpdateComponent } from 'app/entities/informacion-personal/informacion-personal-update.component';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';

describe('Component Tests', () => {
  describe('InformacionPersonal Management Update Component', () => {
    let comp: InformacionPersonalUpdateComponent;
    let fixture: ComponentFixture<InformacionPersonalUpdateComponent>;
    let service: InformacionPersonalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionPersonalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InformacionPersonalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InformacionPersonalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InformacionPersonalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InformacionPersonal(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new InformacionPersonal();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
