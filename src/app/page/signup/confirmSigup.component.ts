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
    this.activatedRoute.params.subscribe((params) => {
      // this.idUserEncrypt = +params['id']      
      // this.idUserDecrypt = this.encrdecrService.set("mypassword", this.idUserEncrypt).toString()
      this.idUser = +params['id']      
      
      let request = {
        idUser: this.idUser
      }
      this.userService.confirmSigup(request).subscribe((result) => {
        if(result.status == 1){
          this.router.navigate(['login'])
        }
        else{
        }
      });
    })
    
  }
}
