import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  parts = [
    {
      id: 'd69ac579-276a-454c-9cca-b90dadc206a5',
      group: 'home',
      type: 'app-content-part',
      index: 0,
      state: `{
        "content": "<h1>Title</h1>"
      }`
    },
    {
      id: 'b58263f1-4b8e-466b-b701-76d6d284f914',
      group: 'home',
      type: 'app-iframe-part',
      index: 0,
      state: `{
        "src": "https://www.youtube.com/embed/TcMBFSGVi1c"
      }`
    }
  ];
}
