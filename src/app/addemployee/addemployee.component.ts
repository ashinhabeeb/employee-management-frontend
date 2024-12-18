import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent {

 

  employeeForm = new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl('',[Validators.required,Validators.email]),
    age:new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
    status:new FormControl('',[Validators.required])
  })

  constructor (private api:ApiService, private router:Router){}

  addEmployee(){
    console.log(this.employeeForm.value)

    if(this.employeeForm.invalid){
      alert("please fill the form properly")
    }
    else{
      this.api.addEmployeeApi(this.employeeForm.value).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.employeeForm.reset()
          this.router.navigateByUrl('/')
        },
        error:(err:any)=>{
          console.log(err)
          alert("something went wrong")
        }
      })
    }

  }

}
