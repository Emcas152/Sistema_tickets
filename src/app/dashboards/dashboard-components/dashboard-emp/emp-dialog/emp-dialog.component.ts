import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {Employee} from '../dashboard-emp.component';

@Component({
  selector: 'app-emp-dialog',
  templateUrl: './emp-dialog.component.html',
  styleUrls: ['./emp-dialog.component.scss']
})
export class EmpDialogComponent  {
  action: string;
  local_data: any;
  selectedImage:any='';
  joiningDate:any=''

  constructor(public datePipe:DatePipe,
      public dialogRef: MatDialogRef<any>,
      // @Optional() is used to prevent error if no data is passed
       @Inject(MAT_DIALOG_DATA) public data: Employee) {

          debugger;
      //  console.log(data);
      this.local_data = { ...data };
      this.action = this.local_data.action;

      if(this.local_data.DateOfJoining !== undefined){
          this.joiningDate = this.datePipe.
          transform(new Date(this.local_data.DateOfJoining), 'yyyy-MM-dd');
          // this.local_data.DateOfJoining=this.local_data.DateOfJoining.t 
      }

      if(this.local_data.imagePath===undefined){
          this.local_data.imagePath='assets/images/users/default.png'
      }
  }

  doAction() {
      this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any) {
      debugger;
      if (!event.target.files[0] || event.target.files[0].length == 0) {
          //this.msg = 'You must select an image';
          return;
      }
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
          //this.msg = "Only images are supported";
          return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
          this.local_data.imagePath=reader.result;
      }
  }

}
