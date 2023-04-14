import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInboxComponent } from './new-inbox.component';

describe('NewInboxComponent', () => {
  let component: NewInboxComponent;
  let fixture: ComponentFixture<NewInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
