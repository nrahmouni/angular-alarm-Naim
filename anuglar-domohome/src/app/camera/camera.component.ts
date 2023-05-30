import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
  })
  export class CameraComponent implements OnInit {
    cameraImage: string | undefined;
  
    constructor(private cameraService: CameraService) {}
  
    ngOnInit() {
      this.cameraService.onCameraImageReceived.subscribe(
        (image: string) => {
          this.cameraImage = image;
        },
        (error: any) => {
          console.error('Error loading camera image', error);
        }
      );
  
      this.loadCameraImage();
    }
  
    loadCameraImage() {
      this.cameraService.getCameraImage();
    }
  }
  
