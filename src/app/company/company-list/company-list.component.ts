import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../util/Error';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort;

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
                this.dataSource = new MatTableDataSource(result.data);
                this.dataSource.sort = this.sort;
            });
    }

    delete(id: number) {
        this.companyService
            .delete(id)
            .pipe(catchError(handleError))
            .subscribe(result => {
                alert('Content was deleted!');
                this.getAll();
            });
    }
}
