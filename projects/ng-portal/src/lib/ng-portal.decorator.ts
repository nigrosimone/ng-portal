import { NgPortalService } from './ng-portal.service';

export interface NgPortalDecoratorOptions {
  key: string;
}

export type NgPortalDecorator = (target: Object, propertyKey: string) => void;

/**
 * Instance of NgPortalService
 */
const service = new NgPortalService();

/**
 * Return the proper decorator
 */
const defineDecorator = (hasGetter: boolean, hasSetter: boolean, options?: NgPortalDecoratorOptions): NgPortalDecorator => {
  return (target: Object, propertyKey: string) => { 
    let key: string = propertyKey; 
    if( options && options.key ){
      key = options.key;
    }
    // NB: we need to declare observable out of defineProperty(...) for ensecure same istance of the observable are used 
    // due to works with async pipe into template
    const obs = hasGetter ? service.get(key) : null;
    Object.defineProperty(target, propertyKey, {
      get: (): any => {
        if( !hasGetter ){
          throw Error(`Use "@ngPortalOutput({key: '${key}'})" or "@ngPortal({key: '${key}'})" for retrive the value`);
        }
        return obs;
      },
      set: (value: any): void => {
        if( !hasSetter ){
          throw Error(`Use "@ngPortalInput({key: '${key}'})" or "@ngPortal({key: '${key}'})" for send the value`);  
        }
        service.send(key, value);  
      },
      enumerable: true,
      configurable: true,
    }); 
  }
}

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