import { UserModelService } from './../../services/user-model.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userModel: UserModelService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  login() {
    // for closing the models (login popUp)
    this.modalService.dismissAll();

    // storing the queryParms if we have otherwise store the returnUrl to '/';
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.auth
      .login()
      .then((user) => {
        // reading from the local storage. and navigate to the stored returnUrl;

        let name = user.user?.displayName;
        let email = user.user?.email;
        let uid = user.user?.uid;

        this.userModel.save(name, email, uid);

        this.router.navigate([localStorage.getItem('returnUrl')]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  open(loginModel: any) {
    this.modalService.open(loginModel);
  }
}
