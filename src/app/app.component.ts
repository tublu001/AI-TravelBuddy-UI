import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/services/auth-service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$?: Observable<boolean>;                  // {1}

  @ViewChild('NgbdDatepicker') dp!: NgbDateStruct;
  constructor(private modalService: NgbModal, private authService: AuthService) {
    
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    console.log("Inside ngOnInit Login")
    // document.body.classList.add('container_background');
  }
  
  onLogout(){
    this.authService.logout();                      // {3}
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
