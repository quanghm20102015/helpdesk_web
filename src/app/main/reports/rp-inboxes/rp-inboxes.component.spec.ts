import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpInboxesComponent } from './rp-inboxes.component';

describe('RpInboxesComponent', () => {
  let component: RpInboxesComponent;
  let fixture: ComponentFixture<RpInboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpInboxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpInboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
