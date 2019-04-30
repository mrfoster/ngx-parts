import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartsModule, PARTS_SERVICE, PART_REGISTRATIONS } from 'parts';
import { AppComponent } from './app.component';
import {
  ContentPartComponent,
  ContentPartRegistration
} from './content/content-part.component';
import {
  IframePartComponent,
  IframePartRegistration
} from './iframe/iframe-part.component';
import { TestPartsService } from './test-parts.service';
import { TestPartComponent } from './test/test-part.component';
import {
  TimerPartComponent,
  TimerPartRegistration
} from './timer/timer-part.component';

const parts = [ContentPartComponent, IframePartComponent, TimerPartComponent];

@NgModule({
  declarations: [AppComponent, parts, TestPartComponent],
  entryComponents: parts,
  imports: [BrowserModule, BrowserAnimationsModule, PartsModule],
  providers: [
    {
      provide: PARTS_SERVICE,
      useClass: TestPartsService
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: ContentPartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: IframePartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: TimerPartRegistration,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
