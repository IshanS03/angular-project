import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salesperson } from './salesperson';

describe('Salesperson', () => {
  let component: Salesperson;
  let fixture: ComponentFixture<Salesperson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salesperson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salesperson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
