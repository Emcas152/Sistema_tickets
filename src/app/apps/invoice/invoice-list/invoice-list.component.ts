import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ServiceinvoiceService } from '../serviceinvoice.service';
import { InvoiceList } from '../invoice';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements AfterViewInit {

  invoiceList: MatTableDataSource<InvoiceList>;
  displayedColumns: string[] = ['chk', 'id', 'billFrom', 'billTo', 'totalCost', 'status', 'action'];


  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(private invoiceService: ServiceinvoiceService) {
    let invoiceListData = this.invoiceService.getInvoiceList();
    this.invoiceList = new MatTableDataSource(invoiceListData);
  }

  ngAfterViewInit() {
    this.invoiceList.paginator = this.paginator;
    this.invoiceList.sort = this.sort;
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.invoiceList != null && this.invoiceList.data.every(t => t.completed);
  }
  someComplete() {
    return this.invoiceList.data.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    this.invoiceList.data.forEach(t => t.completed = completed);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filter(filterValue: string) {
    this.invoiceList.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  deleteInvoice(row: number) {

    if (confirm('Are you sure you want to delete this record ?')) {
      this.invoiceService.deleteInvoice(row);
      this.invoiceList.data = this.invoiceList.data.filter(invoice => invoice.id !== row);
    }
  }

}
