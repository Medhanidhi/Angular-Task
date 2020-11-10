import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddnewComponent} from "../addnew/addnew.component";
import {MatSnackBar} from "@angular/material/snack-bar";

const empDetails: any = [];

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {

  private CurrentEmpls: any;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEmps();
  }

  getEmps(): void{
    this.CurrentEmpls = empDetails
  }


  getEmpExp(joiningDate,leavingDate, stillWorking){
    if(!stillWorking){
      return this.convertMS(leavingDate.getTime()/1000 - joiningDate.getTime()/1000)
    }
    return this.convertMS(new Date().getTime()/1000- joiningDate.getTime()/1000)
  }

  convertMS( seconds ) {
    let days = seconds/(86400)
    let day = days%365.24
    return Math.floor(day/365.24)+' years '+ Math.floor((day/30.4167)) + ' months'
  }

  addNew(){
    const dialogRef = this.dialog.open(AddnewComponent, {
      width: '500px',
      height: '100%',
      data: []
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.CurrentEmpls.push(data);
        this.openSnackBar('Successfully Added', 'Ok')
      }

    });
  }

  deleteEmp(index: number){
    if(confirm("Are you sure want to delete?")){
      this.CurrentEmpls.splice(index,1);
      console.log(index);
      this.openSnackBar('Deleted Successfully', 'Ok')
    }
  }

  getImageUrl(imageBinary){
    let imageBase64String= btoa(imageBinary);
    return 'data:image/jpeg;base64,' + imageBase64String;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
