import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/filter";

@Component({
  selector: 'app-root',
  template: `
  <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
    <fieldset ngModelGroup="new-test-user">
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
      <button type="submit">Submit</button> br
      <label>Current City</label>
      <div *ngFor="let location of locations">
        <input type="radio"
          name="location"
          ngModel
          [attr.id]="location"
          [value]="location"
        >
        <label [attr.for]="location">{{location}}</label>
      </div>
      <div>
        <label>Favorite Food</label>
        <select name="food" ngModel>
          <option>--Select--</option>
          <option *ngFor="let food of foods"
            [value]="food"
          >{{food}}</option>
        </select>
      </div>
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
  locations = ['nyc', 'la', 'nola'];
  foods = ['hotdog', ' pizza', 'broccoli'];

  @ViewChild('formRef') form;

  onSubmit(data){
    console.log(data);
  }

  ngAfterViewInit(){
    this.form.statusChanges
      .subscribe(w => console.log(w));

    Observable.combineLatest(
      this.form.statusChanges,
      this.form.valueChanges,
      (status, value) => ({status, value})
    )
      .filter(({status})=> status ==='VALID')
      .subscribe(({value})=> console.table(value))
  }

}
