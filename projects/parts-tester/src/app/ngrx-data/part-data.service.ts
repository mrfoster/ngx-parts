// import { EntityCollectionDataService, QueryParams, Update } from 'ngrx-data';
// import { Part } from 'parts';
// import { Observable } from 'rxjs';

// export class PartDataService implements EntityCollectionDataService<Part> {
//   add(entity: Part): Observable<Part> {
//     throw new Error('Method not implemented.');
//   }
//   delete(id: string | number): Observable<string | number> {
//     throw new Error('Method not implemented.');
//   }
//   getAll(): Observable<Part[]> {
//     throw new Error('Method not implemented.');
//   }
//   getById(id: any): Observable<Part> {
//     throw new Error('Method not implemented.');
//   }
//   getWithQuery(params: string | QueryParams): Observable<Part[]> {
//     throw new Error('Method not implemented.');
//   }
//   update(update: Update<Part>): Observable<Part> {
//     throw new Error('Method not implemented.');
//   }
//   upsert(entity: Part): Observable<Part> {
//     throw new Error('Method not implemented.');
//   }
//   name: string;

//   updateMany() {
//     // Build the "change set" of all changes to process at one time.
//     // An array of changeSetItems, each a specific kind of change to entities of an entity type.
//     // Here an array with just one item: a delete for all entities of type Villain.
//     const deleteAllChangeSet$ = (this.keys$ as Observable<number[]>).pipe(
//       map(keys => {
//         const changeSet: ChangeSet = {
//           changes: [cif.delete('Villain', keys)],
//           tag: 'DELETE ALL VILLAINS' // optional descriptive tag
//         };
//         return changeSet;
//       })
//     );

//     combineLatest(deleteAllChangeSet$, this.appSelectors.dataSource$)
//       .pipe(
//         first(),
//         map(x => x)
//       )
//       .subscribe(([changeSet, source]) => {
//         if (source === 'local') {
//           // only works with in-mem db for this demo
//           this.entityCacheDispatcher.saveEntities(
//             changeSet,
//             'api/save/delete-villains', // whatever your server expects
//             { isOptimistic: true }
//           );
//         }
//       });
//   }
// }
