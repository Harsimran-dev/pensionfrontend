import { Component, Input, OnInit, TemplateRef,ChangeDetectionStrategy  } from '@angular/core';
import { PensionpotService } from 'src/app/services/pensionpot/pensionpot.service';
import { StoreService } from 'src/app/services/store/store.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution/contribution.service';
import { FundtransferService } from 'src/app/services/fundtransfer/fundtransfer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pensionpot',
  templateUrl: './pensionpot.component.html',
  styleUrls: ['./pensionpot.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PensionpotComponent implements OnInit {
  closeResult = '';
  pensionPots: any[] = [];
  selectedPot: any;
  receiverPotId: number = 0;
  amount: number = 0;
  hasContributions: boolean = false;
  pensionPotName: string = '';
  fundTransferHistory!: any[];
  userApibool: boolean = false;
  userApiError: string = '';
  userApisuccess: string = '';
  deleteApiSuccess: boolean = false;
  deleteapifalse:boolean=false;
  



  constructor(private pensionPotService: PensionpotService, private modalService: NgbModal,private cdr: ChangeDetectorRef,private contributionService: ContributionService,private fundTransferService: FundtransferService) { }

  ngOnInit(): void {
    this.contributionService.getContributionByUserId(StoreService.getUserData().userId).subscribe(
      (response: any) => {
        this.hasContributions = !!response;
        if (this.hasContributions) {
          this.getPensionPots();
          this.gettransferhistory();
        }
      },
      (error) => {
        console.error('Error fetching contributions:', error);
      }
    );
  }
  getPensionPots(): void {
    this.pensionPotService.getPensionPotsByUserId(StoreService.getUserData().userId).subscribe(
      (response: any) => {
        this.pensionPots = response;
        console.log('Pension pots:', this.pensionPots);
      },
      (error) => {
        console.error('Error fetching pension pots:', error);
      }
    );
  }

  open(content: TemplateRef<any>, pot: any) {
    console.log('Pot received:', pot);
    this.selectedPot = pot;
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.getAllPensionPots();
      },
      () => {
      }
    );
    
  }
deletePensionPot(pot: any): void {
  this.pensionPotService.deletePensionPotById(pot.id).subscribe(
    
    (response) => {
      this.deleteapifalse=true
    
   
   
     
 
    },
    (err) => {
      if (err instanceof HttpErrorResponse &&  err.status !== 200) {
      
        this.userApiError = err.error;
        this.deleteApiSuccess = true;
    
      }
    }
  );
  window.location.reload()
 
}

createPensionPot(): void {
  const userId = StoreService.getUserData().userId;
  const newPot: any = {
    userId: userId,
    totalAmount: 0,
    creationDate: new Date(),
    name: this.pensionPotName
  };

  this.pensionPotService.createPensionPot(newPot).subscribe(
    (response) => {
      console.log('Pension pot created:', response);
      this.getAllPensionPots();
      
    },
    (error) => {
      console.error('Error creating pension pot:', error);
    }
  );
  window.location.reload();
}

private async getAllPensionPots() {
  try {
    const response = await this.pensionPotService.getPensionPotsByUserId(StoreService.getUserData().userId).toPromise();
    this.pensionPots = response;
    console.log('Pension pots:', this.pensionPots);
  } catch (error) {
    console.error('Error fetching pension pots:', error);
  }
  window.location.reload();

}

gettransferhistory(){
  this.fundTransferService.getFundTransferHistoryByUserId(StoreService.getUserData().userId).subscribe(
    (response) => {
      this.fundTransferHistory = response;
      console.log('Fund transfer history:', this.fundTransferHistory);
    },
    (error) => {
      console.error('Error fetching fund transfer history:', error);
    }
  );

}



  transferFunds(senderId: number, receiverId: number, amount: number): void {

    this.userApibool=false;
    if (receiverId !== null && amount!=null) {
      this.pensionPotService.transferFunds(senderId, receiverId, amount).subscribe(
        (response) => {
        

      
        },
        (err) => {
          if (err instanceof HttpErrorResponse &&  err.status !== 200) {
      
            this.userApiError = err.error;
            this.userApibool = true;
            console.log(this.userApibool)
          }
        }
     
      );

  
   
    } else {
      console.error('Receiver pot ID is null.');
    }

  }
}
