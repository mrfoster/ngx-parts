import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Part } from './part';
import { PartRegistration, PART_REGISTRATIONS } from './part-registration';

@Injectable({
  providedIn: 'root',
})
export class PartsFactory {
  private partsFactory: { [type: string]: ComponentFactory<any> };

  constructor(
    @Inject(PART_REGISTRATIONS) partRegistrations: PartRegistration[],
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.partsFactory = partRegistrations.reduce((f, p) => {
      f[p.name] = componentFactoryResolver.resolveComponentFactory(p.type);
      return f;
    }, {});
  }

  public createComponent(
    host: ViewContainerRef,
    part: Part
  ): ComponentRef<any> {
    const factory = this.partsFactory[part.type];
    if (!factory) {
      return;
    }

    const component = host.createComponent(factory);
    component.instance.id = part.id;

    if ('setState' in component.instance) {
      component.instance.setState(JSON.parse(part.state));
    }

    return component;
  }
}
