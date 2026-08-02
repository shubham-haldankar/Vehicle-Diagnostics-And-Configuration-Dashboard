import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { LogsEffects } from './store/logs.effects';
import { logsReducer } from './store/logs.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { LogoComponent } from './components/logo/logo.component';
import { LogDetailComponent } from './components/log-detail/log-detail.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchPanelComponent,
    SearchResultsComponent,
    LogoComponent,
    LogDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ results: logsReducer }),
    EffectsModule.forRoot([LogsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: false }),
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
