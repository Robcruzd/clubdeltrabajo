import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { AplicacionOfertaUpdateComponent } from 'app/entities/aplicacion-oferta/aplicacion-oferta-update.component';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
import { AplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';

describe('Component Tests', () => {
  describe('AplicacionOferta Management Update Component', () => {
    let comp: AplicacionOfertaUpdateComponent;
    let fixture: ComponentFixture<AplicacionOfertaUpdateComponent>;
    let service: AplicacionOfertaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [AplicacionOfertaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AplicacionOfertaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AplicacionOfertaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AplicacionOfertaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AplicacionOferta(123);
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
        const entity = new AplicacionOferta();
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
