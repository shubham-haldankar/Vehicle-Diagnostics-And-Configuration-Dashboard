import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { LogsEffects } from './store/effects';
import { logsReducer } from './store/reducer';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, SearchResultsComponent, SearchPanelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('logs', logsReducer),
    EffectsModule.forRoot([LogsEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
