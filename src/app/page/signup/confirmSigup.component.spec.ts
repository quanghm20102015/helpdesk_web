import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSigupComponent } from './confirmSigup.component';

describe('SignupComponent', () => {
  let component: ConfirmSigupComponent;
  let fixture: ComponentFixture<ConfirmSigupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSigupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSigupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
