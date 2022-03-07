import { NgPortalService } from './ng-portal.service';

export interface NgPortalDecoratorOptions {
  key: string;
}

// eslint-disable-next-line no-unused-vars
export type NgPortalDecorator = (target: object, propertyKey: string) => void;

/**
 * Instance of NgPortalService
 */
const service = new NgPortalService();

/**
 * Return the proper decorator
 */
export const defineDecorator = (hasGetter: boolean, hasSetter: boolean, options?: NgPortalDecoratorOptions): NgPortalDecorator => {
  return (target: object, propertyKey: string) => {

    let key: string = propertyKey;
    if (options && options.key) {
      key = options.key;
    }
    // NB: we need to declare observable out of defineProperty(...) for ensecure same istance of the observable are used
    // due to works with async pipe into template
    const obs = hasGetter ? service.get(key) : null;

    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const hasPropertySetter = descriptor && descriptor.set ? true : false;
    const hasPropertyGetter = descriptor && descriptor.get ? true : false;

    if (hasPropertySetter || hasPropertyGetter) {
      throw Error(`NgPortal don't support property getter or setter`);
    }

    Object.defineProperty(target, propertyKey, {
      get: (): any => {
        if (!hasGetter) {
          throw Error(`Use "@ngPortalOutput({key: '${key}'})" or "@ngPortal({key: '${key}'})" for retrive the value`);
        }
        return obs;
      },
      set: (value: any) => {
        if (!hasSetter) {
          throw Error(`Use "@ngPortalInput({key: '${key}'})" or "@ngPortal({key: '${key}'})" for send the value`);
        }
        service.send(key, value);
      },
      enumerable: true,
      configurable: true,
    });
  };
};

/**
 * Send value received by ngPortalOutput or ngPortal decorators and/or NgPortalService.
 * Receive value sended by ngPortalInput and/or ngPortal decorators and/or NgPortalService.
 */
export function ngPortal(options?: NgPortalDecoratorOptions): NgPortalDecorator {
  return defineDecorator(true, true, options);
}

/**
 * Send value received by ngPortalOutput or ngPortal decorators and/or NgPortalService.
 */
export function ngPortalInput(options?: NgPortalDecoratorOptions): NgPortalDecorator {
  return defineDecorator(false, true, options);
}

/**
 * Receive value sended by ngPortalInput and/or ngPortal decorators and/or NgPortalService.
 */
export function ngPortalOutput(options?: NgPortalDecoratorOptions): NgPortalDecorator {
  return defineDecorator(true, false, options);
}

