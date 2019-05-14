import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CaptchaProvider } from './../providers/captcha-provider';

/**
 * Generated class for the CaptchaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
const HTML = `<ion-grid no-padding>
<ion-row>
  <ion-col col-6 align-self-end>
    <ion-row class="bordered" justify-content-center>
      <ion-col *ngFor="let image of images" col-auto>
        <img [src]="image" />
      </ion-col>
    </ion-row>
  </ion-col>
  <ion-col align-self-end col>
    <ion-item>
      <ion-input type="text" [(ngModel)]="givenModel" (ngModelChange)="changeCaptcha()" (onFocus)="focusIn()"></ion-input>
    </ion-item>
  </ion-col>
  <ion-col col-auto class="right">
    <button type="button" ion-button icon-only round small color="primary" (click)="reloadCaptcha()">
      <ion-icon name="refresh"></ion-icon>
    </button>
  </ion-col>
</ion-row>
</ion-grid>`

const CSS = `
  ion-grid{
      margin: 10px 0;
  }

  .bordered {
      border: 1px solid;
      border-radius: 4px;
  }
  img {
      height: 20px;
  }
  .right {
      text-align: right;
  }
  ion-item {
      height: 35px;
      min-height: 35px !important;
      padding: 0 5px !important;
      input{
          text-align: center;
      }
  }
  button {
      border-radius: 50%;
  }
`

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CaptchaComponent),
  multi: true
};

@Component({
  selector: 'captcha',
  template: HTML,
  styles: [CSS],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CaptchaComponent implements ControlValueAccessor, OnInit {
  public images: string[];
  public givenModel: string;
  private timeout;
  private tryCount = -1;
  @Input() keypressTimeout = 1500;
  @Input() useMinus = true;
  @Input() negativeAllowed = true;
  @Input() minNumLength = 1;
  @Input() maxNumLength = 2;
  private onTouchedCallback: () => void = (() => { });
  private onChangeCallback: (_: any) => void = (() => { });
  constructor(private provider: CaptchaProvider) {

  }

  ngOnInit() {
    this.images = this.provider.generateCaptcha(this.useMinus, this.negativeAllowed, this.minNumLength, this.maxNumLength);
  }

  focusIn() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.givenModel) {
      this.givenModel = value;
      this.changeCaptcha();
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  changeCaptcha() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      if (this.provider.result.toString() === this.givenModel) {
        this.onChangeCallback(true);
        this.tryCount = 0;
      } else {
        this.onChangeCallback(null);
        this.tryCount = this.tryCount + 1;
        if (this.tryCount > 2) {
          this.reloadCaptcha();
        }
      }
    }, this.keypressTimeout);
  }

  reloadCaptcha() {
    this.images = this.provider.generateCaptcha(this.useMinus, this.negativeAllowed, this.minNumLength, this.maxNumLength);
    this.tryCount = -1;
    this.changeCaptcha();
  }
}
