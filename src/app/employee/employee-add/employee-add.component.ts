import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Company } from '../../company/company';
import { CompanyService } from '../../company/company.service';
import { DialogComponent } from '../../util/dialog/dialog.component';

@Component({
    selector: 'app-employee-add',
    templateUrl: '../employee-edit/employee-edit.component.html',
    styleUrls: ['../employee-edit/employee-edit.component.css']
})
export class EmployeeAddComponent implements OnInit {
    id: number;
    form: FormGroup;
    companyList: Company[];

    constructor(
        private employeeService: EmployeeService,
        private companyService: CompanyService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            id: new FormControl(0),
            name: new FormControl({ value: '' }, Validators.required),
            surname: new FormControl({ value: '' }, Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl({ value: '' }),
            salary: new FormControl({ value: 0 }, [Validators.required, Validators.min(0)]),
            company: new FormControl({ value: '' }, Validators.required),
            createdAt: new FormControl(
                { value: '', disabled: true },
                Validators.required
            )
        });
        this.form.setValue({
            id: null,
            name: null,
            surname: null,
            email: null,
            address: null,
            salary: null,
            company: null,
            createdAt: null
        });

        this.companyService.getAll().subscribe(result => {
            // @ts-ignore
            this.companyList = result.data;
        });
    }

    onSubmit() {
        const employee = this.form.value;
        employee.company = {
            id: employee.company
        };
        this.employeeService.create(employee).subscribe(
            result => {
                this.router.navigate(['employee']);
                this.dialog.open(DialogComponent, {
                    data: {
                        title: 'Success',
                        message: 'Content was created!'
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
