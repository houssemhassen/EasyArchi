import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-architect',
  templateUrl: './architect.component.html',
  styleUrls: ['./architect.component.css']
})
export class ArchitectComponent implements OnInit {

  id: any;
  architect: any;

  constructor(private act: ActivatedRoute ,private _auth: AuthService) { }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    if (this.id) {
        this._auth.getById(this.id)
            .subscribe(
                res => {
                    this.architect = res;
                    console.log(this.architect);
                },
                error => {
                    console.error('Error fetching architect data:', error);
                }
            );
    } else {
        console.error('ID is null or undefined');
    }
}

  
 
}
