import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  path:string[]=[];

  constructor(private router: Router){}

  ngOnInit() {
    console.log('app component');
    this.path = this.router.url.split('/');
  }

}


