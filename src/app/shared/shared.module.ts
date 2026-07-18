import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownInputComponent } from './components/dropdown-input/dropdown-input.component';

@NgModule({
  declarations: [TextInputComponent, DropdownInputComponent],
  imports: [
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    CommonModule,
  ],
  exports: [TextInputComponent, DropdownInputComponent],
})
export class SharedModule {}
