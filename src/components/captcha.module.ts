import {NgModule, ModuleWithProviders} from '@angular/core';
import {IonicPageModule, IonicModule} from 'ionic-angular';
import { CaptchaComponent } from './captcha';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaptchaProvider } from './../providers/captcha-provider';

@NgModule({
  declarations: [CaptchaComponent],
  exports: [CaptchaComponent],
  imports: [IonicModule, CommonModule, FormsModule, IonicPageModule.forChild(CaptchaComponent)]
})
export class CaptchaComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: CaptchaComponentModule,
        providers: [CaptchaProvider]
    };
}
}
