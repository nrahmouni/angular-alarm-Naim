import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private connection: signalR.HubConnection;
  public onCameraImageReceived = new EventEmitter<string>();

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5057/alarm-hub')
      .configureLogging(signalR.LogLevel.Debug)
      .build();

      this.connection.on('receiveCameraImage', (base64Image: string) => {
        this.onCameraImageReceived.emit('data:image/jpeg;base64,' + base64Image);
      });
      

    this.connection.start();
  }

  

  getCameraImage() {
    this.connection.send('GetCameraImage');
  }
}
