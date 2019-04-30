import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Part } from '../part';
import { PartsRenderer } from '../parts.renderer';

@Component({
  selector: 'part-container',
  template: `
    <ng-container #container></ng-container>
  `
})
export class ContainerComponent implements OnChanges {
  @Input()
  parts: Part[];

  @ViewChild('container', { read: ViewContainerRef })
  private container: ViewContainerRef;

  constructor(private partsRenderer: PartsRenderer) {}

  ngOnChanges(changes: SimpleChanges) {
    // TODO: check if changed

    if (changes.parts && changes.parts.currentValue) {
      this.partsRenderer.renderParts(this.container, this.parts);
    }
  }
}
