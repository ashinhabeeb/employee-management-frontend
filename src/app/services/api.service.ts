import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl:string = 'http://localhost:4002'

  constructor(private http : HttpClient) { }

  //api to get all employees
  getAllEmployeesApi(){
    return this.http.get(`${this.serverUrl}/all-employees`)
  }

  //api to add new employee
  addEmployeeApi(reqbody:any){
    return this.http.post(`${this.serverUrl}/addemployee`,reqbody)
  }

  //api to delete
  deleteEmployeeApi(id:String){
    return this.http.delete(`${this.serverUrl}/delete-employee/${id}`)
  }

  //api to update emloyee details

  updateEmployeeApi(id:String,reqbody:any){
    return this.http.put(`${this.serverUrl}/update-employee/${id}`,reqbody)
  }
}
