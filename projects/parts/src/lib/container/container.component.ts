import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Part } from '../part';
import { PartsService } from '../parts.service';
import { PartsStore, PARTS_STORE } from '../parts.store';

@Component({
  selector: 'part-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() group: string;

  parts: Observable<Part[]>;
  editing: Observable<boolean>;

  constructor(
    @Inject(PARTS_STORE) private partsStore: PartsStore,
    private partsService: PartsService
  ) {
    this.editing = partsService.editing;
  }

  ngOnInit() {
    this.parts = this.partsService.parts.pipe(
      map(parts =>
        parts
          .filter(part => part.group === this.group)
          .sort((a, b) => a.index - b.index)
      )
    );

    this.partsStore.load([this.group]);
  }

  trackById(index, item) {
    return item.id;
  }

  drop(event: CdkDragDrop<Part[]>) {
    const updatePartIndexes = (parts: Part[]) => {
      parts.forEach((part, index) => {
        part.index = index;
      });
    };

    if (event.previousContainer === event.container) {
      if (event.currentIndex === event.previousIndex) {
        return;
      }

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      updatePartIndexes(event.container.data);
      this.partsService.currentParts = [...this.partsService.currentParts];
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      updatePartIndexes(event.container.data);
      updatePartIndexes(event.previousContainer.data);
      event.container.data[event.currentIndex].group = this.group;
      this.partsService.currentParts = [...this.partsService.currentParts];
    }
  }
}
