import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeverityIconComponent } from './components/severity-icon/severity-icon.component';

@NgModule({
  declarations: [SeverityIconComponent],
  imports: [CommonModule],
  exports: [SeverityIconComponent],
})
export class SharedModule {}
