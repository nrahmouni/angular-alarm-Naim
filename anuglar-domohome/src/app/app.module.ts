import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlarmComponent } from './alarm/alarm.component';
import { CameraService } from './services/camera.service';
import { CameraModule } from './camera/camera.module';
import { FormatDateTimePipe } from './pipes/format-date-time.pipe'; // Importa el pipe

@NgModule({
  declarations: [
    AppComponent,
    AlarmComponent,
    FormatDateTimePipe 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CameraModule
  ],
  providers: [
    CameraService,
    FormatDateTimePipe 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
