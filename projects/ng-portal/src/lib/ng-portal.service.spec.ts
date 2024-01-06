/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { NgPortalModule } from './ng-portal.module';
import { NgPortalService } from './ng-portal.service';


describe('NgPortal NgPortalService', () => {

    let service: NgPortalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgPortalModule]
        });
        service = TestBed.inject(NgPortalService);
    });

    it('unique instance', () => {
        const service1 = new NgPortalService();
        const service2 = new NgPortalService();
        expect(service === service2).toBe(true);
        expect(service1 === service2).toBe(true);
    });

    it('send / get', (done: any) => {
        const sub = service.get('test').subscribe(value => {
            expect(value).toBe('testValue');
            sub.unsubscribe();
            done();
        });
        service.send('test', 'testValue');
    });
});
