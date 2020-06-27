export interface Company {
    id: number;
    name: string;
    createdAt: Date;
}

export interface CompanyWithAvgSalary extends Company {
    avgSalary: number;
}
