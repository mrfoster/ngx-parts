import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { PartDirective } from './part.directive';

@NgModule({
  declarations: [ContainerComponent, PartDirective],
  imports: [DragDropModule, CommonModule],
  exports: [ContainerComponent, DragDropModule],
})
export class PartsModule {}
