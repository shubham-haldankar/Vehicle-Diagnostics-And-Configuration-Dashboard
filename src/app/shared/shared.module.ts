import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeverityIconComponent } from './components/severity-icon/severity-icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';

@NgModule({
  declarations: [SeverityIconComponent, LogoComponent, ButtonIconComponent],
  imports: [CommonModule],
  exports: [SeverityIconComponent, LogoComponent, ButtonIconComponent],
})
export class SharedModule {}
