import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app-store';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { AgvModule }from './components/agv/agv.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
  ],
  imports: [
    FormsModule,
    StoreModule.provideStore(appReducer),
    RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ]),
    BrowserModule,
    HttpModule,
    AgvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
