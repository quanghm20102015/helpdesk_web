import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsatComponent } from './csat.component';

describe('CsatComponent', () => {
  let component: CsatComponent;
  let fixture: ComponentFixture<CsatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
