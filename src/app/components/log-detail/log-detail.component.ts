import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { LogEntry } from 'src/app/models/log-entry.model';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css'],
})
export class LogDetailComponent {
  @Input() entry!: LogEntry;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  onBackdropClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.closed.emit();
  }

  metaItems() {
    const prefixMap: Record<string, string> = {
      U: 'Network / CAN Bus',
      P: 'Powertrain / Engine',
      B: 'Body Systems',
      C: 'Chassis / Brakes',
    };
    const system = prefixMap[this.entry.code[0]] ?? 'Unknown System';
    return [
      {
        label: 'VEHICLE ID',
        value: this.entry.vehicleId,
        cls: 'text-sky-400 font-bold',
      },
      {
        label: 'FAULT CODE',
        value: this.entry.code,
        cls: 'text-[#e8eaf0] font-bold',
      },
      { label: 'SYSTEM', value: system, cls: 'text-amber-400' },
    ];
  }

  severityBarClass(): string {
    return (
      { ERROR: 'bg-red-400', WARN: 'bg-amber-400', INFO: 'bg-sky-400' }[
        this.entry.type
      ] ?? 'bg-gray-400'
    );
  }

  severityIconBoxClass(): string {
    return (
      {
        ERROR: 'border-red-500/35 bg-red-500/10 text-red-400',
        WARN: 'border-amber-500/35 bg-amber-500/10 text-amber-400',
        INFO: 'border-sky-500/35 bg-sky-500/10 text-sky-400',
      }[this.entry.type] ?? 'border-gray-500/35 bg-gray-500/10 text-gray-400'
    );
  }

  severityStripClass(): string {
    return (
      {
        ERROR: 'border-red-500/35 bg-red-500/10',
        WARN: 'border-amber-500/35 bg-amber-500/10',
        INFO: 'border-sky-500/35 bg-sky-500/10',
      }[this.entry.type] ?? 'border-gray-500/35 bg-gray-500/10'
    );
  }

  severityBadgeClass(): string {
    return (
      {
        ERROR: 'border-red-500/35 text-red-400 bg-red-500/10',
        WARN: 'border-amber-500/35 text-amber-400 bg-amber-500/10',
        INFO: 'border-sky-500/35 text-sky-400 bg-sky-500/10',
      }[this.entry.type] ?? 'border-gray-500/35 text-gray-400 bg-gray-500/10'
    );
  }
}
