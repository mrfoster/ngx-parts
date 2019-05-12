import {
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { Part } from './part';
import { PartsFactory } from './parts-factory.service';

@Directive({
  selector: '[partPart]'
})
export class PartDirective implements OnInit, OnDestroy {
  private componentRef: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private partsFactory: PartsFactory
  ) {}

  @Input('partPart') part: Part;

  ngOnInit(): void {
    this.componentRef = this.partsFactory.createComponent(
      this.viewContainerRef,
      this.part
    );
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
