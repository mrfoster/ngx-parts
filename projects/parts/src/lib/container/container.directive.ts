import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { Part } from '../part';
import { PartsRenderer } from '../parts.renderer';

@Directive({
  selector: '[partContainer]'
})
export class ContainerDirective implements OnChanges {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private partsRenderer: PartsRenderer
  ) {}
  @Input()
  parts: Part[];

  ngOnChanges(changes: SimpleChanges) {
    // TODO: check if changed

    if (changes.parts && changes.parts.currentValue) {
      this.partsRenderer.renderParts(this.viewContainerRef, this.parts);
    }
  }
}
