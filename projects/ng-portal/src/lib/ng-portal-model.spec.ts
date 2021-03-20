import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPortalModule } from './ng-portal.module';
import { ngPortal } from './ng-portal.decorator';

@Component({selector: 'app-model', template: '<div>{{ test }}</div>'})
class TestComponentModel {
    @ngPortal() public model: any;
}
@Component({template: '<app-model #one></app-model><app-model #two></app-model>'})
class TestComponentContainer {
    @ViewChild('one', {static: false}) input: TestComponentModel;
    @ViewChild('two', {static: false}) output: TestComponentModel;
}
describe('NgPortal model', () => {

    let fixture: ComponentFixture<TestComponentContainer>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [ TestComponentContainer, TestComponentModel ],
          imports: [NgPortalModule]
        });
        fixture = TestBed.createComponent(TestComponentContainer);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test property change', (done: DoneFn) => {
        fixture.detectChanges();
        const TEST_VALUE = 3;
        fixture.componentInstance.output.model.subscribe(value => {
            expect(value).toBe(TEST_VALUE);
            done();
        });
        fixture.componentInstance.input.model = TEST_VALUE;
    });
});