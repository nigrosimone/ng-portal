/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineDecorator } from "../public-api";

describe('NgPortal defineDecorator', () => {
    it('getter or setter error', () => {
        expect(function () { 

            const decorator = defineDecorator(true, true);
            
            decorator({
                get foo() {
                    return null;
                },
                set foo(val: any) {
                    // ...
                }
            }, 'foo')


         }).toThrow(new Error(`NgPortal don't support property with getter or setter`));
    });
});