import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../util/Error';

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
        private router: Router
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
        this.companyService
            .create(this.form.value)
            .pipe(catchError(handleError))
            .subscribe(result => {
                alert('Content was created!');
                console.log(result);
                this.router.navigate(['company']);
            });
    }
}
