import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiServer = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.apiServer + '/employee');
    }

    getById(id): Observable<Employee> {
        return this.httpClient.get<Employee>(
            this.apiServer + '/employee/' + id
        );
    }

    update(id, employee): Observable<Employee> {
        return this.httpClient.put<Employee>(
            this.apiServer + '/employee',
            employee,
            this.httpOptions
        );
    }

    create(employee): Observable<Employee> {
        return this.httpClient.post<Employee>(
            this.apiServer + '/employee',
            employee,
            this.httpOptions
        );
    }

    delete(id) {
        return this.httpClient.delete<Employee>(
            this.apiServer + '/employee/' + id,
            this.httpOptions
        );
    }
}
