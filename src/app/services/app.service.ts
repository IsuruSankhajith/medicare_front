import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { UserService } from './user.service';
import { User } from '@/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: User = null;

    constructor(private router: Router, private toastr: ToastrService, private userService:UserService) {}

    async loginByAuth({email, password}) {
        try {
            let username = email
            this.userService.userLogin(username, password).subscribe(
                (response) => {
                    this.user.Email = username;
                  console.log(response);
                  if(response.message == "Login failed") {
                    this.toastr.error("Login failed");
                  } else{
                    this.router.navigate(['/dashboard']);
                    this.toastr.success('Login success');
                  }
                },
                (error) => {
                  console.error(error); // Handle errors here
                  this.toastr.error(error.message);
                }
              );
            
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByAuth({email, password}) {
        try {
            let username = email
            this.userService.userSignUp(username, password).subscribe(
                (response) => {
                  console.log(response);
                  if(response.message == "Register failed") {
                    this.toastr.error("Register failed");
                  } else{
                    // this.router.navigate(['/']);
                    this.toastr.success('Register success');
                  }
                  
                },
                (error) => {
                  console.error(error); // Handle errors here
                  this.toastr.error(error.message);
                }
              );

            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
            this.user = await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
