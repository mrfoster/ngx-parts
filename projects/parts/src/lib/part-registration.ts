import { Type, InjectionToken } from '@angular/core';
export const PART_REGISTRATIONS = new InjectionToken<PartRegistration[]>(
  'part.registrations'
);
export interface PartRegistration {
  name: string;
  displayName: string;
  type: Type<any>;
}
