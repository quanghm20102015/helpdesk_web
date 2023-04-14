import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StTeamsComponent } from './st-teams.component';

describe('StTeamsComponent', () => {
  let component: StTeamsComponent;
  let fixture: ComponentFixture<StTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
