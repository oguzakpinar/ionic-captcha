# Arithmetic Captcha Component For Ionic 3

This is an Ionic Angular component that ask arithmetic equation to user and check its result.

### For Download 
`npm install ionic-captcha`

## Usage

Add CaptchaProvider to your AppModule and add imports from used module CaptchaComponentModule. Then add `<captcha></captcha>` to your html file.
To use within FormControl add required validator and add form control name `  formControlName="captcha"`

At least usage shown like below. 
In Html Template 
`<captcha  formControlName="captcha"></captcha>`
In Controller
```ts
this.formBuilder.group({
	captcha: ['', Validators.required]
});
```

## Customization
User has 3 chance to find true solution otherwise regenerate captcha with new solution. In this 3 chance keyPress timeout is default 1500ms because of mobile platform but this is parametric. Developer change this timeout with **keypressTimeout** parameter.

Also there are four other parameters you can use and default values are given below.
|Parameter|Description|Default Value|
|-|-|-|
|useMinus|Use only plus operant or both|true|
|negativeAllowed|Result can be negative number|true|
|minNumLength|Minimum number of digits of numbers|1|
|maxNumLength|Maximum number of digits of numbers|2|
