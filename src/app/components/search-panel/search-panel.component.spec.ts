import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LogsSandbox } from 'src/app/logs.sandbox';
import { ButtonIconComponent } from 'src/app/shared/components/button-icon/button-icon.component';

import { SearchPanelComponent } from './search-panel.component';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;
  let logsSandboxMock: {
    loadLogs: jasmine.Spy;
    setSearchDto: jasmine.Spy;
  };

  beforeEach(() => {
    logsSandboxMock = {
      loadLogs: jasmine.createSpy('loadLogs'),
      setSearchDto: jasmine.createSpy('setSearchDto'),
    };

    TestBed.configureTestingModule({
      declarations: [SearchPanelComponent, ButtonIconComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: LogsSandbox, useValue: logsSandboxMock }],
    });

    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate vehicleId when special characters are used', () => {
    component.searchForm.patchValue({ vehicleId: 'VH@123' });

    expect(component.vehicleId?.errors?.['pattern']).toBeTruthy();
  });

  it('should invalidate vehicleId when length is not 4 digits', () => {
    component.searchForm.patchValue({ vehicleId: '123' });

    expect(component.vehicleId?.invalid).toBeTrue();
    expect(component.vehicleId?.errors?.['pattern']).toBeTruthy();
  });

  it('should invalidate errorCode when code format is wrong', () => {
    component.searchForm.patchValue({ errorCode: 'ZZ9999' });

    expect(component.errorCode?.errors?.['pattern']).toBeTruthy();
  });

  it('should invalidate errorCode when comma separated codes are used', () => {
    component.searchForm.patchValue({ errorCode: 'U0420, P0300' });

    expect(component.errorCode?.errors?.['pattern']).toBeTruthy();
  });

  it('should invalidate form when fromDate is after toDate', () => {
    component.searchForm.patchValue({
      fromDate: '2026-08-06',
      toDate: '2026-08-05',
    });

    expect(component.searchForm.errors).toEqual({ invalidDateRange: true });
  });

  it('should allow equal fromDate and toDate', () => {
    component.searchForm.patchValue({
      fromDate: '2026-08-05',
      toDate: '2026-08-05',
    });

    expect(component.searchForm.errors).toBeNull();
  });

  it('should not dispatch search when form is invalid', () => {
    component.searchForm.patchValue({
      vehicleId: '12',
      fromDate: '2026-08-06',
      toDate: '2026-08-05',
    });

    component.onSearch();

    expect(logsSandboxMock.loadLogs).not.toHaveBeenCalled();
    expect(logsSandboxMock.setSearchDto).not.toHaveBeenCalled();
  });

  it('should dispatch search when form is valid', () => {
    component.searchForm.patchValue({
      vehicleId: '1018',
      errorCode: 'U0420',
      fromDate: '2026-08-05',
      toDate: '2026-08-05',
    });

    component.onSearch();

    expect(logsSandboxMock.loadLogs).toHaveBeenCalled();
    expect(logsSandboxMock.setSearchDto).toHaveBeenCalled();
  });
});
