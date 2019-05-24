import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import {
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { Part } from './part';
import { PartsFactory } from './parts-factory.service';

@Directive({
  selector: '[partPart]'
})
export class PartDirective implements OnInit, OnDestroy {
  @Input('partPart') part: Part;
  private componentRef: ComponentRef<any>;
  dragRef: DragRef<Part>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private partsFactory: PartsFactory,
    private dragDrop: DragDrop,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.componentRef = this.partsFactory.createComponent(
      this.viewContainerRef,
      this.part
    );

    if (this.componentRef) {
      const elRef = this.componentRef.location;
      this.renderer.addClass(elRef.nativeElement, 'part-item');

      this.dragRef = this.dragDrop.createDrag(elRef);
      this.dragRef.data = this.part;
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    if (this.dragRef) {
      this.dragRef.dispose();
    }
  }
}
