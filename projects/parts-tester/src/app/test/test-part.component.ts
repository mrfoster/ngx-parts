import { Component, OnInit } from '@angular/core';
import { PartRegistration } from 'projects/parts/src/public_api';
import { TestState } from './test-state';

@Component({
  selector: 'app-test-part',
  templateUrl: './test-part.component.html'
})
export class TestPartComponent implements OnInit {
  state: TestState;
  constructor() {}

  ngOnInit() {}
}

export const TestPartRegistration: PartRegistration = {
  displayName: 'Test',
  name: 'app-test-part',
  type: TestPartComponent
};
