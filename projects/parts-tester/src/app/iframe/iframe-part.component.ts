import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PartRegistration, Stateful } from 'parts';

@Component({
  selector: 'app-iframe-part',
  templateUrl: './iframe-part.component.html'
})
export class IframePartComponent implements Stateful<IframeState> {
  state: IframeState;
  src: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  setState(state: IframeState) {
    this.state = state;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.state.src);
  }
}

export const IframePartRegistration: PartRegistration = {
  displayName: 'Content',
  name: 'app-iframe-part',
  type: IframePartComponent
};

export class IframeState {
  src: string;
}
