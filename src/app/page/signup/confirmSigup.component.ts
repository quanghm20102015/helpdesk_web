import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { EncrDecrService } from '../../service/encr-decr.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-confirmSigup',
  templateUrl: './confirmSigup.component.html',
  styleUrls: ['./confirmSigup.component.css'],
  providers: [MessageService]
})
export class ConfirmSigupComponent implements OnInit {
  idUserEncrypt: any;
  idUserDecrypt: any;
  idUser: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,    
    private encrdecrService: EncrDecrService,
    private userService: UserService) { }
  ngOnInit(): void {
    if (localStorage.getItem('idUser')) {
      this.router.navigate(['/main/conversations/dashboard']);
    }
    
    this.activatedRoute.params.subscribe((params) => {
      const { token } = params;
      
      let request = {
        idGuId: token
      }
      
      this.userService.confirmSigup(request).subscribe((result) => {
        if(result.status == 1){
          this.router.navigate(['login'])
        }
        else{
        }
      });
    });    
  }
}
