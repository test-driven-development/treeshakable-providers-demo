import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../entities/flight';
import { AbstractFlightService } from './abstract-flight.service';

@Injectable()
export class AdvancedFlightService implements AbstractFlightService {

    flights: Flight[] = [];

    constructor(private http: HttpClient) { 
        console.debug('Advanced FlightService');
        console.debug('http', http);
    }

    load(from: string, to: string): void {
        this.find(from, to).subscribe(
            flights => { this.flights = flights; },
            err => { console.error('Error loading flights', err ); }
        )
    }

    find(from: string, to: string): Observable<Flight[]> {
        let url = 'http://www.angular.at/api/flight';
        let params = { from, to };
        let headers = { accept: 'application/json'};
        return this.http.get<Flight[]>(url, { params, headers });
    } 

}
