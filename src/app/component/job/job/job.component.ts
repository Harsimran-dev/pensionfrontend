import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job/job.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  jobForm!: FormGroup;
  companies: { id: number, name: string, type: string }[] = [];
  selectedCompany: any; 
  userApiSuccess: boolean = false;
  userupdateApiSuccess: boolean = false;
  userApibool: boolean = false;
  userApiError: string = '';
  addressApiSuccess: boolean = false;
  addressApiError: string = '';
  invalidApiSuccess: boolean = false;
  invalidApiError: string = '';

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      salary: ['', Validators.required,this.numberValidator,Validators.min(5000)],
      jobStarted: ['', Validators.required],
      companyId: ['', Validators.required],
      jobTitle: ['', Validators.required,this.alphabetValidator]
   
    });


    this.getJobsByUserId(StoreService.getUserData().userId);

    this.getAllCompanies();

  }

  getAllCompanies(): void {
    this.jobService.getAllCompanies().subscribe(
      (data: { id: number, name: string, type: string }[]) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  

  onCompanyChange(event: any): void {
    const selectedCompanyId = event.target.value;
    console.log('Selected company ID:', selectedCompanyId);
    
    this.jobForm.patchValue({
      companyId: selectedCompanyId
    });
  }



  getJobsByUserId(userId: number): void {
    this.jobService.getJobsByUserId(userId).subscribe(
      (data: any) => {
        if (data) {
          this.jobForm.patchValue({
            employeeId: data.employeeId,
            salary: data.salary,
            jobStarted: data.jobStarted,
            companyId: data.companyId,
            jobTitle: data.jobTitle,
        
          });
        }
      },
      (error) => {
        console.error('Error fetching jobs for user:', error);
      }
    );
  }


  numberValidator(control: AbstractControl): Promise<ValidationErrors | null> | ValidationErrors | null {
    return new Promise((resolve) => {
      if (isNaN(control.value)) {
        resolve({ 'notNumber': true });
      } else if (control.value < 5000) {
        resolve({ 'minValue': { requiredValue: 5000, actualValue: control.value } });
      } else {
        resolve(null);
      }
    });
  }
  

  alphabetValidator(control: any): Promise<{ [key: string]: boolean } | null> {
    return new Promise((resolve) => {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(control.value)) {
        resolve({ 'notAlphabet': true });
      } else {
        resolve(null);
      }
    });
  }


  
  
  
  

  onSubmit(): void {
    if (this.jobForm.valid) {

      const jobStartedDate = this.jobForm.get('jobStarted')?.value;
      const currentDate = new Date();
      const selectedDate = new Date(jobStartedDate);
  
      if (selectedDate > currentDate) {
        this.invalidApiError = "The job start date cannot be in the future.";
        this.invalidApiSuccess = true;
        return;
      }
  


      if (StoreService.getUserData()) {
        const userId = StoreService.getUserData().userId;
        this.jobService.getJobsByUserId(userId).subscribe(
          (data: any) => {
            if (data && data.id) {
              const formData = {
                ...this.jobForm.value,
                userId: userId
              };
              this.jobService.updateJob(data.id, formData).subscribe(
                (response) => {
                 this.userupdateApiSuccess=true;
              
                },
                (err) => {
                  if (err instanceof HttpErrorResponse) {
                    this.userApiError = err.error;
                    this.userApibool = true;
                  }
                }
              );
            } else {
              const formData = {
                ...this.jobForm.value,
                userId: userId
              };
              this.jobService.postJob(formData).subscribe(
                (response) => {
                 this.userApiSuccess=true
                
                },
                (err) => {
                  if (err instanceof HttpErrorResponse) {
                    this.userApiError = err.error;
                    this.userApibool = true;
                  }
                }
              );
            }
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              this.userApiError = err.error;
              this.userApibool = true;
            }
          }
        );
      }
    } else {
      this.invalidApiSuccess=true;

  Object.keys(this.jobForm.controls).forEach(controlName => {
    const control = this.jobForm.get(controlName);
    if (control && !control.valid) {
   
      this.invalidApiError = "Please fill "+ controlName+ " data correctly";
    }
  });
    }
  }
  


}
