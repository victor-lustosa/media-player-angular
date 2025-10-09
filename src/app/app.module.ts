import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { SimpleAudioPlayerComponent } from './simple-audio-player/simple-audio-player.component';
import { FormatTimePipe } from './simple-audio-player/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormatTimePipe,
    SimpleAudioPlayerComponent
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
