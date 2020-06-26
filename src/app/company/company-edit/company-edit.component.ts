import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../util/dialog/dialog.component';

@Component({
    selector: 'app-company-edit',
    templateUrl: './company-edit.component.html',
    styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
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
            id: new FormControl(0, Validators.required),
            name: new FormControl({ value: '' }, Validators.required),
            createdAt: new FormControl(
                { value: '', disabled: true },
                Validators.required
            )
        });

        const id: string = this.route.snapshot.paramMap.get('id');
        this.companyService.getById(id).subscribe(result => {
            // @ts-ignore
            this.form.setValue(result.data);
        });
    }

    onSubmit() {
        this.companyService
            .update(this.form.value.id, this.form.value)
            .subscribe(
                result => {
                    this.router.navigate(['company']);
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
