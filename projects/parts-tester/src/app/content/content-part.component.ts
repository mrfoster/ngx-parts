import { Component } from '@angular/core';
import { PartRegistration, Stateful } from 'parts';
import { ContentState } from './content-state';

@Component({
  selector: 'app-content-part',
  templateUrl: './content-part.component.html'
})
export class ContentPartComponent implements Stateful<ContentState> {
  state: ContentState;

  setState(state: ContentState) {
    this.state = state;
  }
}

export const ContentPartRegistration: PartRegistration = {
  displayName: 'Content',
  name: 'app-content-part',
  type: ContentPartComponent
};
