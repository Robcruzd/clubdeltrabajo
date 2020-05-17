import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionAcademicaUpdateComponent } from 'app/entities/informacion-academica/informacion-academica-update.component';
import { InformacionAcademicaService } from 'app/entities/informacion-academica/informacion-academica.service';
import { InformacionAcademica } from 'app/shared/model/informacion-academica.model';

describe('Component Tests', () => {
  describe('InformacionAcademica Management Update Component', () => {
    let comp: InformacionAcademicaUpdateComponent;
    let fixture: ComponentFixture<InformacionAcademicaUpdateComponent>;
    let service: InformacionAcademicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionAcademicaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InformacionAcademicaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InformacionAcademicaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InformacionAcademicaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InformacionAcademica(123);
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
        const entity = new InformacionAcademica();
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
