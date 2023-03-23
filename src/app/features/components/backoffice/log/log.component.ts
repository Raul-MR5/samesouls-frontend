import { Component, OnInit } from '@angular/core';
import { LogService } from '@app/features/components/backoffice/log/log.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  rawlist;

  editorOptions = {
    theme: 'log-dark',
    language: 'log',
    automaticLayout: true,
  };

  constructor(private logService: LogService, private translateSrv: TranslateService) {
    this.translateSrv.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.getLogData();
  }

  getLogData() {
    this.rawlist = '';
    this.logService.getLog().subscribe(data => {
      this.rawlist = data;
    });
  }
}
