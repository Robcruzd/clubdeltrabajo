import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { PersonaIdiomaUpdateComponent } from 'app/entities/persona-idioma/persona-idioma-update.component';
import { PersonaIdiomaService } from 'app/entities/persona-idioma/persona-idioma.service';
import { PersonaIdioma } from 'app/shared/model/persona-idioma.model';

describe('Component Tests', () => {
  describe('PersonaIdioma Management Update Component', () => {
    let comp: PersonaIdiomaUpdateComponent;
    let fixture: ComponentFixture<PersonaIdiomaUpdateComponent>;
    let service: PersonaIdiomaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [PersonaIdiomaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PersonaIdiomaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonaIdiomaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonaIdiomaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PersonaIdioma(123);
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
        const entity = new PersonaIdioma();
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
