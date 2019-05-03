import { Component, Inject, Input } from '@angular/core';
import { PartRegistration, PartsService, PART_REGISTRATIONS } from 'parts';

@Component({
  selector: 'app-add-part',
  templateUrl: 'add-part.component.html'
})
export class AddPartComponent {
  @Input() group: string;
  constructor(
    @Inject(PART_REGISTRATIONS) public partRegistrations: PartRegistration[],
    private partsService: PartsService
  ) {}

  add(part: PartRegistration) {
    this.partsService.add(part.name, this.group);
  }
}
