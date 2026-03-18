import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    standalone: false
})
export class WizardComponent implements OnInit {
  isLinear = false;
  firstFormGroup: UntypedFormGroup = Object.create(null);
  secondFormGroup: UntypedFormGroup = Object.create(null);

  constructor(private _formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
