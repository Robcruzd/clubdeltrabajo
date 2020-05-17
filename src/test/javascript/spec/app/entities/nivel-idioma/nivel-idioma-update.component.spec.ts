import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { NivelIdiomaUpdateComponent } from 'app/entities/nivel-idioma/nivel-idioma-update.component';
import { NivelIdiomaService } from 'app/entities/nivel-idioma/nivel-idioma.service';
import { NivelIdioma } from 'app/shared/model/nivel-idioma.model';

describe('Component Tests', () => {
  describe('NivelIdioma Management Update Component', () => {
    let comp: NivelIdiomaUpdateComponent;
    let fixture: ComponentFixture<NivelIdiomaUpdateComponent>;
    let service: NivelIdiomaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [NivelIdiomaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NivelIdiomaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NivelIdiomaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelIdiomaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NivelIdioma(123);
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
        const entity = new NivelIdioma();
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
