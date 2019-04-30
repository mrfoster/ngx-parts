import {
  ComponentFactory,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  ViewContainerRef
} from '@angular/core';
import { Part } from './part';
import { PartRegistration, PART_REGISTRATIONS } from './part-registration';

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

  public renderParts(host: ViewContainerRef, parts: Part[]) {
    // TODO: Detect changes and only render what is necessary?
    host.clear();
    parts
      .map(p => ({
        factory: this.partsFactory[p.type],
        part: p
      }))
      .filter(p => p.factory)
      .forEach(p => {
        const component = host.createComponent(p.factory);
        if ('setState' in component.instance) {
          component.instance.setState(JSON.parse(p.part.state));
        }
      });
  }

  public renderPart(host: ViewContainerRef, part: Part) {
    const factory = this.partsFactory[part.type];
    if (!factory) {
      return;
    }

    const component = host.createComponent(factory);

    // this.renderer2.addClass(compRef.location.elementRef, 'dynamicClass')
    if ('setState' in component.instance) {
      component.instance.setState(JSON.parse(part.state));
    }
  }
}
