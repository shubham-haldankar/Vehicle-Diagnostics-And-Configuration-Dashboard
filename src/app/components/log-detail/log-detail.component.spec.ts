import { LogDetailComponent } from './log-detail.component';
import { LogEntry } from 'src/app/models/log-entry.model';

describe('LogDetailComponent', () => {
  let component: LogDetailComponent;
  const baseEntry: LogEntry = {
    id: '1',
    vehicleId: 'VH-001',
    code: 'U0420',
    dateTimeCreated: '2026-08-05 12:00:00',
    message: 'Network issue',
    type: 'ERROR',
  };

  beforeEach(() => {
    component = new LogDetailComponent();
    component.entry = { ...baseEntry };
  });

  it('positive: should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('positive: should emit close event on escape key handler', () => {
    spyOn(component.closed, 'emit');

    component.onEscape();

    expect(component.closed.emit).toHaveBeenCalledTimes(1);
  });

  it('negative: should return gray fallback classes for unknown type', () => {
    component.entry = { ...baseEntry, type: 'TRACE' };

    expect(component.severityBarClass()).toBe('bg-gray-400');
    expect(component.severityIconBoxClass()).toContain('text-gray-400');
    expect(component.severityStripClass()).toContain('border-gray-500/35');
    expect(component.severityBadgeClass()).toContain('text-gray-400');
  });

  it('borderline: should emit close only for direct backdrop clicks', () => {
    spyOn(component.closed, 'emit');

    const directBackdropClick = {
      target: 'same',
      currentTarget: 'same',
    } as unknown as MouseEvent;
    component.onBackdropClick(directBackdropClick);

    const childClick = {
      target: 'child',
      currentTarget: 'backdrop',
    } as unknown as MouseEvent;
    component.onBackdropClick(childClick);

    expect(component.closed.emit).toHaveBeenCalledTimes(1);
  });

  it('borderline: should toggle body overflow on init and destroy', () => {
    document.body.style.overflow = 'auto';

    component.ngOnInit();
    expect(document.body.style.overflow).toBe('hidden');

    component.ngOnDestroy();
    expect(document.body.style.overflow).toBe('');
  });
});
