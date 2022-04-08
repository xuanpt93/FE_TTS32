import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobHomepageComponent } from './list-job-homepage.component';

describe('ListJobHomepageComponent', () => {
  let component: ListJobHomepageComponent;
  let fixture: ComponentFixture<ListJobHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJobHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJobHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
