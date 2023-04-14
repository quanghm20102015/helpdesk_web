import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpTeamsComponent } from './rp-teams.component';

describe('RpTeamsComponent', () => {
  let component: RpTeamsComponent;
  let fixture: ComponentFixture<RpTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
