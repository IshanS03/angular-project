import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salespeople } from './salespeople';

describe('Salespeople', () => {
  let component: Salespeople;
  let fixture: ComponentFixture<Salespeople>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salespeople]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salespeople);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
