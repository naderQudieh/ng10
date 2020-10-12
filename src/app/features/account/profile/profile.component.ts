import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { retry } from 'rxjs/operators';
 
 
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls:  ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    selectedCountry;
    selectedLanguage;
    countries = [];

    languages = [];
    user = {
        user_first: '',
        user_last: '',
        user_pwd: '',
        user_gender: '',
        user_email: ''
    };
    mainform: FormGroup;
    @ViewChild('boy') private boy: MatCheckbox;
    @ViewChild('girl') private girl: MatCheckbox;
    @ViewChild('male') private male: MatCheckbox;
    @ViewChild('female') private female: MatCheckbox;
    constructor( ) {
    }

    ngOnInit(): void {
        this.mainform = new FormGroup(
            {
                firstName: new FormControl('',),
                lastName: new FormControl('',),
                password: new FormControl('',),
                email: new FormControl('',),
                language: new FormControl('',),
                country: new FormControl('',),
                gender: new FormControl('',),

            })
       

    }
    optionSelected(event): void {
        this.selectedCountry = event.value;
        console.log(this.selectedCountry);
        this.languages = [];
        this.selectedCountry['languages'].forEach(element => {
            this.languages.push(element['name']);
        });

    }

    userDetails(): void {
        if (this.male.checked) {
            this.user['user_gender'] = 'Male';
        } else if (this.female.checked) {
            this.user['user_gender'] = 'Female';
        }
        const userDetails = {
            firstname: this.mainform.value['firstName'],
            lastname: this.mainform.value['lastName'],
            email: this.mainform.value['email'],
            gender: this.mainform['user_gender'],
            password: this.mainform.value['password']
        };
    }

    SubmitForm(data: any): void {

        let me = {
            email: data.value.email,
            password: data.value.password 
        }
        return;  
    }
}