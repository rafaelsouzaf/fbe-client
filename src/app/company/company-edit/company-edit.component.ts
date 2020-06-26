import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../util/Error';

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
        private router: Router
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
            .pipe(catchError(handleError))
            .subscribe(result => {
                alert('Content was updated!');
                this.router.navigate(['company']);
            });
    }
}
