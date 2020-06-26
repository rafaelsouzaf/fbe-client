import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { Company } from '../../company/company';
import { CompanyService } from '../../company/company.service';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
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
            id: new FormControl(0, Validators.required),
            name: new FormControl({ value: '' }, Validators.required),
            surname: new FormControl({ value: '' }, Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl({ value: '' }),
            salary: new FormControl({ value: 0 }, Validators.required),
            company: new FormControl({ value: '' }, Validators.required),
            createdAt: new FormControl(
                { value: '', disabled: true },
                Validators.required
            )
        });

        const id: string = this.route.snapshot.paramMap.get('id');
        this.companyService.getAll().subscribe(result => {
            // @ts-ignore
            this.companyList = result.data;
        });
        this.employeeService.getById(id).subscribe(result => {
            // @ts-ignore
            const employee: Employee = result.data;
            this.form.setValue(employee);
            this.form.controls.company.setValue(employee.company.id, {
                onlySelf: true
            });
        });
    }

    onSubmit() {
        const employee = this.form.value;
        employee.company = {
            id: employee.company
        };
        this.employeeService.update(this.form.value.id, employee).subscribe(
            result => {
                this.router.navigate(['employee']);
                this.dialog.open(DialogComponent, {
                    data: {
                        title: 'Success',
                        message: 'Content was updated!'
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
