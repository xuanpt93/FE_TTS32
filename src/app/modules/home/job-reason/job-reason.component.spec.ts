import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReasonComponent } from './job-reason.component';

describe('JobReasonComponent', () => {
  let component: JobReasonComponent;
  let fixture: ComponentFixture<JobReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
