import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { IOferta, Oferta } from 'app/shared/model/oferta.model';

describe('Service Tests', () => {
  describe('Oferta Service', () => {
    let injector: TestBed;
    let service: OfertaService;
    let httpMock: HttpTestingController;
    let elemDefault: IOferta;
    let expectedResult: IOferta | IOferta[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OfertaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Oferta(0, 'AAAAAAA', 'AAAAAAA', 0, 0, 'AAAAAAA', 0, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaPublicacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Oferta', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaPublicacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPublicacion: currentDate
          },
          returnedFromService
        );

        service.create(new Oferta()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Oferta', () => {
        const returnedFromService = Object.assign(
          {
            descripcion: 'BBBBBB',
            titulo: 'BBBBBB',
            salario: 1,
            cargo: 1,
            experiencia: 'BBBBBB',
            ciudad: 1,
            area: 1,
            fechaPublicacion: currentDate.format(DATE_FORMAT),
            estado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPublicacion: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Oferta', () => {
        const returnedFromService = Object.assign(
          {
            descripcion: 'BBBBBB',
            titulo: 'BBBBBB',
            salario: 1,
            cargo: 1,
            experiencia: 'BBBBBB',
            ciudad: 1,
            area: 1,
            fechaPublicacion: currentDate.format(DATE_FORMAT),
            estado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPublicacion: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Oferta', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
