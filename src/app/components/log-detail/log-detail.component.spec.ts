import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDetailComponent } from './log-detail.component';

describe('LogDetailComponent', () => {
  let component: LogDetailComponent;
  let fixture: ComponentFixture<LogDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogDetailComponent]
    });
    fixture = TestBed.createComponent(LogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
