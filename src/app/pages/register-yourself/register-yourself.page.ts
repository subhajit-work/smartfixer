import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-yourself',
  templateUrl: './register-yourself.page.html',
  styleUrls: ['./register-yourself.page.scss'],
})
export class RegisterYourselfPage implements OnInit {
  panelOpenState = false;
  // tests=[
  //   {
  //     step:"step1",
  //     name:"red"
  //   },
  //   {
  //     step:"step2",
  //     name:"green"
  //   },
  //   {
  //     step:"step1",
  //     name:"red"
  //   },
  //   {
  //     step:"step2",
  //     name:"green"
  //   },
  //   {
  //     step:"step1",
  //       name:"red"
  //   },
  //   {
  //     step:"step2",
  //     name:"green"
  //   }
  // ]
  constructor() { }
  
  ngOnInit() {
  }

}
