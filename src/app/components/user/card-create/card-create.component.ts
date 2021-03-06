import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { MatMenu } from '@angular/material/menu/typings/menu-directive';
import { FormArray } from '@angular/forms/src/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {
  @Output() addedCard = new EventEmitter<boolean>();

  cardCompanies;
  CompanyName;

  hasAccessNumber = false;
  hasExpiration = false;

  minDate = new Date();

  cardForm: FormGroup;

  constructor(private _form: FormBuilder,
              private _cardService: CardService,
              private _router: Router,
              private _toast: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
    this._cardService.GetCompaniesDropdown().subscribe(companies => {
      console.log(companies);
      this.cardCompanies = companies;
    });
  }

  createForm() {
    this.cardForm = this._form.group({
      CompanyName: new FormControl ('', Validators.required),
      CardNumber: new FormControl ('', Validators.required),
      Amount: new FormControl ('', Validators.required),
      ExpirationDate: new FormControl,
      AccessNumber: new FormControl

    });
  }

  onSubmit() {
    this._cardService.createCard(this.cardForm.value).subscribe(data => {
      let control: AbstractControl = null;
      this.addedCard.emit(true);
      this._toast.success('Gift card added.', 'Thank you!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-center',
      });
      this.cardForm.reset();
      this.cardForm.markAsUntouched();
      Object.keys(this.cardForm.controls).forEach((name) => {
        control = this.cardForm.controls[name];
        control.setErrors(null);
      });
    });
  }

}
