import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { Identifiable, PartRegistration, PartsService, Stateful } from 'parts';

@Component({
  selector: 'app-test-part',
  templateUrl: './test-part.component.html',
  styles: [
    `
      :host:before,
      :host:after {
        content: ' ';
        display: table;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPartComponent implements Stateful<any>, Identifiable, DoCheck {
  constructor(private partsService: PartsService) {}
  id: string;
  canEdit: boolean;

  state: any;
  setCount = 0;
  checkCount = 0;

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
}

export const TestPartRegistration: PartRegistration = {
  displayName: 'Test',
  name: 'app-test-part',
  type: TestPartComponent
};
