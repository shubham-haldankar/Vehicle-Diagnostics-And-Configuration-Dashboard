import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeverityIconComponent } from './components/severity-icon/severity-icon.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';

@NgModule({
  declarations: [SeverityIconComponent, ButtonIconComponent],
  imports: [CommonModule],
  exports: [SeverityIconComponent, ButtonIconComponent],
})
export class SharedModule {}
