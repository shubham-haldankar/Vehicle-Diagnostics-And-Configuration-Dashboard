import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-severity-icon',
  templateUrl: './severity-icon.component.html',
})
export class SeverityIconComponent {
  @Input() type: 'ERROR' | 'WARN' | 'INFO' | string = 'INFO';
  @Input() size: 'sm' | 'xs' = 'sm';

  get sizeClass(): string {
    return this.size === 'xs' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';
  }
}
