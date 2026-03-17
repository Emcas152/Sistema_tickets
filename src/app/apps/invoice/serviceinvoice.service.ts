import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { InvoiceList } from './invoice';
import { invoceLists } from './invoice-data';

@Injectable({
    providedIn: 'root'
})
export class ServiceinvoiceService {

    private invoiceList: InvoiceList[] = [];

    private getInvoice() {
        return from(invoceLists);
    }

    constructor() {
        this.getInvoice().subscribe((data) =>
            this.invoiceList.push(data)
        );
    }



    public getInvoiceList() {
        return this.invoiceList;
    }
    public deleteInvoice(id: number) {
        this.invoiceList = this.invoiceList.filter(CId => CId.id !== id);
    }
    public addInvoice(invoice: InvoiceList) {
        this.invoiceList.splice(0,0,invoice);
    }
    public updateInvoice(id: number, invoice: InvoiceList) {
        let element = this.invoiceList.filter(x => x.id === id);
        let index:number = this.invoiceList.indexOf(element[0]);
        this.invoiceList[index] = invoice;
    }
}
