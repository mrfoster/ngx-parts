import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { Identifiable, PartRegistration, PartsService, Stateful } from 'parts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-part',
  templateUrl: './test-part.component.html',
  styleUrls: ['./test-part.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPartComponent implements Stateful<any>, Identifiable, DoCheck {
  constructor(private partsService: PartsService) {
    this.canEdit = partsService.editing;
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
    this.partsService.remove(this.id);
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
    this.partsService.update(this.id, this.state);
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
