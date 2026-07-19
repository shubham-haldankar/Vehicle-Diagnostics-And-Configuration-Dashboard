import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() fieldName = '';

  @Output() fieldNameChange = new EventEmitter<string>();

  onFieldNameChange(value: string): void {
    this.fieldName = value;
    this.fieldNameChange.emit(value);
  }
}
