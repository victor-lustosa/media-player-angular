import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { FormatTimePipe } from './media-player/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormatTimePipe,
    MediaPlayerComponent
  ],
  imports: [
    BrowserModule,
    CardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
