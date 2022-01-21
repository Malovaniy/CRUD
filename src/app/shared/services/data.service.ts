import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }


  createDb() {
    return {
      owners: [
        {
          id: 1,
          name: 'Ira',
          lname: 'Lisova',
          sname: 'Ivanova',
          cars: [{
            brand: 'BMW',
            number: "ВС5515АМ",
            model: "X5",
            year: 2005
          }]
        },
      ]
    };
  }
}
