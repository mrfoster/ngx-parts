import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';
import { Part } from './part';
import {
  ChangeType,
  PartsDataService,
  PARTS_DATA_SERVICE
} from './parts-data.service';
import { PartsService } from './parts.service';

interface ChangeState<T> {
  value: T;
  changeType: ChangeType;
  originalValue?: T | undefined;
}

type PartChangeState = ChangeState<Part>;

@Injectable()
export class DefaultPartsService implements PartsService {
  constructor(
    @Inject(PARTS_DATA_SERVICE) private partsDataService: PartsDataService
  ) {}

  private _parts = new Map<string, PartChangeState>([]);
  private _partsChanged = new BehaviorSubject([]);
  readonly partsChanged = this._partsChanged.asObservable();

  add(part: Part): Observable<Part>;
  add(parts: Part[]): Observable<Part[]>;
  add(type: string, group: string): Observable<Part>;
  add<T>(type: string, group: string, state: T): Observable<Part>;
  add(partOrType: Part[] | Part | string, group?: any, state?: any) {
    const isMany = partOrType instanceof Array;

    const parts: Part[] =
      typeof partOrType === 'string'
        ? [
            {
              id: v4(),
              group: group,
              type: partOrType as string,
              state: state ? JSON.stringify(state) : null,
              index: 0 // TODO: get index
            }
          ]
        : partOrType instanceof Array
        ? partOrType
        : [partOrType];

    this.applyChanges([
      ...this._parts.values(),
      ...parts.map(part => ({
        changeType: ChangeType.Added,
        value: part
      }))
    ]);

    return of(isMany ? parts : parts[0]);
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

    const ids = new Set(parts.map(x => x.id));

    this.applyChanges([
      ...[...this._parts.values()].filter(x => !ids.has(x.value.id)),
      ...parts
        .map(part => ({ part: part, change: this._parts.get(part.id) }))
        .map(x => ({
          changeType:
            x.change.changeType === ChangeType.Unchanged
              ? ChangeType.Updated
              : x.change.changeType,
          value: x.part,
          originalValue: x.change.originalValue
        }))
    ]);

    return of(parts);
  }

  delete(id: string): Observable<string> {
    const change = this._parts.get(id);
    const changes = [...this._parts.values()].filter(x => x.value.id !== id);

    if (change.changeType === ChangeType.Added) {
      this.applyChanges(changes);
    } else {
      this.applyChanges([
        ...changes,
        {
          changeType: ChangeType.Deleted,
          value: { ...change.originalValue },
          originalValue: change.originalValue
        }
      ]);
    }

    return of(id);
  }

  undo() {
    this.applyChanges(
      [...this._parts.values()]
        .filter(change => change.changeType !== ChangeType.Added)
        .map(change => ({
          changeType: ChangeType.Unchanged,
          value: { ...change.originalValue },
          originalValue: change.originalValue
        }))
    );
  }

  save(): Observable<number> {
    const trackedValues = [...this._parts.values()];

    return this.partsDataService
      .save(
        new Map(
          trackedValues.map(
            x =>
              [x.value.id, { value: x.value, changeType: x.changeType }] as [
                string,
                { value: Part; changeType: ChangeType }
              ]
          )
        )
      )
      .pipe(
        map(parts => {
          this.applyChanges(
            trackedValues
              .filter(change => change.changeType !== ChangeType.Deleted)
              .map(change => ({
                changeType: ChangeType.Unchanged,
                value: change.value,
                originalValue: { ...change.value }
              }))
          );

          return parts.length;
        })
      );
  }

  load(groups: string[]): Observable<Part[]> {
    return this.partsDataService.load(groups).pipe(
      map(parts => {
        this.applyChanges([
          ...[...this._parts.values()].filter(
            x =>
              !(
                groups.includes(x.value.group) &&
                x.changeType === ChangeType.Unchanged
              )
          ),
          ...parts
            .filter(x => {
              const change = this._parts.get(x.id);
              return !change || change.changeType === ChangeType.Unchanged;
            })
            .map(part => ({
              originalValue: part,
              value: { ...part },
              changeType: ChangeType.Unchanged
            }))
        ]);

        return [...this._parts.values()]
          .map(x => x.value)
          .filter(x => groups.includes(x.group));
      })
    );
  }

  private applyChanges(changeSet: PartChangeState[]) {
    this._parts = new Map(
      changeSet.map(x => [x.value.id, x] as [string, ChangeState<Part>])
    );
    this._partsChanged.next(
      [...this._parts.values()]
        .filter(change => change.changeType !== ChangeType.Deleted)
        .map(change => change.value)
    );
  }
}
