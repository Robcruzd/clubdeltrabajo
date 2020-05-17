import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { OfertaUpdateComponent } from 'app/entities/oferta/oferta-update.component';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { Oferta } from 'app/shared/model/oferta.model';

describe('Component Tests', () => {
  describe('Oferta Management Update Component', () => {
    let comp: OfertaUpdateComponent;
    let fixture: ComponentFixture<OfertaUpdateComponent>;
    let service: OfertaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [OfertaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OfertaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfertaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfertaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Oferta(123);
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
        const entity = new Oferta();
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
