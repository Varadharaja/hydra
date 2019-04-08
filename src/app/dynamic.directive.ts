import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dyn-host]',
})
export class DynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}