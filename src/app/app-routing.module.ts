import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'company', component: CompanyListComponent },
    { path: 'company/edit/:id', component: CompanyEditComponent },
    { path: 'company/add', component: CompanyAddComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
