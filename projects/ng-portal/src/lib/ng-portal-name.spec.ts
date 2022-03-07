import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPortalModule } from './ng-portal.module';
import { ngPortalInput, ngPortalOutput } from './ng-portal.decorator';
import { Observable } from 'rxjs';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-input', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentInput {
    @ngPortalInput() public y!: number;
}
// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-output', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentOutput {
    @ngPortalOutput() public y!: Observable<number>;
}
@Component({ template: '<app-input></app-input><app-output></app-output>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentContainer {
    @ViewChild(TestComponentInput, { static: false }) input!: TestComponentInput;
    @ViewChild(TestComponentOutput, { static: false }) output!: TestComponentOutput;
}
describe('NgPortal input / oputput by property name', () => {

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
        const TEST_VALUE = 2;
        fixture.componentInstance.output.y.subscribe(value => {
            expect(value).toBe(TEST_VALUE);
            done();
        });
        fixture.componentInstance.input.y = TEST_VALUE;
    });
});
