import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INivelIdioma } from 'app/shared/model/nivel-idioma.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NivelIdiomaService } from './nivel-idioma.service';
import { NivelIdiomaDeleteDialogComponent } from './nivel-idioma-delete-dialog.component';

@Component({
  selector: 'jhi-nivel-idioma',
  templateUrl: './nivel-idioma.component.html'
})
export class NivelIdiomaComponent implements OnInit, OnDestroy {
  nivelIdiomas?: INivelIdioma[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected nivelIdiomaService: NivelIdiomaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.nivelIdiomaService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<INivelIdioma[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInNivelIdiomas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INivelIdioma): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNivelIdiomas(): void {
    this.eventSubscriber = this.eventManager.subscribe('nivelIdiomaListModification', () => this.loadPage());
  }

  delete(nivelIdioma: INivelIdioma): void {
    const modalRef = this.modalService.open(NivelIdiomaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nivelIdioma = nivelIdioma;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: INivelIdioma[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/nivel-idioma'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.nivelIdiomas = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
