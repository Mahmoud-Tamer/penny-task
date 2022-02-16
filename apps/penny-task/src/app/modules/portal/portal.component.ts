import { HttpClient } from '@angular/common/http';
import { LoaderService } from './../../core/services/loader.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation/confirmation.dialog';
import { Subscription } from 'rxjs';
import { environment } from 'apps/penny-task/src/environments/environment';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent {
  @ViewChild(MatDrawer, { static: false }) public drawer!: MatDrawer;
  sub!: Subscription;

  displayedColumns: string[] = ['username', 'createdAt'];
  dataSource: any = [];
  showSideNav: boolean = true;

  private api: string = environment.base_url + environment.base_api_route;

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    public loaderService: LoaderService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get(`${this.api}/auth/users`).subscribe((users: any) => {
      this.dataSource = users;
    });
  }

  logout(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      height: 'auto',
      data: {
        title: 'Confirm Logout',
        subTitle: 'Are you sure to logout !?',
      },
    });

    this.sub = dialogRef.afterClosed().subscribe((result: any) => {
      if (result) this.authService.logout();
    });
  }

  drawerToggle(): void {
    this.showSideNav = false;
    this.drawer.toggle();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
