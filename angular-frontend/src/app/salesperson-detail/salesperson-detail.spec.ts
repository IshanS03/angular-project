import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonDetail } from './salesperson-detail';

describe('SalespersonDetail', () => {
  let component: SalespersonDetail;
  let fixture: ComponentFixture<SalespersonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalespersonDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalespersonDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
