import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { InformacionLaboralService } from 'app/entities/informacion-laboral/informacion-laboral.service';
import { IInformacionLaboral, InformacionLaboral } from 'app/shared/model/informacion-laboral.model';

describe('Service Tests', () => {
  describe('InformacionLaboral Service', () => {
    let injector: TestBed;
    let service: InformacionLaboralService;
    let httpMock: HttpTestingController;
    let elemDefault: IInformacionLaboral;
    let expectedResult: IInformacionLaboral | IInformacionLaboral[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InformacionLaboralService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InformacionLaboral(
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InformacionLaboral', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );

        service.create(new InformacionLaboral()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InformacionLaboral', () => {
        const returnedFromService = Object.assign(
          {
            nombreEmpresa: 'BBBBBB',
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT),
            direccion: 'BBBBBB',
            ciudad: 1,
            departamento: 1,
            pais: 'BBBBBB',
            telefonoEmpresa: 'BBBBBB',
            dependencia: 'BBBBBB',
            ciudadExtranjera: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InformacionLaboral', () => {
        const returnedFromService = Object.assign(
          {
            nombreEmpresa: 'BBBBBB',
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT),
            direccion: 'BBBBBB',
            ciudad: 1,
            departamento: 1,
            pais: 'BBBBBB',
            telefonoEmpresa: 'BBBBBB',
            dependencia: 'BBBBBB',
            ciudadExtranjera: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InformacionLaboral', () => {
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
