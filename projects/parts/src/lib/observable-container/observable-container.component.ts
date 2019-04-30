import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Part } from '../part';
import { PartsService, PARTS_SERVICE } from '../parts.service';

@Component({
  selector: 'part-observable-container',
  templateUrl: './observable-container.component.html',
  styleUrls: ['./observable-container.component.css']
})
export class ObservableContainerComponent implements OnInit {
  @Input() group: string;
  @Input() editable: boolean;

  parts: Observable<Part[]>;

  constructor(@Inject(PARTS_SERVICE) private partsService: PartsService) {}

  ngOnInit() {
    this.parts = this.partsService.parts.pipe(
      map(parts =>
        parts
          .filter(part => part.group === this.group)
          .sort((a, b) => a.index - b.index)
      )
    );

    this.partsService.load([this.group]);
  }

  trackById(index, item) {
    return item.id;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      const parts = event.container.data;
      if (event.currentIndex === event.previousIndex) {
        return;
      }

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
