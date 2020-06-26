import { Company } from '../company/company';

export interface Employee {
    id: number;
    name: string;
    surname: string;
    email: string;
    address: string;
    salary: number;
    createdAt: Date;
    company: Company;
}
