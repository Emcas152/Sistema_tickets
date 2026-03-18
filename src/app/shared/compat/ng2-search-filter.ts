import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {
  transform<T>(value: T[] | null | undefined, term: string | null | undefined): T[] {
    if (!Array.isArray(value)) {
      return [];
    }

    const normalized = (term ?? '').toString().trim().toLowerCase();
    if (!normalized) {
      return value;
    }

    return value.filter((item) => this.stringify(item).includes(normalized));
  }

  private stringify(value: unknown): string {
    if (value == null) {
      return '';
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value).toLowerCase();
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.stringify(item)).join(' ');
    }

    if (typeof value === 'object') {
      return Object.values(value as Record<string, unknown>)
        .map((item) => this.stringify(item))
        .join(' ');
    }

    return '';
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe]
})
export class Ng2SearchPipeModule {}
