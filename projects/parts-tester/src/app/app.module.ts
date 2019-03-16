import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PartsModule, PART_REGISTRATIONS } from 'parts';
import { AppComponent } from './app.component';
import {
  ContentPartComponent,
  ContentPartRegistration
} from './content/content-part.component';
import {
  IframePartComponent,
  IframePartRegistration
} from './iframe/iframe-part.component';

const parts = [ContentPartComponent, IframePartComponent];

@NgModule({
  declarations: [AppComponent, parts],
  entryComponents: parts,
  imports: [BrowserModule, PartsModule],
  providers: [
    {
      provide: PART_REGISTRATIONS,
      useValue: ContentPartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: IframePartRegistration,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
