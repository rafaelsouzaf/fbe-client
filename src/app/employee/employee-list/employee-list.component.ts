import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'name',
        'salary',
        'company',
        'createdAt',
        'actions'
    ];
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private employeeService: EmployeeService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.employeeService.getAll().subscribe(result => {
            // @ts-ignore
            this.dataSource = new MatTableDataSource(result.data);
            this.dataSource.sortingDataAccessor = (
                item: Employee,
                property
            ) => {
                switch (property) {
                    case 'company':
                        return item.company.name;
                    default:
                        return item[property];
                }
            };
            this.dataSource.sort = this.sort;
        });
    }

    delete(id: number) {
        this.employeeService.delete(id).subscribe(
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
