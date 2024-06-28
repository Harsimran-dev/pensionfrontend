import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { StoreService } from 'src/app/services/store/store.service';

export interface CardData {
  frontContent: string;
  backContent: string;
  state: "default" | "flipped";
}

@Component({
  selector: 'app-nocontribution',
  templateUrl: './nocontribution.component.html',
  styleUrls: ['./nocontribution.component.scss']
})
export class NocontributionComponent implements OnInit {
  name!: string;
  public cards: CardData[] = [
    {
      frontContent: 'Create your job',
      backContent: 'The structure of your pension process hinges upon whether your employer subscribes to a defined contribution or defined benefit plan.',

      state: 'default'
    },
    {
      frontContent: 'Wait for request approval from your company',
      backContent: 'Upon submission, your request to contribute will be dispatched to your employer via mail for thorough review. Following their assessment, they will either approve or reject your application.'
      ,
      state: 'default'
    },
    {
      frontContent: 'Start contributing',
      backContent: 'Start contributing to your pension pot\nDefined Benefit: Your contributions will start adding to your pension',
      state: 'default'
    },
    {
      frontContent: 'Create as many pension pots as you want',
      backContent: 'You have the liberty to establish multiple pension pots, allowing for diversified investments. Each pot serves as an avenue for managing and allocating your funds strategically.'
      ,
      state: 'default'
    }
  ];

  constructor(private authService: AuthenticationService) { }



  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(): void {
    this.authService.getUserById(StoreService.getUserData().userId).subscribe(
      (user: any) => {
        console.log('User:', user);
        this.name = user.firstName;
      },
      (error) => {
        console.error('Error fetching user by ID:', error);
      }
    );
  }

  toggleFlip(index: number) {
    this.cards[index].state = (this.cards[index].state === 'default') ? 'flipped' : 'default';
  }
}
