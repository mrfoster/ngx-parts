import { Component, ViewEncapsulation } from '@angular/core';
import { PartRegistration } from 'parts';

@Component({
  selector: 'app-layout-container-part',
  templateUrl: 'layout-container-part.component.html',
  styleUrls: ['./layout-container-part.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LayoutContainerPartComponent {
  constructor() {}
}

export const LayoutContainerPartRegistration: PartRegistration = {
  displayName: 'Layout Container',
  name: 'app-layout-container-part',
  type: LayoutContainerPartComponent
};
