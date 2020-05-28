import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonaIdioma } from 'app/shared/model/persona-idioma.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PersonaIdiomaService } from './persona-idioma.service';
import { PersonaIdiomaDeleteDialogComponent } from './persona-idioma-delete-dialog.component';

@Component({
  selector: 'jhi-persona-idioma',
  templateUrl: './persona-idioma.component.html'
})
export class PersonaIdiomaComponent implements OnInit, OnDestroy {
  personaIdiomas?: IPersonaIdioma[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected personaIdiomaService: PersonaIdiomaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.personaIdiomaService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IPersonaIdioma[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInPersonaIdiomas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPersonaIdioma): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPersonaIdiomas(): void {
    this.eventSubscriber = this.eventManager.subscribe('personaIdiomaListModification', () => this.loadPage());
  }

  delete(personaIdioma: IPersonaIdioma): void {
    const modalRef = this.modalService.open(PersonaIdiomaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.personaIdioma = personaIdioma;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IPersonaIdioma[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/persona-idioma'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.personaIdiomas = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
