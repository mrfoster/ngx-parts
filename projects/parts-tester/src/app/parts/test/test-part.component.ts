import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Inject
} from '@angular/core';
import {
  Identifiable,
  PartRegistration,
  PartsEditService,
  PartsService,
  PARTS_SERVICE,
  Stateful
} from 'parts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-part',
  templateUrl: './test-part.component.html',
  styleUrls: ['./test-part.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPartComponent implements Stateful<any>, Identifiable, DoCheck {
  constructor(
    @Inject(PARTS_SERVICE) private partsService: PartsService,
    partsEditService: PartsEditService
  ) {
    this.canEdit = partsEditService.editingChanged;
  }
  id: string;
  canEdit: Observable<boolean>;
  editing: boolean;

  state: any;
  setCount = 0;
  checkCount = 0;

  editableState: string;

  setState(state: any) {
    this.setCount += 1;
    this.state = state;
  }

  remove() {
    this.partsService.delete(this.id).subscribe();
  }

  ngDoCheck(): void {
    this.checkCount += 1;
  }

  edit() {
    this.editableState = JSON.stringify(this.state);
    this.editing = true;
  }

  save() {
    this.state = JSON.parse(this.editableState);
    this.partsService.update(this.id, this.state).subscribe();
    this.editing = false;
  }

  cancel() {
    this.editing = false;
  }
}

export const TestPartRegistration: PartRegistration = {
  displayName: 'Test',
  name: 'app-test-part',
  type: TestPartComponent
};
