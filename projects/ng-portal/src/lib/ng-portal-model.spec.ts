/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPortalModule } from './ng-portal.module';
import { ngPortal, ngPortalInput, ngPortalOutput } from './ng-portal.decorator';
import { Observable } from 'rxjs';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-model', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentModel {
    @ngPortal() public model: any;
    @ngPortalInput({ key: 'foo' }) public a!: number;
    @ngPortalOutput({ key: 'foo' }) public b!: Observable<number>;
}
@Component({ template: '<app-model #one></app-model><app-model #two></app-model>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentContainer {
    @ViewChild('one', { static: false }) input!: TestComponentModel;
    @ViewChild('two', { static: false }) output!: TestComponentModel;
}
describe('NgPortal model', () => {

    let fixture: ComponentFixture<TestComponentContainer>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponentContainer, TestComponentModel],
            imports: [NgPortalModule]
        });
        fixture = TestBed.createComponent(TestComponentContainer);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test property change', (done: any) => {
        fixture.detectChanges();
        const TEST_VALUE = 3;
        const sub = fixture.componentInstance.output.model.subscribe((value: any) => {
            expect(value).toBe(TEST_VALUE);
            sub.unsubscribe();
            done();
        });
        fixture.componentInstance.input.model = TEST_VALUE;
        fixture.detectChanges();
    });

    it('test property change a b', (done: any) => {
        fixture.detectChanges();
        const TEST_VALUE = 3;
        const sub = fixture.componentInstance.output.b.subscribe(value => {
            expect(value).toBe(TEST_VALUE);
            sub.unsubscribe();
            done();
        });
        fixture.componentInstance.input.a = TEST_VALUE;
        fixture.detectChanges();
    });
});
