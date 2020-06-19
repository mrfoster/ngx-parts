import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from './part';
export const PARTS_DATA_SERVICE = new InjectionToken<PartsDataService>(
  'parts-data.service'
);

export enum ChangeType {
  Unchanged,
  Added,
  Updated,
  Deleted,
}

export interface PartsDataService {
  save(
    changeSet: Map<string, { value: Part; changeType: ChangeType }>
  ): Observable<Part[]>;
  load(groups: string[]): Observable<Part[]>;
}
