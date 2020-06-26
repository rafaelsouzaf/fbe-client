import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CompanyListComponent,
        CompanyAddComponent,
        CompanyEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
