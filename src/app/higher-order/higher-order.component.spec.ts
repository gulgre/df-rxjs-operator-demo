import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderComponent } from './higher-order.component';

describe('HigherOrderComponent', () => {
  let component: HigherOrderComponent;
  let fixture: ComponentFixture<HigherOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HigherOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
