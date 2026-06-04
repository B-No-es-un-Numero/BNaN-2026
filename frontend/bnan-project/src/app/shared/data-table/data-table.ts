import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  computed,
  signal,
} from '@angular/core';
import { TableColumn } from '../../model/table-column.model';
import { TableTemplateDirective } from './table-template.directive';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.css']
})
export class DataTable implements AfterContentInit {
  @Input()
  set data(v: any[]) {
    this._data.set(v);
    this.currentPage.set(1);
  }
  get data(): any[] {
    return this._data();
  }
  private _data = signal<any[]>([]);

  @Input() columns: TableColumn[] = [];
  @Input() pageSize = 10;
  @Input() emptyMessage = 'No se encontraron registros';
  @Input() loading = false;
  @Input() skeletonRows = 5;

  @ContentChildren(TableTemplateDirective) templateDirectives!: QueryList<TableTemplateDirective>;

  templatesMap: Record<string, any> = {};
  templateKeys = new Set<string>();

  skeletonArray = Array.from({ length: 5 }, (_, i) => i);

  currentPage = signal(1);

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this._data().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this._data().length / this.pageSize)));

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const items: (number | '...')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) items.push(i);
      return items;
    }

    items.push(1);

    if (current > 3) items.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) items.push(i);

    if (current < total - 2) items.push('...');

    if (total > 1) items.push(total);
    return items;
  });

  ngAfterContentInit(): void {
    this.templateDirectives.forEach((d) => {
      this.templatesMap[d.columnKey] = d.templateRef;
      this.templateKeys.add(d.columnKey);
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  skeletonWidthClass(ci: number, total: number): string {
    const widths = ['col-3', 'col-6', 'col-5', 'col-4', 'col-7', 'col-8'];
    return widths[ci % widths.length];
  }
}