import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { Router } from '@angular/router';

export interface ContactData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
/* Table variables */
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'actions'];
  dataSource: MatTableDataSource<ContactData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    /* Getting some data from a JSON file to populate the table */
    this.httpClient.get('./assets/CONTACT_DATA.json').subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  /* Logout Method */
  onLogout() {
    sessionStorage.removeItem('user-data')
    this.router.navigate(['/login'])
  }

  /* On Add click event - opens AddEditContactComponent popup */
  onAdd() {
    const dialogRef = this.dialog.open(AddEditContactComponent, {
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.unshift(result)
        this.refresh()
      }
    })
  }

  /* On Edit click event - opens AddEditContactComponent popup */
  editContact(item) {
    const dialogRef = this.dialog.open(AddEditContactComponent, {
      disableClose: true,
      data: item
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data[this.dataSource.data.indexOf(item)] = result
        this.refresh()
      }
    })
  }

  /* Small secret to refresh a table in Angular 9 */
  refresh(): void {
    this.dataSource.data = this.dataSource.data;
  }

  /* Delete a contact from table */
  deleteContact(item) {
    this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);
    this.refresh()
  }

  /* Filter for search */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
