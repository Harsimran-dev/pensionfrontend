import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefinedContribution } from 'src/app/models/definedcontribution';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-defined-contribution',
  templateUrl: './defined-contribution.component.html',
  styleUrls: ['./defined-contribution.component.scss']
})
export class DefinedContributionComponent implements OnInit {
  closeResult = '';



  constructor(
  
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  

  megasavingFunction(): void {

    this.router.navigate(['component/megasaving']);
  }
  DreamFundFunction(): void {

    this.router.navigate(['component/dreamfund']);
  }
}
