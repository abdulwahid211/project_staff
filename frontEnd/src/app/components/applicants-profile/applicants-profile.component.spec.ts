import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsProfileComponent } from './applicants-profile.component';

describe('ApplicantsProfileComponent', () => {
  let component: ApplicantsProfileComponent;
  let fixture: ComponentFixture<ApplicantsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
