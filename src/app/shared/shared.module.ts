import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [TextInputComponent],
  imports: [
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  exports: [TextInputComponent],
})
export class SharedModule {}
