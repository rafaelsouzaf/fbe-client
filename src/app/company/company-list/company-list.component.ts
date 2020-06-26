import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private companyService: CompanyService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.companyService.getAll().subscribe(result => {
            // @ts-ignore
            this.dataSource = new MatTableDataSource(result.data);
            this.dataSource.sort = this.sort;
        });
    }

    delete(id: number) {
        this.companyService.delete(id).subscribe(
            result => {
                this.getAll();
                this.dialog.open(DialogComponent, {
                    data: {
                        title: 'Success',
                        message: 'Content was deleted!'
                    }
                });
            },
            error => {
                this.dialog.open(DialogComponent, {
                    data: {
                        title: 'Error',
                        message: error.error.error.message
                    }
                });
            }
        );
    }
}
