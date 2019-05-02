import { Component } from '@angular/core';
import { PartRegistration, Stateful } from 'parts';

@Component({
  selector: 'app-content-part',
  templateUrl: './content-part.component.html'
})
export class ContentPartComponent implements Stateful<ContentState> {
  state: ContentState = {
    content: 'dsfd'
  };

  setState(state: ContentState): void {
    this.state = state;
  }
}

export const ContentPartRegistration: PartRegistration = {
  displayName: 'Content',
  name: 'app-content-part',
  type: ContentPartComponent
};

export class ContentState {
  content: string;
}
