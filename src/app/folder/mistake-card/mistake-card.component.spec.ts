import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MistakeCardComponent } from './mistake-card.component';

describe('MistakeCardComponent', () => {
  // Import necessary dependencies and modules here


  let component: MistakeCardComponent;

  beforeEach(() => {
    component = new MistakeCardComponent();
  });

  it('should increment category1Count until it reaches category1Mistakes', () => {
    spyOn(window, 'setInterval').and.callThrough();

    component.startGraph();
    expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 50);

    // Simulate multiple iterations of the interval over time
    setInterval(() => {
      if (component.category1Count < component.category1Mistakes) {
        component.animateCategory1();
      }
    }, 50);

    expect(component.category1Count).toBe(component.category1Mistakes);
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should increment category2Count until it reaches category2Mistakes', () => {
    spyOn(window, 'setInterval').and.callThrough();

    component.animateCategory1();
    expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 50);

    // Simulate multiple iterations of the interval over time
    setInterval(() => {
      if (component.category2Count < component.category2Mistakes) {
        component.animateCategory2();
      }
    }, 50);

    expect(component.category2Count).toBe(component.category2Mistakes);
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should add class "grow" to graph element when triggerGrowth() is called', () => {
    const mockGraphElement = document.createElement('div');
    mockGraphElement.classList.add('graph');

    spyOn(document, 'querySelector').and.returnValue(mockGraphElement);

    component.triggerGrowth();
    expect(document.querySelector).toHaveBeenCalledWith('.graph');
    expect(mockGraphElement.classList.contains('grow')).toBeTrue();
  });

});
