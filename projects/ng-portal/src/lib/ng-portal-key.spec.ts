/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPortalModule } from './ng-portal.module';
import { ngPortalInput, ngPortalOutput } from './ng-portal.decorator';
import { Observable } from 'rxjs';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-input', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentInput {
    @ngPortalInput({ key: 'foo' }) public y!: number;
    foo: number = 5;
}
// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-output', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentOutput {
    @ngPortalOutput({ key: 'foo' }) public y!: Observable<number>;
    foo: number = 6;
}
@Component({ template: '<app-input></app-input><app-output></app-output>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentContainer {
    @ViewChild(TestComponentInput, { static: false }) input!: TestComponentInput;
    @ViewChild(TestComponentOutput, { static: false }) output!: TestComponentOutput
}
describe('NgPortal input / oputput by key', () => {

    let fixture: ComponentFixture<TestComponentContainer>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponentContainer, TestComponentInput, TestComponentOutput],
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
        const sub = fixture.componentInstance.output.y.subscribe(value => {
            expect(value).toBe(TEST_VALUE);
            expect(fixture.componentInstance.input.foo).toBe(5);
            expect(fixture.componentInstance.output.foo).toBe(6);
            sub.unsubscribe();
            done();
        });
        fixture.componentInstance.input.y = TEST_VALUE;
        fixture.detectChanges();
    });
});
