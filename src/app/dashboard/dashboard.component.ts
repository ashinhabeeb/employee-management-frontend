import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  allEmployees:any[]=[]
  filterArray:any[]=[]
  editArray:any[]=[]
  empId:String=''
  


  employeeUpdateForm = new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl('',[Validators.required,Validators.email]),
    age:new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
    status:new FormControl('',[Validators.required])
  })

  

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(){
    this.api.getAllEmployeesApi().subscribe({
      next:(result:any)=>{
        this.allEmployees=result
        this.filterArray=result
        this.editArray=result
        console.log(this.allEmployees)
      }
    ,
    error:(err:any)=>{
      console.log(err)
    }
    })
  }

  deleteEmployee(id:String){
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        alert('employee deleted successfully')
        this.getAllEmployees()
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  filterStatus(status:any){
    this.allEmployees = this.filterArray.filter((item)=>item.status==status)
  }

  handleEditButton(item:any){
    console.log(item)
    const selectedEmployee = item
    console.log(selectedEmployee)

  if (selectedEmployee) {

    this.empId = selectedEmployee._id
    // console.log(this.empId)

    // Patch the form with the selected employee's details
    this.employeeUpdateForm.patchValue({
      firstName: selectedEmployee.firstName,
      email: selectedEmployee.email,
      age: selectedEmployee.age,
      status: selectedEmployee.status
    });

  } else {
    console.log('Employee not found');
  }
  }


  updateDetails(){
    console.log(this.employeeUpdateForm.value)

      let updateData = this.employeeUpdateForm.value
      this.api.updateEmployeeApi(this.empId,updateData).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.getAllEmployees()
          this.router.navigateByUrl('/')
          
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    
    }


  handleCancel(){
    this.getAllEmployees()
    
  }

}
