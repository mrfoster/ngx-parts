import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { ContainerDirective } from './container/container.directive';
import { ObservableContainerComponent } from './observable-container/observable-container.component';
import { PartDirective } from './part.directive';
@NgModule({
  declarations: [
    ContainerComponent,
    ContainerDirective,
    ObservableContainerComponent,
    PartDirective
  ],
  imports: [DragDropModule, CommonModule],
  exports: [
    ContainerComponent,
    ContainerDirective,
    ObservableContainerComponent
  ]
})
export class PartsModule {}
