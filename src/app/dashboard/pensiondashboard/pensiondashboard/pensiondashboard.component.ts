import { Component, OnInit } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContributionService } from 'src/app/services/contribution/contribution.service';
import { PensionpotService } from 'src/app/services/pensionpot/pensionpot.service';
import { StoreService } from 'src/app/services/store/store.service';


@Component({
  selector: 'app-pensiondashboard',
  templateUrl: './pensiondashboard.component.html',
  styleUrls: ['./pensiondashboard.component.scss']
})
export class PensiondashboardComponent implements OnInit {

  pensionPots: any[] = []; // Define pensionPots array to store fetched pension pots

  constructor(
    private pensionPotService: PensionpotService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private contributionService: ContributionService
  ) { }

  ngOnInit(): void {
    console.log(StoreService.isAdminLoggedIn())
    this.contributionService.getContributionByUserId(StoreService.getUserData().userId).subscribe(
      (response: any) => {
        const hasContributions = !!response; // Set to true if there is any response
        if (hasContributions) {
          this.getPensionPots(); // Call getPensionPots if there are contributions
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
}
