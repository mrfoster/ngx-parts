import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservableContainerComponent } from './observable-container.component';

describe('EditableContainerComponent', () => {
  let component: ObservableContainerComponent;
  let fixture: ComponentFixture<ObservableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObservableContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
