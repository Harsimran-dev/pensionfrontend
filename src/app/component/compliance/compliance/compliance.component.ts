import { Component, Directive, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplianceService } from 'src/app/services/compliance/compliance.service';

import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss']
})

export class ComplianceComponent implements OnInit {
  @Input('wordLimit') limit!: number;
  complianceList!: any[];
  closeResult = '';
  loading = false;
  selectedComp: any;
  editedResponse!: string;

  constructor(private complianceService: ComplianceService,private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchComplianceData();
  }
  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const words = value.split(/\s+/).slice(0, this.limit);
    event.target.value = words.join(' ');
  }

  fetchComplianceData(): void {
    this.loading =true;
   
    this.complianceService.getComplianceForUser(StoreService.getUserData().userId).subscribe(
      (data: any[]) => {
        this.complianceList = data;
        this.loading =false;
        
      },
      error => {
        console.error('Error fetching compliance data:', error);
        this.loading =false;
      }
    );
  }

  navigateToTutorialPage(): void {
    this.router.navigate(['/component/Howtoinvest']);
  }


  open(content: TemplateRef<any>, pot: any) {
    console.log('Pot received:', pot);
    this.selectedComp = pot;
    this.editedResponse = this.selectedComp.response;
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        window.location.reload()


      },
      () => {
      }
    );
  }

  submitEditedResponse() {
    const complianceId = this.selectedComp.id;
    const updatedResponse = this.editedResponse;
    this.complianceService.updateComplianceResponse(complianceId, updatedResponse).subscribe(
      (data) => {
        console.log('Response updated successfully:', data);
       
      },
      (error) => {
        console.error('Failed to update response:', error);
      }
    );
    window.location.reload()
  }
}
