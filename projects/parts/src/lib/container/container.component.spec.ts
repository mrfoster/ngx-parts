import { Component, NgModule, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Part } from '../part';
import { PART_REGISTRATIONS } from '../part-registration';
import { Stateful } from '../stateful';
import { ContainerComponent } from './container.component';

@Component({
  selector: 'part-test',
  template: '<h1>Lets party!</h1>'
})
class TestComponent {}

@Component({
  selector: 'part-test-stateful',
  template: '<h1>{{state.title}}</h1>'
})
class TestStatefulComponent implements Stateful<any> {
  state: any;

  setState(value: any) {
    this.state = value;
  }
}
const components = [TestComponent, TestStatefulComponent];

// NgModule required due to https://github.com/angular/angular/issues/10760
@NgModule({
  declarations: [components],
  entryComponents: [components],
  exports: [components],
  providers: [
    {
      provide: PART_REGISTRATIONS,
      useValue: {
        name: 'part-test',
        displayName: 'Test Component',
        type: TestComponent
      },
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: {
        name: 'part-test-stateful',
        displayName: 'Test Stateful Component',
        type: TestStatefulComponent
      },
      multi: true
    }
  ]
})
class TestModule {}

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let container: HTMLElement;

  const createTestPart = (type: string, state: any = null): Part => ({
    id: '',
    group: '',
    index: 0,
    type: type,
    state: state ? JSON.stringify(state) : null
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    container = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle null parts', () => {
    component.parts = null;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toEqual('');
  });

  it('should handle empty parts', () => {
    const parts: Part[] = [];
    component.parts = parts;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toEqual('');
  });

  it('should ignore unknown parts', () => {
    const parts = [createTestPart('lib-test-unknown')];
    component.parts = parts;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toEqual('');
  });

  it('should render test component', () => {
    const parts = [createTestPart('lib-test')];
    component.parts = parts;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toContain('Lets party!');
  });

  it('should set component state', () => {
    const parts = [createTestPart('lib-test-stateful', { title: 'Woohoo!' })];
    component.parts = parts;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toContain('Woohoo!');
  });

  it('should render multiple components', () => {
    const parts = [
      createTestPart('lib-test'),
      createTestPart('lib-test-unknown'),
      createTestPart('lib-test-stateful', { title: 'Woohoo!' })
    ];
    component.parts = parts;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toContain('Lets party!');
    expect(container.textContent).toContain('Woohoo!');
  });

  it('should re-render when parts changed', () => {
    const parts = [createTestPart('lib-test')];
    component.parts = parts;
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toContain('Lets party!');
    component.parts = [];
    component.ngOnChanges({
      parts: new SimpleChange(null, component.parts, true)
    });
    fixture.detectChanges();
    expect(container.textContent).toEqual('');
  });
});
