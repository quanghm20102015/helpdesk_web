import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StInboxesComponent } from './st-inboxes.component';

describe('StInboxesComponent', () => {
  let component: StInboxesComponent;
  let fixture: ComponentFixture<StInboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StInboxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StInboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
