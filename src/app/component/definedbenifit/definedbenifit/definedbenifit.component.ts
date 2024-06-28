import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefinedBenefitPensionScheme } from 'src/app/models/definedbenefitpensionscheme';
import { PensionpotService } from 'src/app/services/pensionpot/pensionpot.service';
import { StoreService } from 'src/app/services/store/store.service';
import { JobService } from 'src/app/services/job/job.service';
import { HttpClient } from '@angular/common/http';
import { DefinedBenefitService } from 'src/app/services/definedbenifit/definedbenifit.service';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';

@Component({
  selector: 'app-definedbenifit',
  templateUrl: './definedbenifit.component.html',
  styleUrls: ['./definedbenifit.component.scss']
})
export class DefinedbenifitComponent implements OnInit {
  definedBenefitForm!: FormGroup;
  pensionPots: any[] = [];
  tax: number = 0;
  salary: number = 0;
  loading: boolean = false;
  personaldetails: boolean = false;
  apisuccess: boolean = false;
  apiupdate: boolean = false;
  error: string = '';
  gdpGrowthRate: number = 0;
  adjustedAccrualRate!:number;
  definedbenifit: any = {};
  personalid:any
  age:any
  ageearly:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private pensionPotService: PensionpotService,
    private jobService: JobService,
    private userDetailsServie: UserDetailsService,
    private http: HttpClient,
    private definedBenefitService: DefinedBenefitService 
  ) {}

  ngOnInit(): void {
    this.definedBenefitService.getDefinedBenefitPensionSchemes(StoreService.getUserData().userId).subscribe(
      (schemes: any) => {
        this.definedbenifit=schemes
        this.definedBenefitForm.patchValue({
          retirementGoalAge: this.definedbenifit.retirementGoalAge
         
        });
    
      },
      (error) => {
        console.error('Error fetching defined benefit pension schemes:', error);
      }
    );
    this.getpersonaldetails();




    this.definedBenefitForm = this.formBuilder.group({
     
    
      retirementGoalAge: ['', Validators.required],

    });


    this.getSalary();
    this.fetchGDPGrowthRate();
  }

  onSubmit(): void {

    if(this.personalid){


      if (this.definedBenefitForm.valid) {

        if(this.definedBenefitForm.value.retirementGoalAge>this.age+10){
          const formData: DefinedBenefitPensionScheme = {
            retirementGoalAge: this.definedBenefitForm.value.retirementGoalAge,
            accrualRate: this.adjustedAccrualRate 
          };
          if(   this.definedbenifit.id ){
            this.definedbenifit.retirementGoalAge=this.definedBenefitForm.value.retirementGoalAge;
  
            this.definedBenefitService.updateDefinedBenefitPensionScheme(this.definedbenifit, 3.20, this.tax, StoreService.getUserData().userId)
            .subscribe(
              (response: DefinedBenefitPensionScheme) => {
                this.apiupdate=true
              },
              (error) => {
                console.error('Error creating defined benefit pension scheme:', error);
              }
            );
     
          }
          else{
            this.definedBenefitService.createDefinedBenefitPensionScheme(formData, 3.20, this.tax, StoreService.getUserData().userId)
            .subscribe(
              (response: DefinedBenefitPensionScheme) => {
                this.apisuccess=true
              },
              (error) => {
                console.error('Error creating defined benefit pension scheme:', error);
              }
            );
    
          }
         
       

        }
        else{
          this.ageearly=true

        }
  
       
      } else {
        console.error('Form is invalid.');
      }

    }
    else{
      this.personaldetails=true

    }
   

  }
  


  private getSalary(): void {
    const userId = StoreService.getUserData().userId;

  
    this.jobService.getJobsByUserId(userId).subscribe(
      (data: any) => {
      
        if (data && data.salary) {
          this.salary = data.salary;
          this.calculateTax(this.salary);
        } else {
          this.error = 'No job found for the user.';
        }
      },
      (error) => {
      
        console.error('Error fetching jobs for user:', error);
        this.error = 'Error fetching jobs for user.';
      }
    );
  }

  private calculateTax(salary: number): void {
    if (salary <= 12570) {
      this.tax = 0;
    } else if (salary > 12570 && salary <= 50270) {
      this.tax = 0.2;
    } else if (salary > 50270 && salary <= 125140) {
      this.tax = 0.4;
    } else {
      this.tax = 0.45;
    }
  }
  private fetchGDPGrowthRate(): void {
    const apiUrl = 'https://api.api-ninjas.com/v1/country?name=United%20Kingdom';
    const apiKey = 'CkELqidkaK5GT0ksCGPUfGRqhCU6s3jmc7ddoiVC';
    this.http.get(apiUrl, { headers: { 'X-Api-Key': apiKey } }).subscribe(
      (response: any) => {
        if (response.length > 0) {
          const gdpGrowthRate = parseFloat(response[0].gdp_growth);
          console.log('GDP Growth Rate:', gdpGrowthRate);
  
          const baseAccrualRate = 1 / 60;
          const gdpMultiplier = 0.1;
           this.adjustedAccrualRate = this.calculateAdjustedAccrualRate(baseAccrualRate, gdpGrowthRate, gdpMultiplier);
          console.log('Adjusted Accrual Rate:', this.adjustedAccrualRate);
        }
      },
      (error) => {
        console.error('Error fetching GDP growth rate:', error);
      }
    );
  }
  
  private calculateAdjustedAccrualRate(baseAccrualRate: number, gdpGrowthRate: number, gdpMultiplier: number): number {
    if (gdpGrowthRate >= 0) {
      const modifiedGDPGrowthRate = gdpGrowthRate / 100;
      const adjustedAccrualRate = baseAccrualRate + (gdpMultiplier * modifiedGDPGrowthRate);
      return adjustedAccrualRate;
    } else {
      return baseAccrualRate;
    }
  }



  getpersonaldetails(){
    this.userDetailsServie.getUserDetailsByUserId(StoreService.getUserData().userId).subscribe(
      (data) => {
        this.personalid=data.id

        const dateOfBirth = new Date(data.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDiff = today.getMonth() - dateOfBirth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
          this.age = age - 1;
        } else {
          this.age = age;
        }
        console.log(this.age)

      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  
  
}
