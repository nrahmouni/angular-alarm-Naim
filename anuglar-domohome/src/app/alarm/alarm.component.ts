import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CameraService } from '../services/camera.service';
import { FormatDateTimePipe } from '../pipes/format-date-time.pipe';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
})
export class AlarmComponent implements OnInit {
  private connection!: signalR.HubConnection; 
  alarmStatus = 'Unknown';
  alarmDate: Date = new Date();

  constructor(private cameraService: CameraService, private datePipe: FormatDateTimePipe) {}

  ngOnInit() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5057/alarm-hub')
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    this.connection.on('alarmStateChanged', (status: string) => {
      this.updateAlarmStatus(status);
      if (status === 'on') {
        this.cameraService.getCameraImage();
      }
    });

    this.connection.start().then(() => {
      this.getInitialAlarmStatus();
    });

 
  }

  toggleAlarm() {
    const newStatus = this.alarmStatus === 'Alarm ON' ? 'off' : 'on';
    this.connection.send('SetAlarmState', newStatus);
    this.connection.send('GetCameraImage', newStatus);
  }

  private async getInitialAlarmStatus() {
    try {
      await this.connection.invoke('GetAlarmStatus');

    } catch (err) {
      console.error(err);
    }
  }
  
  

  private updateAlarmStatus(status: string) {
    this.alarmStatus = status === 'on' ? 'Alarm ON' : 'Alarm OFF';
    this.alarmDate = new Date();
  }

  get formattedAlarmDate() {
    return this.datePipe.transform(this.alarmDate);
  }
}
