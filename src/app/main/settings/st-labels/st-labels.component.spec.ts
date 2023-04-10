import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StLabelsComponent } from './st-labels.component';

describe('StLabelsComponent', () => {
  let component: StLabelsComponent;
  let fixture: ComponentFixture<StLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
