import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnattendedComponent } from './unattended.component';

describe('UnattendedComponent', () => {
  let component: UnattendedComponent;
  let fixture: ComponentFixture<UnattendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnattendedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnattendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
