import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LogsSandbox } from './logs.sandbox';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: LogsSandbox,
          useValue: {
            result$: of({
              sortedBy: 'dateTimeCreated',
              sortedOrder: 'desc',
              limit: 10,
              offset: 0,
              logs: [],
              stats: {
                total: 0,
                errors: 0,
                warns: 0,
                infos: 0,
                vehicles: 0,
                codes: 0,
              },
            }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('positive: should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('positive: should compute percentages for non-zero totals', () => {
    const items = component.statItems({
      total: 20,
      errors: 5,
      warns: 4,
      infos: 11,
      vehicles: 7,
      codes: 9,
    });

    expect(items.length).toBe(5);
    expect(items[1].sub).toBe('25%');
    expect(items[2].sub).toBe('20%');
  });

  it('negative: should avoid NaN when total is zero', () => {
    const items = component.statItems({
      total: 0,
      errors: 0,
      warns: 0,
      infos: 0,
      vehicles: 0,
      codes: 0,
    });

    expect(items[1].sub).toBe('0%');
    expect(items[2].sub).toBe('0%');
  });

  it('borderline: should round percentages correctly', () => {
    const items = component.statItems({
      total: 3,
      errors: 1,
      warns: 1,
      infos: 1,
      vehicles: 1,
      codes: 1,
    });

    expect(items[1].sub).toBe('33%');
    expect(items[2].sub).toBe('33%');
  });
});
