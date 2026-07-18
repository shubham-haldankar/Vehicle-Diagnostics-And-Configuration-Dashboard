import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface DropdownOption {
  label: string;
  value: any;
}
@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.css'],
})
export class DropdownInputComponent {
  @Input() label = 'Dropdown';

  @Input() placeholder = 'Select';

  @Input() options: DropdownOption[] = [];

  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event: any) {
    this.value = event.value;
    this.valueChange.emit(event.value);
  }
}
