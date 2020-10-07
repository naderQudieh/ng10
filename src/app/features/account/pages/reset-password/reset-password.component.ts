import { Component, OnInit } from '@angular/core'; 
import { FormControl, Validators } from '@angular/forms';
//import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
  ])

  constructor( ) { }

  onSubmit() {
    
  }

  ngOnInit(): void {
  }

}
