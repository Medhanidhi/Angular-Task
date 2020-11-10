import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {

  addDetailsForm: FormGroup;
  eventImageChanged: boolean = false;
  eventImageSrc: string = '';
  image: string;

  constructor( private fb: FormBuilder,public dialogRef: MatDialogRef<AddnewComponent>,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.addDetailsForm = this.fb.group({
      email: [''],
      fullName: [''],
      dateofJoining: [''],
      dateofLeaving: [''],
      check: [false],
      image:[''],
    });

  }

  save() {
    this.dialogRef.close(this.addDetailsForm.value);
    console.log(this.addDetailsForm.value);
  }


  // Function when Event Image is uploaded..
  eventImageUpload(event) {
    if (event.target.files[0].size <= 4194304) {
      let reader = new FileReader();
      console.dir(event);
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.addDetailsForm.get('image').setValue(reader.result.split(',')[1]);
          this.eventImageChanged = true;
          console.log(this.eventImageChanged);
          this.eventImageSrc = reader.result.split(',')[1];
        }
      }
    }
  }

}
