import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InvestmentType } from 'src/app/models/investmenttype';
import { InvestmentService } from 'src/app/services/investment/investment.service';
import { StoreService } from 'src/app/services/store/store.service';


@Component({
  selector: 'app-myinvestment',
  templateUrl: './myinvestment.component.html',
  styleUrls: ['./myinvestment.component.scss']
})
export class MyinvestmentComponent implements OnInit {
  investments: any[] = [];
  activeId: number | null = null;
  apiKey = 'CkELqidkaK5GT0ksCGPUfGRqhCU6s3jmc7ddoiVC';
  apiUrl = 'https://api.api-ninjas.com/v1/stockprice';
  apiforexUrl = 'https://v6.exchangerate-api.com/v6/423e7b63748cf387b34dddd6/pair/';
  commodityUrl = 'https://api.api-ninjas.com/v1/commodityprice';
  cryptoUrl = 'https://api.api-ninjas.com/v1/cryptoprice';
  stockPriceResponse: any;
  loading = false;
  GBP="GBP"
  transfer:boolean=false;
  constructor(private investmentService: InvestmentService,    private http: HttpClient) { }

  ngOnInit(): void {
    this.loadInvestments();
  }

  loadInvestments(): void {
    const userId = StoreService.getUserData().userId;
    this.investmentService.getAllInvestmentsForUser(userId).subscribe(
      (response: any) => {
        this.investments = response;
      },
      (error) => {
        console.error('Error fetching investments:', error);
      }
    );
  }
  transferProfitToPot(investmentId: any, currentPrice: number, quantity: number, pensionPotId: number) {
    const profit = currentPrice  * quantity;

    this.investmentService.transferProfitToPot(investmentId, pensionPotId).subscribe(
      (response: string) => {
        console.log('Profit transferred successfully:', response);
       this.transfer=true
        
      },
      (error) => {
        console.error('Error transferring profit:', error);
      }
    );
  
  }
  toggleCollapse(investmentId: number, ticker: string, value:string): void {
  
 this.loading=true

    if(value=="STOCKS"){
      const url = `${this.apiUrl}?ticker=${ticker}`;
      const headers = new HttpHeaders({
        'X-Api-Key': this.apiKey
      });
      this.http.get(url, { headers }).subscribe(
        (response: any) => {
          console.log('Stock Price Response:', response);
          const stockPrice = response.price;
    
          this.investmentService.updateInvestment(investmentId, stockPrice).subscribe(
            (updateResponse: any) => {
              console.log('Investment Updated:', updateResponse);
              this.loadInvestments();
              this.loading=false
    
              if (this.activeId === investmentId) {
                this.activeId = null;
              } else {
                this.activeId = investmentId;
              }
            },
            (error) => {
              console.error('Error updating investment:', error);
              this.loading=false
            }
          );
        },
        (error) => {
          console.error('Error fetching stock price:', error);
          this.loading=false
        }
      );
    }
    
   
    if(value=="CRYPTO"){
      const apiKey = 'LKC46N6I7I4YJSC5';
const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${ticker}&to_currency=USD&apikey=${apiKey}`;

this.http.get(url).subscribe(
  (response: any) => {
    console.log('Stock Price Response:', response);
    const stockPrice = response['Realtime Currency Exchange Rate']['5. Exchange Rate'];

    this.investmentService.updateInvestment(investmentId, stockPrice).subscribe(
      (updateResponse: any) => {
        console.log('Investment Updated:', updateResponse);
        this.loadInvestments();
        this.loading = false;

        if (this.activeId === investmentId) {
          this.activeId = null;
        } else {
          this.activeId = investmentId;
        }
      },
      (error) => {
        console.error('Error updating investment:', error);
        this.loading = false;
      }
    );
  },
  (error) => {
    console.error('Error fetching stock price:', error);
    this.loading = false;
  }
);


    }

    if(value=="FOREX"){

      const url = `${this.apiforexUrl}${ticker}/${this.GBP}`;
      const headers = new HttpHeaders({
        'X-Api-Key': '423e7b63748cf387b34dddd6'
      });
      this.http.get(url, { headers }).subscribe(
        (response: any) => {
          console.log('Stock Price Response:', response);
          const stockPrice = response.conversion_rate;
    
          this.investmentService.updateInvestment(investmentId, stockPrice).subscribe(
            (updateResponse: any) => {
              console.log('Investment Updated:', updateResponse);
              this.loadInvestments();
              this.loading=false
    
              if (this.activeId === investmentId) {
                this.activeId = null;
              } else {
                this.activeId = investmentId;
              }
            },
            (error) => {
              console.error('Error updating investment:', error);
              this.loading=false
            }
          );
        },
        (error) => {
          console.error('Error fetching stock price:', error);
          this.loading=false
        }
      );



    }
    if(value=="COMMODITIES"){
      const url = `${this.commodityUrl}?name=${ticker}`;
      const headers = new HttpHeaders({
        'X-Api-Key': this.apiKey
      });
      this.http.get(url, { headers }).subscribe(
        (response: any) => {
          console.log('Stock Price Response:', response);
          const stockPrice = response.price;
    
          this.investmentService.updateInvestment(investmentId, stockPrice).subscribe(
            (updateResponse: any) => {
              console.log('Investment Updated:', updateResponse);
              this.loadInvestments();
              this.loading=false
    
              if (this.activeId === investmentId) {
                this.activeId = null;
              } else {
                this.activeId = investmentId;
              }
            },
            (error) => {
              console.error('Error updating investment:', error);
              this.loading=false
            }
          );
        },
        (error) => {
          console.error('Error fetching stock price:', error);
          this.loading=false
        }
      );


    }
    

  

  }
  
}
