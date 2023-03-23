import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss'],
})
export class SwaggerComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    window.open(`${environment.backUrl}/swagger-ui/`, '_blank');
    this.location.back();
  }
}
