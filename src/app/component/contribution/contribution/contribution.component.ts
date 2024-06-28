import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContributionService } from 'src/app/services/contribution/contribution.service';
import { RequestApprovalService } from 'src/app/services/request-approval/request-approval.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent implements OnInit {
  contributionForm!: FormGroup;
  approved: boolean = false;
  contributionid:any
  userApiSuccess: boolean = false;
  userupdateApiSuccess: boolean = false;
  userApibool: boolean = false;
  userApiError: string = '';
  addressApiSuccess: boolean = false;
  addressApiError: string = '';
  invalidApiSuccess: boolean = false;
  invalidApiError: string = '';

  constructor(private formBuilder: FormBuilder,private requestApprovalService: RequestApprovalService,private contributionService:ContributionService) { }

  ngOnInit(): void {

    this.requestApprovalService.getRequestApprovalByUserId(StoreService.getUserData().userId).subscribe(
      (response: any) => {
        this.approved = response && response.approved;
        if (!this.approved) {
          console.log("Request not approved by the company");
        } else {

          const today = new Date();
          // Format the date to 'YYYY-MM-DD'
          const formattedToday = today.toISOString().split('T')[0];
  
          this.contributionForm = this.formBuilder.group({
            percentage: ['', Validators.required],
            startDate: [formattedToday]
   
          });

          this.contributionService.getContributionByUserId(StoreService.getUserData().userId).subscribe(
            (contributionData: any) => {
              if (contributionData) {
                this.contributionid=contributionData.id;
                this.contributionForm.patchValue({
                  percentage: contributionData.percentage,
                  startDate: contributionData.startDate,
                  endDate: contributionData.endDate
                });
              }
            },
            (error) => {
              console.error('Error fetching contribution data:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching request approval:', error);
      }
    );
  }


  
  


  onSubmit(): void {
    if (this.contributionForm.valid) {
      console.log('Form submitted:', this.contributionForm.value);
      if(this.contributionid){

        const formData={
          ...this.contributionForm.value,
          id:this.contributionid
        }
        const userId = StoreService.getUserData().userId;

          this.contributionService.updateContribution(userId, formData).subscribe(
            (response) => {
              console.log('Contribution created successfully:', response);
              this.userupdateApiSuccess=true;
            
            },
            (err) => {
              if (err instanceof HttpErrorResponse) {
                this.userApiError = err.error;
                this.userApibool = true;
              }
            }
          );


        }

      else{

        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];

       
        const userId = StoreService.getUserData().userId;
       
      const contributionData = this.contributionForm.value;
      
      this.contributionService.createContribution(userId, contributionData).subscribe(
        (response) => {
          console.log('Contribution created successfully:', response);
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
      
    } else {
      this.contributionForm.markAllAsTouched();
    }
  }
  
}
