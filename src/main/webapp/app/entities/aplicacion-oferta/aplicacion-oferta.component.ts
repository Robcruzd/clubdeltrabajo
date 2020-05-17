import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AplicacionOfertaService } from './aplicacion-oferta.service';
import { AplicacionOfertaDeleteDialogComponent } from './aplicacion-oferta-delete-dialog.component';

@Component({
  selector: 'jhi-aplicacion-oferta',
  templateUrl: './aplicacion-oferta.component.html'
})
export class AplicacionOfertaComponent implements OnInit, OnDestroy {
  aplicacionOfertas?: IAplicacionOferta[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected aplicacionOfertaService: AplicacionOfertaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.aplicacionOfertaService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IAplicacionOferta[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInAplicacionOfertas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAplicacionOferta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAplicacionOfertas(): void {
    this.eventSubscriber = this.eventManager.subscribe('aplicacionOfertaListModification', () => this.loadPage());
  }

  delete(aplicacionOferta: IAplicacionOferta): void {
    const modalRef = this.modalService.open(AplicacionOfertaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aplicacionOferta = aplicacionOferta;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IAplicacionOferta[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/aplicacion-oferta'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.aplicacionOfertas = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
