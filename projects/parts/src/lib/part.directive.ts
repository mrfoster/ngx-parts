import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Part } from './part';
import { PartsRenderer } from './parts.renderer';

@Directive({
  selector: '[partPart]'
})
export class PartDirective implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private partsRenderer: PartsRenderer
  ) {}

  @Input('partPart') part: Part;

  ngOnInit(): void {
    this.partsRenderer.renderPart(this.viewContainerRef, this.part);
  }
}
