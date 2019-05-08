import {
  CdkDragDrop,
  DropListRef,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Part } from '../part';
import { PartsEditService } from '../parts-edit.service';
import { PartsService, PARTS_SERVICE } from '../parts.service';

@Component({
  selector: 'part-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {
  @Input() group: string;

  partsChanged: Observable<Part[]>;
  editingChanged: Observable<boolean>;
  private subscription = new Subscription();
  private dropList: DropListRef<Part[]>;

  constructor(
    @Inject(PARTS_SERVICE) private partsService: PartsService,
    partsEditService: PartsEditService,
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2 // private dragDrop: DragDrop,
  ) {
    this.editingChanged = partsEditService.editingChanged;

    this.partsChanged = this.partsService.partsChanged.pipe(
      map(parts =>
        parts
          .filter(part => part.group === this.group)
          .sort((a, b) => a.index - b.index)
      )
    );

    timer(0)
      .pipe(flatMap(x => this.partsService.load([this.group])))
      .subscribe();

    // this.dropList = this.dragDrop.createDropList<Part[]>(this.elRef);

    // this.subscription.add(
    //   this.dropList.dropped
    //     .pipe(
    //       map(event => ({
    //         previousIndex: event.previousIndex,
    //         currentIndex: event.currentIndex,
    //         previousContainer: event.previousContainer.data,
    //         container: event.container.data,
    //         item: event.item.data,
    //         isPointerOverContainer: event.isPointerOverContainer
    //       }))
    //     )
    //     .subscribe(e => {
    //       this.drop(e);
    //     })
    // );

    // this.subscription.add(
    //   this.partsService.parts.subscribe(parts => {
    //     this.dropList.data = parts;
    //     // TODO
    //     //this.dropList.withItems()
    //   })
    // );
  }

  ngOnInit(): void {
    this.renderer.addClass(this.elRef.nativeElement, 'part-list');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dropList.dispose();
  }

  trackById(_index: any, item: Part) {
    return item.id;
  }

  drop(event: CdkDragDrop<Part[]>) {
    const updatePartIndexes = (parts: Part[]) =>
      parts
        .map((part, index) => ({ part: part, index: index }))
        .filter(x => x.index !== x.part.index)
        .map(x => ({ ...x.part, index: x.index }));

    if (event.previousContainer === event.container) {
      if (event.currentIndex === event.previousIndex) {
        return;
      }

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const updatedParts = updatePartIndexes(event.container.data);
      this.partsService.update(updatedParts);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const transferredPart = event.container.data[event.currentIndex];
      transferredPart.group = this.group;

      const updatedParts = [
        ...updatePartIndexes(event.container.data),
        ...updatePartIndexes(event.previousContainer.data)
      ];

      const updatedPartsContainsTransferredPart = updatedParts.find(
        x => x.id === transferredPart.id
      );

      this.partsService.update(
        updatedPartsContainsTransferredPart
          ? updatedParts
          : [...updatedParts, transferredPart]
      );
    }
  }
}
