import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeverityIconComponent } from './severity-icon.component';

describe('SeverityIconComponent', () => {
  let fixture: ComponentFixture<SeverityIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeverityIconComponent],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SeverityIconComponent);
  });

  it('renders an error icon when the type is ERROR', () => {
    fixture.componentInstance.type = 'ERROR';
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('renders a warning icon when the type is WARN', () => {
    fixture.componentInstance.type = 'WARN';
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});
