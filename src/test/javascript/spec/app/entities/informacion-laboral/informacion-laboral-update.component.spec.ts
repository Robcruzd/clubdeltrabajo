import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionLaboralUpdateComponent } from 'app/entities/informacion-laboral/informacion-laboral-update.component';
import { InformacionLaboralService } from 'app/entities/informacion-laboral/informacion-laboral.service';
import { InformacionLaboral } from 'app/shared/model/informacion-laboral.model';

describe('Component Tests', () => {
  describe('InformacionLaboral Management Update Component', () => {
    let comp: InformacionLaboralUpdateComponent;
    let fixture: ComponentFixture<InformacionLaboralUpdateComponent>;
    let service: InformacionLaboralService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionLaboralUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InformacionLaboralUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InformacionLaboralUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InformacionLaboralService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InformacionLaboral(123);
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
        const entity = new InformacionLaboral();
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
