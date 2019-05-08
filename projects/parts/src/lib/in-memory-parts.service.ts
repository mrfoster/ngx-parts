import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { v4 } from 'uuid';
import { Part } from './part';
import { PartsService } from './parts.service';

enum ChangeType {
  Unchanged,
  Added,
  Updated,
  Deleted
}

interface ChangeState<T> {
  value: T;
  changeType: ChangeType;
  originalValue?: T | undefined;
}

type PartChangeState = ChangeState<Part>;

@Injectable()
export class InMemoryPartsService implements PartsService {
  private cacheKey = 'ngx-parts';
  private _parts = new Map<string, PartChangeState>([]);
  private _partsChanged = new BehaviorSubject([]);
  readonly partsChanged = this._partsChanged.asObservable();

  add(part: Part): Observable<Part>;
  add(type: string, group: string): Observable<Part>;
  add<T>(type: string, group: string, state: T): Observable<Part>;
  add(partOrType: Part | string, group?: any, state?: any) {
    const part: Part =
      typeof partOrType === 'string'
        ? {
            id: v4(),
            group: group,
            type: partOrType as string,
            state: state ? JSON.stringify(state) : null,
            index: 0 // TODO: get index
          }
        : partOrType;

    this.applyChanges([
      {
        changeType: ChangeType.Added,
        value: part
      }
    ]);

    return of(part);
  }

  update<T>(id: string, state: T): Observable<Part[]>;
  update(parts: Part[]): Observable<Part[]>;
  update<T>(partsOrId: Part[] | string, state?: T) {
    const parts: Part[] =
      typeof partsOrId === 'string'
        ? [
            {
              ...this._parts.get(partsOrId).value,
              state: state ? JSON.stringify(state) : undefined
            }
          ]
        : partsOrId;

    this.applyChanges(
      parts
        .map(part => ({ part: part, change: this._parts.get(part.id) }))
        .map(x => ({
          changeType:
            x.change.changeType === ChangeType.Unchanged
              ? ChangeType.Updated
              : x.change.changeType,
          value: x.part,
          originalValue: x.change.originalValue
        }))
    );
    return of(parts);
  }

  delete(id: string): Observable<string> {
    const change = this._parts.get(id);

    if (change.changeType === ChangeType.Added) {
      this._parts.delete(id);
      this.applyChanges([]);
    } else {
      this.applyChanges([
        {
          changeType: ChangeType.Deleted,
          value: change.originalValue,
          originalValue: change.originalValue
        }
      ]);
    }

    return of(id);
  }

  undo() {
    const changeSet = [...this._parts.values()]
      .filter(change => change.changeType !== ChangeType.Added)
      .map(change => ({
        changeType: ChangeType.Unchanged,
        value: change.originalValue,
        originalValue: change.originalValue
      }));

    this.applyChanges(changeSet);
  }

  save(): Observable<number> {
    const trackedValues = [...this._parts.values()];
    const trackedIds = new Set(trackedValues.map(change => change.value.id));

    const changeSet = trackedValues
      .filter(change => change.changeType !== ChangeType.Deleted)
      .map(change => ({
        changeType: ChangeType.Unchanged,
        value: change.value,
        originalValue: change.value
      }));

    this.applyChanges(changeSet);

    const json = localStorage.getItem(this.cacheKey);
    const all = !json ? [] : (JSON.parse(json) as Part[]);

    localStorage.setItem(
      this.cacheKey,
      JSON.stringify([
        ...all.filter(part => !trackedIds.has(part.id)),
        ...changeSet.map(change => change.value)
      ])
    );

    return of(changeSet.length);
  }

  load(groups: string[]): Observable<Part[]> {
    const json = localStorage.getItem(this.cacheKey);
    if (!json) {
      return of([]);
    }
    const all = JSON.parse(json) as Part[];
    const tracked = all.filter(part => groups.includes(part.group));

    this.trackAddMany(tracked);

    return of(
      [...this._parts.values()]
        .map(x => x.value)
        .filter(x => groups.includes(x.group))
    );
  }

  private trackAddMany(entities: Part[]) {
    const changes = entities.filter(x => !this._parts.has(x.id));

    const changeSet = changes.map(part => ({
      originalValue: part,
      value: part,
      changeType: ChangeType.Unchanged
    }));

    this.applyChanges(changeSet);
  }

  private applyChanges(changeSet: PartChangeState[]) {
    changeSet.forEach(change => this._parts.set(change.value.id, change));
    this._partsChanged.next(
      [...this._parts.values()]
        .filter(change => change.changeType !== ChangeType.Deleted)
        .map(change => change.value)
    );
  }
}
