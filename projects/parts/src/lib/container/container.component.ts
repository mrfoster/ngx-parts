import {
  DragDrop,
  DropListRef,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { flatMap, map, share } from 'rxjs/operators';
import { v4 } from 'uuid';
import { Part } from '../part';
import { PartDirective } from '../part.directive';
import { PartsEditService } from '../parts-edit.service';
import { PartsService, PARTS_SERVICE } from '../parts.service';

@Component({
  selector: 'part-container,[partContainer]',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() group: string;
  @Input() defaultParts: Part[];

  @ViewChildren(PartDirective) partDirectives: QueryList<PartDirective>;

  partsChanged: Observable<Part[]>;
  editingChanged: Observable<boolean>;
  private subscription = new Subscription();
  private dropList: DropListRef<Part[]>;

  constructor(
    @Inject(PARTS_SERVICE) private partsService: PartsService,
    partsEditService: PartsEditService,
    private elRef: ElementRef<HTMLElement>,
    private dragDrop: DragDrop,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.editingChanged = partsEditService.editingChanged.pipe(share());

    this.partsChanged = this.partsService.partsChanged.pipe(
      map(parts =>
        parts
          .filter(part => part.group === this.group)
          .sort((a, b) => a.index - b.index)
      )
    );

    this.subscription.add(
      timer(0)
        .pipe(
          flatMap(x => this.partsService.load([this.group])),
          flatMap(parts => {
            if (parts && parts.length) {
              return of(parts);
            }

            return this.partsService.add([
              ...this.defaultParts,
              {
                id: v4(),
                index: 0,
                state: null,
                type: 'init-marker',
                group: this.group
              }
            ]);
          })
        )
        .subscribe()
    );

    this.dropList = this.dragDrop.createDropList<Part[]>(this.elRef);

    this.subscription.add(
      this.dropList.dropped
        .pipe(
          map(event => ({
            previousIndex: event.previousIndex,
            currentIndex: event.currentIndex,
            previousContainer: event.previousContainer,
            container: event.container,
            item: event.item,
            isPointerOverContainer: event.isPointerOverContainer
          }))
        )
        .subscribe(e => {
          this.drop(e);
          this.changeDetectorRef.markForCheck();
        })
    );
  }

  ngOnInit(): void {
    this.elRef.nativeElement.classList.add('part-list');
  }

  ngAfterViewInit(): void {
    this.partDirectives.changes.subscribe(
      (partDirectives: QueryList<PartDirective>) => {
        const dragRefs = partDirectives.map(x => x.dragRef).filter(x => !!x);
        this.dropList.withItems(dragRefs);
        this.dropList.data = dragRefs.map(p => p.data);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dropList) {
      this.dropList.dispose();
    }
    this.subscription.unsubscribe();
  }

  trackById(_index: any, item: Part) {
    return item.id;
  }

  drop(event) {
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
