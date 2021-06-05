import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {IUser} from '../app/shared/interface/user-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm: string;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;
  title = 'table-search';
  allData;
   userArray:IUser[]= [];
  constructor(private http:HttpClient){
    this.http.get('assets/data.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split(",");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split("-");
              this.userArray.push({id:Number(row[0].trim()),countryName: row[1].trim() });
            }
            this.allData=this.userArray
            this.collectionSize = this.userArray.length;
        },
        error => {
            console.log(error);
        }
    );
   
  }
  search(value: string): void {
    this.userArray = this.allData.filter((val) => val.countryName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.collectionSize = this.userArray.length;
  }
}
