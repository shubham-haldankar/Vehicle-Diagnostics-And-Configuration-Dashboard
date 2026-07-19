import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'outline' | 'filled';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label = 'Button';

  @Input() icon = 'pi-upload';

  @Input() showIcon = true;

  @Input() variant: ButtonVariant = 'outline';

  @Input() buttonType: ButtonType = 'button';

  @Input() disabled = false;

  @Input() fullWidth = false;

  @Input() uppercase = true;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }
    this.clicked.emit(event);
  }
}
