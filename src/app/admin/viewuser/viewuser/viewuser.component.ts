import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefinedBenefitService } from 'src/app/services/definedbenifit/definedbenifit.service';
import { InvestmentService } from 'src/app/services/investment/investment.service';
import { JobService } from 'src/app/services/job/job.service';
import { PensionpotService } from 'src/app/services/pensionpot/pensionpot.service';
import { RequestApprovalService } from 'src/app/services/request-approval/request-approval.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent {
  companyName!:String
  investments: any[] = [];
  definedbenifit: any = {};
  pensionPots: any[] = [];
  totalAmount=0;
  userId: any;
  nodata:boolean=false
  approved: boolean = false;

  constructor(private requestApprovalService: RequestApprovalService,private route: ActivatedRoute,private router: Router,private pensionPotService: PensionpotService,private investmentService: InvestmentService,private jobService: JobService,  private definedBenefitService: DefinedBenefitService ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.findcompanytype();
    this.getPensionPots();
    this.  getrequestapproval();
  }

   findcompanytype(){
    const userId = StoreService.getUserData().userId;
    this.jobService.getCompanyTypeByUserId( this.userId).subscribe(
      (companyTypeData: any) => {
        this.companyName=companyTypeData;
        if (companyTypeData === 'defined_benefit') {

          this.definedBenefitService.getDefinedBenefitPensionSchemes( this.userId).subscribe(
            (schemes: any) => {
              this.definedbenifit=schemes
         
          
            },
            (error) => {
              console.error('Error fetching defined benefit pension schemes:', error);
            }
          );
     

        }
        else if (companyTypeData === 'defined_contribution') {

          const userId = StoreService.getUserData().userId;
          this.investmentService.getAllInvestmentsForUser( this.userId).subscribe(
            (response: any) => {
              this.investments = response;
            },
            (error) => {
              console.error('Error fetching investments:', error);
            }
          );


         
        } 



      }
      ,
            (error) => {
             this.nodata=true;
            }
     
    );




   }
   navigateToMessagePage(): void {
    this.router.navigate(['/admin/messageuser', this.userId]);
  }

   getPensionPots(): void {
    this.pensionPotService.getPensionPotsByUserId( this.userId).subscribe(
      (response: any) => {
        this.pensionPots = response;
        console.log('Pension pots:', this.pensionPots);
  
        this.pensionPots.forEach((pot: any) => {
          this.totalAmount += pot.totalAmount;
        });
  
      
      },
      (error) => {
        console.error('Error fetching pension pots:', error);
      }
    );
  }

  getrequestapproval(){

    this.requestApprovalService.getRequestApprovalByUserId(this.userId).subscribe(
      (response: any) => {
        this.approved = response && response.approved;
        if (!this.approved) {
          console.log("Request not approved by the company");
        } 
  
        
      },
      (error) => {
        console.error('Error fetching request approval:', error);
      }
    );




  }
  


}
