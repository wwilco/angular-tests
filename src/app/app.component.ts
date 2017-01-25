import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
    <fieldset ngModelGroup="login">
      <input
        required
        type="text"
        name="username"
        [(ngModel)]="username"
        #usernameRef="ngModel"
        minlength="3"
      > <br>
      <input type="password" ngModel name="password">
      <div *ngIf="usernameRef.errors?.required">This field is required</div>
      <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {{usernameRef.errors?.minlength.requiredLength}} characters. Yours is only {{usernameRef.errors?.minlength.actualLength}} characters </div>


      <div>{{usernameRef.errors | json}}</div>
      <button type="submit">Submit</button>
    </fieldset>
  </form>

  {{formRef.value | json}}
  <br>
  {{formRef.valid | json}}

  `,
  styles: [`
    input.ng-invalid{ border: 3px solid red; }
    input.ng-valid{ border: 3px solid green; }
  `]
})
export class AppComponent {
  username = 'Will';

  onSubmit(data){
    console.log(data);

  }



}
