import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    totalCompanies: number;
    totalEmployees: number;
    displayedColumns: string[] = ['name', 'avgSalary'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private companyService: CompanyService,
        private employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
        this.companyService.count().subscribe((result) => {
            // @ts-ignore
            this.totalCompanies = result.data;
        });
        this.employeeService.count().subscribe((result) => {
            // @ts-ignore
            this.totalEmployees = result.data;
        });
        this.companyService.getAllWithAvgSalary().subscribe((result) => {
            // @ts-ignore
            this.dataSource = new MatTableDataSource(result.data);
            this.dataSource.sort = this.sort;
        });
    }
}
