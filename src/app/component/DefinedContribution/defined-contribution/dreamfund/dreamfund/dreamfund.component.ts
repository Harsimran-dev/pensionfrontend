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
import { currencies } from 'src/app/models/Currency';
import { commodities } from 'src/app/models/Commodities';

@Component({
  selector: 'app-dreamfund',
  templateUrl: './dreamfund.component.html',
  styleUrls: ['./dreamfund.component.scss']
})
export class DreamfundComponent {

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
  success: boolean | null = null;
  errorMessage: string | null = null;
  rsi!:number;

  active = 1;
  megasavingData: any;
  companies = currencies;
  crypto=commodities;
  selectedForex: string | undefined;
  selectedCrypto: string | undefined;
  apiKey = 'CkELqidkaK5GT0ksCGPUfGRqhCU6s3jmc7ddoiVC';
  private apiUrl = 'https://v6.exchangerate-api.com/v6/423e7b63748cf387b34dddd6/pair/';
  cryptoUrl = 'https://api.api-ninjas.com/v1/commodityprice';
  forexPriceResponse: any;
  cryptopriceresponse:any;
  pensionPots: any[] = [];
  showform:boolean=false;
  showcryptoform:boolean=false;
  pensionPotsWithMoreThan100Pounds: any[] = [];
  formGroup!: FormGroup;
  formCryptoGroup!: FormGroup;
  GBP="GBP"
  balance:any;
  pensionpotbalance:boolean=false;
  pensionpotcryptobalance:boolean=false;
  apisuccessful:boolean=false;
  apicryptosuccessful:boolean=false;

  calculateAlertVisible:boolean=false;
  calculateAlertcryptoVisible:boolean=false;
  calculatenum:any;
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
    
      numberOfCurrency: [null, Validators.required],
      selectedPensionPot: [null, Validators.required]
    });
    this.formCryptoGroup = this.formBuilder.group({
    
      numberOfCommodities: [null, Validators.required],
      selectedPensionPott: [null, Validators.required]
    });
  }

  onCompanySelect(ticker: string): void {
    this.selectedForex = ticker;
    this.fetchExchangeRate(ticker);
  }

  onCommoditySelect(ticker: string): void {
    this.selectedForex = ticker;
    this.fetchCommodityPrice(ticker);
 
  }

  fetchExchangeRate( targetCurrency: string): void {
    const url = `${this.apiUrl}${targetCurrency}/${this.GBP}`;
    const headers = new HttpHeaders({
      'X-Api-Key': '423e7b63748cf387b34dddd6'
    });

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        console.log('Exchange Rate Response:', response);
        this.forexPriceResponse = response;
        this.buy("stocks");
        
      },
      error => {
        console.error('Error fetching exchange rate:', error);
      }
    );
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

  fetchCommodityPrice(ticker: string): void {
    const url = `${this.cryptoUrl}?name=${ticker}`;
    
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        console.log('Stock Price Response:', response);
        this.cryptopriceresponse = response;
        this.buy("crypto");
 
        
  
      },
      error => {
        console.error('Error fetching stock price:', error);
      }
    );
  }

  calculate(numStocks: number,value:string): void {
    this.calculateAlertcryptoVisible=false
    this.calculateAlertVisible=false

 if(value=="stocks"){    console.log('Number of stocks to calculate:', numStocks * this.forexPriceResponse.conversion_rate);
 this.calculatenum=numStocks * this.forexPriceResponse.conversion_rate;
 this.calculateAlertVisible=true
}
else if(value=="crypto"){
  this.calculatecrypto=numStocks * this.cryptopriceresponse.price;
  this.calculateAlertcryptoVisible=true
  
  

}


   

  }


  viewPastPerformance(): void {
    const apiKey = 'LKC46N6I7I4YJSC5';
    const pastPerformanceUrl = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=GBP&to_symbol=${this.selectedForex}&apikey=${apiKey}`;
    
    this.http.get(pastPerformanceUrl).subscribe(
      (response: any) => {
        console.log('Past Performance Response:', response);
        
        const timeSeries = response['Time Series FX (Monthly)'];
        const dates: string[] = [];
        const highs: number[] = [];
        let count = 0;
        
        for (const date in timeSeries) {
          if (count >= 35) {
            break;
          }
          if (timeSeries.hasOwnProperty(date)) {
            const data = timeSeries[date];
            dates.push(date);
            highs.push(parseFloat(data['2. high']));
            count++;
          }
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


buy(value:string): void {
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
  if (this.formGroup.valid && this.forexPriceResponse) {
    const numberOfCurrency = this.formGroup.get('numberOfCurrency')?.value;
    const selectedPensionPot = this.formGroup.get('selectedPensionPot')?.value;

      const investment: Investment = {
        investmentType: InvestmentType.FOREX,
        symbol: this.selectedForex || '',
        name: this.forexPriceResponse.name,
        quantity: numberOfCurrency,
        purchasePrice: this.forexPriceResponse.conversion_rate,
        purchaseDate: new Date(),
        currentPrice: this.forexPriceResponse.conversion_rate,
        marketValue: numberOfCurrency * this.forexPriceResponse.conversion_rate,
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
        currentContributedAmount: this.forexPriceResponse.conversion_rate * numberOfCurrency,
        investmentOptions: investment
      };
      console.log(`Buying ${numberOfCurrency} stocks from pension pot ${selectedPensionPot}`);
      console.log('Investment:', investment);
      console.log('Defined Contribution:', definedContribution);
  
      this.definedContributionService.createDefinedContribution(definedContribution).subscribe(
        (response) => {
          console.log('Created Defined Contribution:', response);
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
confirmcommodityPurchase(value: string): void {
  if (this.formCryptoGroup.valid && this.cryptopriceresponse) {
    const numberOfCommodities = this.formCryptoGroup.get('numberOfCommodities')?.value;
    const selectedPensionPot = this.formCryptoGroup.get('selectedPensionPott')?.value;

    const investment: Investment = {
      investmentType: InvestmentType.COMMODITIES,
      symbol: this.selectedCrypto || '',
      name: this.cryptopriceresponse.name,
      quantity: numberOfCommodities,
      purchasePrice: this.cryptopriceresponse.price,
      purchaseDate: new Date(),
      currentPrice: this.cryptopriceresponse.price,
      marketValue: numberOfCommodities * this.cryptopriceresponse.price,
      investmentDate: new Date(),
      investmentStatus: '',
      userId: StoreService.getUserData().userId
    };

    const definedContribution: DefinedContribution = {
      name: 'Mega Savings',
      minContribution: 100,
      startDate: new Date(),
      endDate: "",
      planStatus: 'ACTIVE',
      pensionPotId: selectedPensionPot,
      currentContributedAmount: this.cryptopriceresponse.price * numberOfCommodities,
      investmentOptions: investment
    };

    this.definedContributionService.createDefinedContribution(definedContribution).subscribe(
      (response) => {
        console.log('Created Defined Contribution:', response);
        this.apicryptosuccessful=true
      },
      (error) => {
      
      }
    );

  } else {
    console.error('Form is invalid or stock price data is missing. Please fill out all required fields and try again.');
  }
}



}


