import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionService {
  //Move to env file
  private API_URL = 'http://localhost:8080/';

  constructor(protected http: HttpClient) {}

  getAllConsumptions() {
    return this.http.get(`${this.API_URL}consumption`);
  }

  deleteConsumption(id) {
    return this.http.delete(`${this.API_URL}consumption/${id}`);
  }

  updateConsumption(consumption) {
    return this.http.put(
      `${this.API_URL}consumption/${consumption.id}`,
      consumption
    );
  }

  insertConsumption(consumption) {
    return this.http.post(`${this.API_URL}consumption`, consumption);
  }
}
