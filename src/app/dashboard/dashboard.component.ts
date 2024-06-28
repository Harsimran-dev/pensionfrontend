import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContributionService } from 'src/app/services/contribution/contribution.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  user: any;
  hasContributions: boolean = false;

  constructor(private route: ActivatedRoute, private contributionService: ContributionService) {

  }

  ngOnInit(): void {
    this.user = history.state.user;
    console.log("This is from dashboard");
    console.log(this.user);

    this.contributionService.getContributionByUserId(StoreService.getUserData().userId).subscribe(
      (response: any) => {
        this.hasContributions = !!response;
      },
      (error) => {
        console.error('Error fetching contributions:', error);
      }
    );
  }
}
