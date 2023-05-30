// camera.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { CameraService } from '../services/camera.service';

@NgModule({
  declarations: [CameraComponent],
  imports: [CommonModule],
  providers: [CameraService],
  exports: [CameraComponent]
})
export class CameraModule { }
