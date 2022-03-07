import { defineDecorator } from "../public-api";

describe('NgPortal defineDecorator', () => {
    it('test property change', () => {
        const decorator = defineDecorator(true, true);

        expect(function () { 
            
            decorator({
                get foo() {
                    return null;
                },
                set foo(val: any) {
    
                }
            }, 'foo')


         }).toThrow(new Error(`NgPortal don't support property getter or setter`));

    });
});