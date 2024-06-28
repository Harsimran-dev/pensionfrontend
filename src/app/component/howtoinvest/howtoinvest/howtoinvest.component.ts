import { Component } from '@angular/core';

@Component({
  selector: 'app-howtoinvest',
  templateUrl: './howtoinvest.component.html',
  styleUrls: ['./howtoinvest.component.scss']
})
export class HowtoinvestComponent {
  stockimages: Array<object> = [
    {
      image: 'assets/intro.png',
      thumbImage: 'assets/intro.png',
      alt: 'Intro',
      title: 'Intro'
    },
    {
      image: 'assets/thirdstock.png',
      thumbImage: 'assets/thirdstock.png',
      alt: 'Third Stock',
      title: 'Third Stock'
    },
    {
      image: 'assets/secondstock.png',
      thumbImage: 'assets/secondstock.png',
      alt: 'Second Stock',
      title: 'Second Stock'
    },
    {
      image: 'assets/companystock.png',
      thumbImage: 'assets/companystock.png',
      alt: 'Second Stock',
      title: 'Second Stock'
    },
    {
      image: 'assets/profitstock.png',
      thumbImage: 'assets/profitstock.png',
      alt: 'Second Stock',
      title: 'Second Stock'
    }
  ];

  cryptoimages: Array<object> = [
    {
      image: 'assets/crypto1.png',
      thumbImage: 'assets/crypto1.png',
      alt: 'Intro',
      title: 'Crypto'
    },
    {
      image: 'assets/crypto2.png',
      thumbImage: 'assets/crypto2.png',
      alt: 'Third Stock',
      title: 'Crypto'
    },
    {
      image: 'assets/crypto3.png',
      thumbImage: 'assets/crypto3.png',
      alt: 'Second Stock',
      title: 'Crypto'
    },
    {
      image: 'assets/crypto4.png',
      thumbImage: 'assets/crypto4.png',
      alt: 'Second Stock',
      title: 'Crypto'
    }
  ];
  foreximages: Array<object> = [
    {
      image: 'assets/forex1.png',
      thumbImage: 'assets/forex1.png',
      alt: 'Intro',
      title: 'Crypto'
    },
    {
      image: 'assets/forex2.png',
      thumbImage: 'assets/forex2.png',
      alt: 'Third Stock',
      title: 'Crypto'
    },
    {
      image: 'assets/forex3.png',
      thumbImage: 'assets/forex3.png',
      alt: 'Second Stock',
      title: 'Crypto'
    }
  ];

  comimages: Array<object> = [
    {
      image: 'assets/commodity1.png',
      thumbImage: 'assets/commodity1.png',
      alt: 'Intro',
      title: 'Crypto'
    },
    {
      image: 'assets/commodity2.png',
      thumbImage: 'assets/commodity2.png',
      alt: 'Third Stock',
      title: 'Crypto'
    }
  ];
}
