import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomationComponent } from './atomation.component';

describe('AtomationComponent', () => {
  let component: AtomationComponent;
  let fixture: ComponentFixture<AtomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
