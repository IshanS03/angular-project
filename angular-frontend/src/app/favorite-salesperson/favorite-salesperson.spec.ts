import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSalesperson } from './favorite-salesperson';

describe('FavoriteSalesperson', () => {
  let component: FavoriteSalesperson;
  let fixture: ComponentFixture<FavoriteSalesperson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteSalesperson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteSalesperson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
