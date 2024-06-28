import { Component, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution/contribution.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-contributiondashboard',
  templateUrl: './contributiondashboard.component.html',
  styleUrls: ['./contributiondashboard.component.scss']
})
export class ContributiondashboardComponent implements OnInit {
  contribution: any = {};

  constructor(private contributionService: ContributionService) { }

  ngOnInit(): void {
    this.loadContributions();
  }

  loadContributions(): void {
    const userId = StoreService.getUserData().userId;
    this.contributionService.getContributionByUserId(userId).subscribe(
      (contributionData: any) => {
        if (contributionData) {
          this.contribution = contributionData;
        }
      },
      (error) => {
        console.error('Error fetching contributions:', error);
      }
    );
  }
}
