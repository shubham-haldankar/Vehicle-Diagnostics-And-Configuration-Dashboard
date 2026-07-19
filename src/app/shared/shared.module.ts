import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownInputComponent } from './components/dropdown-input/dropdown-input.component';
import { CalendarModule } from 'primeng/calendar';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { ButtonComponent } from './components/button/button.component';
import { SearchActionsComponent } from './components/search-actions/search-actions.component';

@NgModule({
  declarations: [
    TextInputComponent,
    DropdownInputComponent,
    DateRangePickerComponent,
    ButtonComponent,
    SearchActionsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    TextInputComponent,
    DropdownInputComponent,
    DateRangePickerComponent,
    ButtonComponent,
    SearchActionsComponent,
  ],
})
export class SharedModule {}
