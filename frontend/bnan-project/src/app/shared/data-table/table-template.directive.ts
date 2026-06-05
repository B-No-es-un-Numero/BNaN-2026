import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableTemplate]',
})
export class TableTemplateDirective {
  constructor(public templateRef: TemplateRef<any>) {}

  @Input('appTableTemplate') columnKey!: string;
}
