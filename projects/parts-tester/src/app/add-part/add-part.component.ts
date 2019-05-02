import { Component, Inject, OnInit } from '@angular/core';
import { PartRegistration, PartsService, PART_REGISTRATIONS } from 'parts';

@Component({
  selector: 'app-add-part',
  templateUrl: 'add-part.component.html'
})
export class AddPartComponent implements OnInit {
  constructor(
    @Inject(PART_REGISTRATIONS) public partRegistrations: PartRegistration[],
    private partsService: PartsService
  ) {}

  ngOnInit() {}

  add(part: PartRegistration) {
    this.partsService.add(part.name, 'main');
  }
}
