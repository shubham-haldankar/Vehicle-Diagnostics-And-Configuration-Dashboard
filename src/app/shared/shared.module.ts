import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeverityIconComponent } from './components/severity-icon/severity-icon.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [SeverityIconComponent, LogoComponent],
  imports: [CommonModule],
  exports: [SeverityIconComponent, LogoComponent],
})
export class SharedModule {}
