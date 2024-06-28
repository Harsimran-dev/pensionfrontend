import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";


@Component({
  selector: "app-full-layout",
  standalone:true,
  imports:[RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule],
  templateUrl: "./fulllayout.component.html",
  styleUrls: ["./fulllayout.component.scss"],
})
export class FullLayoutComponent implements OnInit {

  constructor(public router: Router) {}
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public leftmenu = "full";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    }
    this.defaultSidebar = this.leftmenu;
    this.handleSidebar();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.leftmenu = "full";
    } else {
      this.leftmenu = this.defaultSidebar;
    }
  }

  toggleleftmenu() {
    switch (this.leftmenu) {
      case "full":
        this.leftmenu = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.leftmenu = "full";
        break;

      default:
    }
  }
}
