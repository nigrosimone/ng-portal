import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPortalModule } from './ng-portal.module';
import { ngPortalInput, ngPortalOutput } from './ng-portal.decorator';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-input', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentInput {
    @ngPortalInput() public y: any;
}
// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'app-output', template: '<div>{{ test }}</div>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentOutput {
    @ngPortalOutput() public y: any;
}
@Component({ template: '<app-input></app-input><app-output></app-output>' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentContainer {
    @ViewChild(TestComponentInput, { static: false }) input!: TestComponentInput;
    @ViewChild(TestComponentOutput, { static: false }) output!: TestComponentOutput;
}
describe('NgPortal error', () => {

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

    it('test property change', () => {
        fixture.detectChanges();
        expect(function () { fixture.componentInstance.input.y.subscribe(); }).toThrow(new Error(`Use "@ngPortalOutput({key: 'y'})" or "@ngPortal({key: 'y'})" for retrive the value`));
        expect(function () { fixture.componentInstance.output.y = 1; }).toThrow(new Error(`Use "@ngPortalInput({key: 'y'})" or "@ngPortal({key: 'y'})" for send the value`));
    });
});
