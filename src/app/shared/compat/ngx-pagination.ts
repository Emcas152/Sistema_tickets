import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, NgModule, Output, Pipe, PipeTransform } from '@angular/core';

interface PaginationConfig {
  currentPage?: number;
  itemsPerPage?: number;
}

@Injectable({ providedIn: 'root' })
class PaginationStateService {
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  update(config: PaginationConfig | null | undefined, totalItems: number): void {
    this.currentPage = Math.max(1, config?.currentPage ?? 1);
    this.itemsPerPage = Math.max(1, config?.itemsPerPage ?? 10);
    this.totalItems = Math.max(0, totalItems);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }
}

@Pipe({
  name: 'paginate',
  standalone: false,
  pure: false
})
export class PaginatePipe implements PipeTransform {
  constructor(private readonly state: PaginationStateService) {}

  transform<T>(collection: T[] | null | undefined, config?: PaginationConfig): T[] {
    if (!Array.isArray(collection)) {
      this.state.update(config, 0);
      return [];
    }

    this.state.update(config, collection.length);
    const start = (this.state.currentPage - 1) * this.state.itemsPerPage;
    return collection.slice(start, start + this.state.itemsPerPage);
  }
}

@Component({
  selector: 'pagination-controls',
  template: `
    <nav class="ngx-pagination" *ngIf="pages.length > 1">
      <button type="button" (click)="selectPage(state.currentPage - 1)" [disabled]="state.currentPage <= 1">
        {{ previousLabel || 'Previous' }}
      </button>
      <button
        type="button"
        *ngFor="let page of pages"
        (click)="selectPage(page)"
        [class.current]="page === state.currentPage">
        {{ page }}
      </button>
      <button
        type="button"
        (click)="selectPage(state.currentPage + 1)"
        [disabled]="state.currentPage >= state.totalPages">
        {{ nextLabel || 'Next' }}
      </button>
    </nav>
  `,
  standalone: false
})
export class PaginationControlsComponent {
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Output() pageChange = new EventEmitter<number>();

  constructor(public readonly state: PaginationStateService) {}

  get pages(): number[] {
    return Array.from({ length: this.state.totalPages }, (_, index) => index + 1);
  }

  selectPage(page: number): void {
    const boundedPage = Math.min(Math.max(page, 1), this.state.totalPages);
    if (boundedPage === this.state.currentPage) {
      return;
    }

    this.pageChange.emit(boundedPage);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PaginatePipe, PaginationControlsComponent],
  exports: [PaginatePipe, PaginationControlsComponent]
})
export class NgxPaginationModule {}
