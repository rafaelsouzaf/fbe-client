import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-company-add',
    templateUrl: '../company-edit/company-edit.component.html',
    styleUrls: ['../company-edit/company-edit.component.css']
})
export class CompanyAddComponent implements OnInit {
    id: number;
    form: FormGroup;

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            id: new FormControl(0),
            name: new FormControl({ value: '' }, Validators.required),
            createdAt: new FormControl(
                { value: '', disabled: true },
                Validators.required
            )
        });
        this.form.setValue({ id: null, name: null, createdAt: null });
    }

    onSubmit() {
        this.companyService.create(this.form.value).subscribe(
            result => {
                this.router.navigate(['company']);
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
