
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { AdminserviceService } from 'src/app/services/adminservice/adminservice.service';


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss']
})
export class AddcompanyComponent {
  successAlertVisible:boolean=false;
  errorAlertVisible = false;
  errorMessage: string = '';
  company: Company = {
    name: '',
    type: ''
  };

  constructor(private adminService: AdminserviceService) { }

  submitForm(): void {
    this.company.name = this.capitalize(this.company.name);
    
    
    this.adminService.createCompany(this.company.name, this.company.type).subscribe(
      response => {
        console.log(response);
        this.successAlertVisible=true;
       
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          this.errorMessage = error.error;
          this.errorAlertVisible = true;
        } 
      }
    );
  }
  
  
  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
