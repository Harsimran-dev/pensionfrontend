export type performanceChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { companies } from 'src/app/models/Companies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions
} from 'ng-apexcharts';
import { PensionpotService } from 'src/app/services/pensionpot/pensionpot.service';
import { StoreService } from 'src/app/services/store/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job/job.service';
import { DefinedContribution } from 'src/app/models/definedcontribution';
import { Investment } from 'src/app/models/Investment';
import { InvestmentType } from "src/app/models/investmenttype";
import { DefinedContributionService } from 'src/app/services/definedcontribution/definedcontribution.service';
import { cryptos } from 'src/app/models/Crypto';


@Component({
  selector: 'app-megasaving',
  templateUrl: './megasaving.component.html',
  styleUrls: ['./megasaving.component.scss']
})
export class MegasavingComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public performanceChartOptions!: Partial<performanceChartOptions>;
  public performanceCryptoChartOptions!: Partial<performanceChartOptions>;
  maxChanges: { date: string, change: string, changeAmount: number }[] = [];
  crymaxChanges: { date: string, change: string, changeAmount: number }[] = [];
  changes: { date: string, change: string, changeAmount: number }[] = [];
  maxDip: { date: string, change: string, changeAmount: number } | null = null;
  maxRise: { date: string, change: string, changeAmount: number } | null = null;
  stocksvalue="stocks";
  cryptovalue="crypto"
  rsi!:number;
  active = 1;
  megasavingData: any;
  companies = companies;
  crypto=cryptos
  selectedCompany: string | undefined;
  selectedCrypto: string | undefined;
  apiKey = 'CkELqidkaK5GT0ksCGPUfGRqhCU6s3jmc7ddoiVC';
  apiUrl = 'https://api.api-ninjas.com/v1/stockprice';
  cryptoUrl = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=7S63PNOP6UIA9XPR';
  stockPriceResponse: any;
  cryptopriceresponse:any;
  pensionPots: any[] = [];
  showform:boolean=false;
  showcryptoform:boolean=false;
  pensionPotsWithMoreThan100Pounds: any[] = [];
  formGroup!: FormGroup;
  formCryptoGroup!: FormGroup;

  calculateAlertVisible:boolean=false;
  pensionpotbalance:boolean=false;
  pensionpotcryptobalance:boolean=false;
  apisuccessful:boolean=false;
  apicryptosuccessful:boolean=false;
  successstring:any
  calculateAlertcryptoVisible:boolean=false;
  calculatenum:any;
  balance:any;
  calculatecrypto:any

  constructor(
    private pensionPotService: PensionpotService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private definedContributionService: DefinedContributionService
  ) {}

  ngOnInit(): void {

    this.maxChanges.length=0;
    this.formGroup = this.formBuilder.group({
    
      numberOfStocks: [null, Validators.required],
      selectedPensionPot: [null, Validators.required]
    });
    this.formCryptoGroup = this.formBuilder.group({
    
      numberOfCrypto: [null, Validators.required],
      selectedPensionPott: [null, Validators.required]
    });
  }

  onCompanySelect(ticker: string): void {
    this.selectedCompany = ticker;
    this.fetchStockPrice(ticker);
  }

  onCryptoSelect(ticker: string): void {
    this.selectedCompany = ticker;
    this.fetchCryptoPrice(ticker);
 
  }

  fetchStockPrice(ticker: string): void {
    const url = `${this.apiUrl}?ticker=${ticker}`;
    
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        console.log('Stock Price Response:', response);
        this.stockPriceResponse = response;
        this.buyStocks("stocks");
        
  
      },
      error => {
        console.error('Error fetching stock price:', error);
      }
    );
  }

  fetchCryptoPrice(ticker: string): void {
    const apiKey = 'LKC46N6I7I4YJSC5';

    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${ticker}&to_currency=USD&apikey=${apiKey}`;
  
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Crypto Price Response:', response);
        this.cryptopriceresponse = response;
        this.buyStocks("crypto");
      },
      error => {
        console.error('Error fetching crypto price:', error);
      }
    );
  }
  

  calculate(numStocks: number,value:string): void {
    this.calculateAlertcryptoVisible=false
    this.calculateAlertVisible=false

 if(value=="stocks"){    console.log('Number of stocks to calculate:', numStocks * this.stockPriceResponse.price);
 this.calculatenum=numStocks * this.stockPriceResponse.price;
 this.calculateAlertVisible=true
}
else if(value=="crypto"){
  this.calculatecrypto=numStocks * this.cryptopriceresponse['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  this.calculateAlertcryptoVisible=true
  
  

}



   

  }

  moneyinthispot(id: number,value:string){

    if(value=="stocks"){  
    this.pensionPotService.getPensionPotById(id).subscribe(
      (response) => {
       this.balance=response.totalAmount;
       this.pensionpotbalance=true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  else if(value=="crypto"){
    this.pensionPotService.getPensionPotById(id).subscribe(
      (response) => {
       this.balance=response.totalAmount;
       this.pensionpotcryptobalance=true;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  
  }
  


  viewPastPerformance(): void {
    const apiKey = '7S63PNOP6UIA9XPR';
    const pastPerformanceUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${this.selectedCompany}&apikey=${apiKey}`;
    this.http.get(pastPerformanceUrl).subscribe(
      (response: any) => {
        console.log('Past Performance Response:', response);
        
        const dates: string[] = [];
        const highs: number[] = [];
        let count = 0;
        for (const date in response['Monthly Time Series']) {
          if (count >= 25) {
            break;
          }
          const data = response['Monthly Time Series'][date];
          dates.push(date);
          highs.push(parseFloat(data['2. high']));
          count++;
        }
        
        console.log('Dates:', dates);
        console.log('Highs:', highs);

        const majorChanges = this.findMajorChanges(dates, highs);
        console.log('Major Changes:', majorChanges);

     
        
        
        this.performanceChartOptions = {
          series: [{
            name: 'High',
            data: highs
          }],
          chart: {
            fontFamily: 'Rubik,sans-serif',
            height: 265,
            type: 'bar',
            toolbar: {
              show: false
            },
            stacked: false,
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
          },
          plotOptions: {
            bar: {
              columnWidth: '20%',
              barHeight: '70%',
              borderRadius: 3,
            },
          },
          colors: ["#0d6efd", "#009efb", "#6771dc"],
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          grid: {
            strokeDashArray: 3,
          },
          markers: {
            size: 3
          },
          xaxis: {
            categories: dates,
          },
          tooltip: {
            theme: 'dark'
          }
        };
      },
      error => {
        console.error('Error fetching past performance:', error);
      }
    );
  }
  viewPastCrptoPerformance(): void {
    const apiKey = 'T7EJPUVRXSUFINCG';
    const pastPerformanceUrl = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${this.selectedCrypto}&market=EUR&apikey=${apiKey}`;
    this.http.get(pastPerformanceUrl).subscribe(
      (response: any) => {
        console.log('Past Performance Response:', response);
        
        const dates: string[] = [];
        const highs: number[] = [];
        let count = 0;
        for (const date in response['Time Series (Digital Currency Monthly)']) {
          if (count >= 25) {
            break;
          }
          const data = response['Time Series (Digital Currency Monthly)'][date];
          dates.push(date);
          highs.push(parseFloat(data['2. high']));
          count++;
        }
        
        console.log('Dates:', dates);
        console.log('Highs:', highs);

        const majorChanges = this.findMajorcryptoChanges(dates, highs);
        console.log('Major Changes:', majorChanges);

     
        
        
        this.performanceCryptoChartOptions = {
          series: [{
            name: 'High',
            data: highs
          }],
          chart: {
            fontFamily: 'Rubik,sans-serif',
            height: 265,
            type: 'bar',
            toolbar: {
              show: false
            },
            stacked: false,
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
          },
          plotOptions: {
            bar: {
              columnWidth: '20%',
              barHeight: '70%',
              borderRadius: 3,
            },
          },
          colors: ["#0d6efd", "#009efb", "#6771dc"],
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          grid: {
            strokeDashArray: 3,
          },
          markers: {
            size: 3
          },
          xaxis: {
            categories: dates,
          },
          tooltip: {
            theme: 'dark'
          }
        };
      },
      error => {
        console.error('Error fetching past performance:', error);
      }
    );
  }


  findMajorChanges(dates: string[], highs: number[]): { date: string, change: string, changeAmount: number }[] {
    this.changes.length=0;
    this.maxChanges.length = 0




    for (let i = 0; i < highs.length - 1; i++) {
        const diff = highs[i] - highs[i + 1];
        if (diff > 0) {
            const change = { date: dates[i], change: 'Major rise', changeAmount: diff };
            this.changes.push(change);
            if (!this.maxRise || diff > this.maxRise.changeAmount) {
                this.maxRise = change;
            }
        } else if (diff < 0) {
            const change = { date: dates[i], change: 'Major dip', changeAmount: Math.abs(diff) };
            this.changes.push(change);
            if (!this.maxDip || Math.abs(diff) > this.maxDip.changeAmount) {
                this.maxDip = change;
            }
        }
    }
    if (this.maxDip ) {
      this.maxChanges.push(this.maxDip);
  }
  if (this.maxRise) {
    this.maxChanges.push(this.maxRise);
}

  

    console.log('Max Dip:', this.maxDip);
    console.log('Max Rise:', this.maxRise);

    return this.changes;
}
findMajorcryptoChanges(dates: string[], highs: number[]): { date: string, change: string, changeAmount: number }[] {
  var changes: { date: string, change: string, changeAmount: number }[] = [];
 var maxDip: { date: string, change: string, changeAmount: number } | null = null;
  var maxRise: { date: string, change: string, changeAmount: number } | null = null;
  changes.length=0;
  this.crymaxChanges.length = 0




  for (let i = 0; i < highs.length - 1; i++) {
      const diff = highs[i] - highs[i + 1];
      if (diff > 0) {
          const change = { date: dates[i], change: 'Major rise', changeAmount: diff };
          this.changes.push(change);
          if (!maxRise || diff > maxRise.changeAmount) {
              maxRise = change;
          }
      } else if (diff < 0) {
          const change = { date: dates[i], change: 'Major dip', changeAmount: Math.abs(diff) };
          this.changes.push(change);
          if (!maxDip || Math.abs(diff) > maxDip.changeAmount) {
              maxDip = change;
          }
      }
  }
  if (maxDip ) {
    this.crymaxChanges.push(maxDip);
}
if (maxRise) {
  this.crymaxChanges.push(maxRise);
}



  console.log('Max Dip:', this.maxDip);
  console.log('Max Rise:', this.maxRise);

  return changes;
}

buyStocks(value:string): void {
  this.pensionPotService.getPensionPotsByUserId(StoreService.getUserData().userId).subscribe(
    (response: any) => {
      this.pensionPots = response;
      console.log('Pension pots:', this.pensionPots);
      this.pensionPotsWithMoreThan100Pounds = this.pensionPots.filter(pot => pot.totalAmount > 100);
      console.log(this.pensionPotsWithMoreThan100Pounds);
      if (this.pensionPotsWithMoreThan100Pounds.length > 0) {
        if(value=="stocks"){
          this.showform = true;
        }
        else if(value=="crypto"){
          this.showcryptoform=true;

        }
        
        console.log('At least one pension pot has more than 100 pounds.');
      } else {
        console.log('No pension pot has more than 100 pounds.');
      }
    },
    (error) => {
      console.error('Error fetching pension pots:', error);
    }
  );
}
confirmPurchase(value:string): void {
  if (this.formGroup.valid && this.stockPriceResponse) {
    const numberOfStocks = this.formGroup.get('numberOfStocks')?.value;
    const selectedPensionPot = this.formGroup.get('selectedPensionPot')?.value;

      const investment: Investment = {
        investmentType: InvestmentType.STOCKS,
        symbol: this.selectedCompany || '',
        name: this.stockPriceResponse.name,
        quantity: numberOfStocks,
        purchasePrice: this.stockPriceResponse.price,
        purchaseDate: new Date(),
        currentPrice: this.stockPriceResponse.price,
        marketValue: numberOfStocks * this.stockPriceResponse.price,
        investmentDate: new Date(),
        investmentStatus: '',
        userId:StoreService.getUserData().userId
      };
  
      const definedContribution: DefinedContribution = {
        name: 'Mega Savings',
        minContribution: 100,
        startDate: new Date(),
        endDate: "",
        planStatus: 'ACTIVE',
        pensionPotId: selectedPensionPot,
        currentContributedAmount: this.stockPriceResponse.price * numberOfStocks,
        investmentOptions: investment
      };
      console.log(`Buying ${numberOfStocks} stocks from pension pot ${selectedPensionPot}`);
      console.log('Investment:', investment);
      console.log('Defined Contribution:', definedContribution);
  
      this.definedContributionService.createDefinedContribution(definedContribution).subscribe(
        (response) => {
  this.apisuccessful=true;

        },
        (error) => {
          console.error('Error creating Defined Contribution:', error);
        }
      );
    

    }
    else {
      console.error('Form is invalid or stock price data is missing. Please fill out all required fields and try again.');
    }
 


}
confirmcryptoPurchase(value:string): void {
  if (this.formCryptoGroup.valid && this.cryptopriceresponse) {
    const numberOfCrypto = this.formCryptoGroup.get('numberOfCrypto')?.value;
    const selectedPensionPot = this.formCryptoGroup.get('selectedPensionPott')?.value;
   console.log(this.cryptopriceresponse.price)
      const investment: Investment = {
        investmentType: InvestmentType.CRYPTO,
        symbol: this.selectedCrypto || '',
        name: this.cryptopriceresponse['Realtime Currency Exchange Rate']['2. From_Currency Name'],
        quantity: numberOfCrypto,
        purchasePrice: this.cryptopriceresponse['Realtime Currency Exchange Rate']['5. Exchange Rate'],
        purchaseDate: new Date(),
        currentPrice: this.cryptopriceresponse['Realtime Currency Exchange Rate']['5. Exchange Rate'],
        marketValue: numberOfCrypto * this.cryptopriceresponse['Realtime Currency Exchange Rate']['5. Exchange Rate'],
        investmentDate: new Date(),
        investmentStatus: '',
        userId:StoreService.getUserData().userId
      };
  
      const definedContribution: DefinedContribution = {
        name: 'Mega Savings',
        minContribution: 100,
        startDate: new Date(),
        endDate: "",
        planStatus: 'ACTIVE',
        pensionPotId: selectedPensionPot,
        currentContributedAmount: this.cryptopriceresponse['Realtime Currency Exchange Rate']['5. Exchange Rate'] * numberOfCrypto,
        investmentOptions: investment
      };
      console.log(`Buying ${numberOfCrypto} stocks from pension pot ${selectedPensionPot}`);
      console.log('Investment:', investment);
      console.log('Defined Contribution:', definedContribution);
  
      this.definedContributionService.createDefinedContribution(definedContribution).subscribe(
        (response) => {
          this.apicryptosuccessful=true
        },
        (error) => {
          console.error('Error creating Defined Contribution:', error);
        }
      );
    

    }
    else {
      console.error('Form is invalid or stock price data is missing. Please fill out all required fields and try again.');
    }
 


}
}













