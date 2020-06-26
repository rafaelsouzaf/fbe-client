import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../util/Error';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
    companyList: Company[];

    constructor(private companyService: CompanyService) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.companyService
            .getAll()
            .pipe(catchError(handleError))
            .subscribe(result => {
                // @ts-ignore
                this.companyList = result.data;
            });
    }

    delete(id: number) {
        this.companyService
            .delete(id)
            .pipe(catchError(handleError))
            .subscribe(result => {
                alert('Content was deleted!');
                console.log(result);
                this.getAll();
            });
    }
}
