import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { TipoUsuarioDetailComponent } from 'app/entities/tipo-usuario/tipo-usuario-detail.component';
import { TipoUsuario } from 'app/shared/model/tipo-usuario.model';

describe('Component Tests', () => {
  describe('TipoUsuario Management Detail Component', () => {
    let comp: TipoUsuarioDetailComponent;
    let fixture: ComponentFixture<TipoUsuarioDetailComponent>;
    const route = ({ data: of({ tipoUsuario: new TipoUsuario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [TipoUsuarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoUsuarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoUsuarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoUsuario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoUsuario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
