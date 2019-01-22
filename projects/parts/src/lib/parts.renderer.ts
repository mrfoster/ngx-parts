import {
  Injectable,
  Inject,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentFactory
} from '@angular/core';
import { PartRegistration, PART_REGISTRATIONS } from './part-registration';
import { Part } from './part';

@Injectable({
  providedIn: 'root'
})
export class PartsRenderer {
  private partsFactory: { [id: string]: ComponentFactory<any> };
  constructor(
    @Inject(PART_REGISTRATIONS) partRegistrations: PartRegistration[],
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.partsFactory = partRegistrations.reduce((f, p) => {
      f[p.name] = componentFactoryResolver.resolveComponentFactory(p.type);
      return f;
    }, {});
  }

  public render(parent: ViewContainerRef, parts: Part[]) {
    // TODO: Detect changes and only render what is necessary?
    parent.clear();
    parts
      .map(p => ({
        factory: this.partsFactory[p.type],
        part: p
      }))
      .filter(p => p.factory)
      .forEach(p => {
        const component = parent.createComponent(p.factory);
        if ('setState' in component.instance) {
          component.instance.setState(JSON.parse(p.part.state));
        }
      });
  }
}
