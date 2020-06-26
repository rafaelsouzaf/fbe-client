import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiServer = 'http://localhost:8081';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(this.apiServer + '/company');
    }

    getById(id): Observable<Company> {
        return this.httpClient.get<Company>(this.apiServer + '/company/' + id);
    }

    update(id, company): Observable<Company> {
        return this.httpClient.put<Company>(
            this.apiServer + '/company',
            company,
            this.httpOptions
        );
    }

    create(company): Observable<Company> {
        return this.httpClient.post<Company>(
            this.apiServer + '/company',
            company,
            this.httpOptions
        );
    }

    delete(id) {
        return this.httpClient.delete<Company>(
            this.apiServer + '/company/' + id,
            this.httpOptions
        );
    }
}
