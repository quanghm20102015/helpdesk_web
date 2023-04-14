import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtLabelsComponent } from './ct-labels.component';

describe('CtLabelsComponent', () => {
  let component: CtLabelsComponent;
  let fixture: ComponentFixture<CtLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
