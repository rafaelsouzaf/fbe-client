import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CompanyWithAvgSalary } from './company';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    private apiServer = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(this.apiServer + '/company');
    }

    getAllWithAvgSalary(): Observable<CompanyWithAvgSalary[]> {
        return this.httpClient.get<CompanyWithAvgSalary[]>(
            this.apiServer + '/company/with-avg-salary'
        );
    }

    count(): Observable<number> {
        return this.httpClient.get<number>(this.apiServer + '/company/count');
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
