import { SpinnerService } from './shared/service/spinner.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  getLoader!: boolean;

  title = 'routing04';

  constructor(private _http: SpinnerService) {}

  ngOnInit(): void {
    this._http.loaderSub$.subscribe({
      next: (res) => {
        this.getLoader = res;
      },
    });
  }
}
