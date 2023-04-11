import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpLabelComponent } from './rp-label.component';

describe('RpLabelComponent', () => {
  let component: RpLabelComponent;
  let fixture: ComponentFixture<RpLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
