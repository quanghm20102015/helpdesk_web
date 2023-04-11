import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOffComponent } from './one-off.component';

describe('OneOffComponent', () => {
  let component: OneOffComponent;
  let fixture: ComponentFixture<OneOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
