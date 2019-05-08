import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Part } from './part';
import { ChangeType, PartsDataService } from './parts-data.service';

@Injectable()
export class LocalPartsDataService implements PartsDataService {
  private cacheKey = 'ngx-parts';
  save(
    changeSet: Map<string, { value: Part; changeType: ChangeType }>
  ): Observable<Part[]> {
    const changeValues = [...changeSet.values()];
    const addedOrUpdated = changeValues
      .filter(
        x =>
          x.changeType === ChangeType.Added ||
          x.changeType === ChangeType.Updated
      )
      .map(x => x.value);

    const deleted = changeValues
      .filter(x => x.changeType === ChangeType.Deleted)
      .map(x => x.value);

    const json = localStorage.getItem(this.cacheKey);
    const all = !json ? [] : (JSON.parse(json) as Part[]);
    const map = new Map(all.map(part => [part.id, part] as [string, Part]));

    addedOrUpdated.forEach(part => map.set(part.id, part));
    deleted.forEach(part => map.delete(part.id));

    localStorage.setItem(this.cacheKey, JSON.stringify([...map.values()]));

    return of([...addedOrUpdated, ...deleted]);
  }

  load(groups: string[]): Observable<Part[]> {
    const json = localStorage.getItem(this.cacheKey);
    if (!json) {
      return of([]);
    }
    const all = JSON.parse(json) as Part[];
    const parts = all.filter(part => groups.includes(part.group));
    return of(parts);
  }
}
