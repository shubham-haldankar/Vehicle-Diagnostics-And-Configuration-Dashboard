import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-severity-icon',
  templateUrl: './severity-icon.component.html',
})
export class SeverityIconComponent {
  @Input() type: 'ERROR' | 'WARN' | 'INFO' | string = 'INFO';
  @Input() size: number = 3;
  @Input() strokeWidth = 2;

  get sizeClass(): string {
    return `w-${this.size} h-${this.size}`;
  }

  get defaultSizeClass(): string {
    return `w-${this.size + 0.5} h-${this.size + 0.5}`;
  }
}
