import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  sidenavWidth: number;
  ngStyle: string;
  lftPnlSize: boolean;
  firstPanel: boolean;
  secondPanel: boolean;
  thirdPanel: boolean;
  fourthPanel: boolean;
  fifthPanel: boolean;

  firstPanelHeader: boolean;
  secondPanelHeader: boolean;
  thirdPanelHeader: boolean;
  fourthPanelHeader: boolean;
  fifthPanelHeader: boolean;

  exapansionPanel: boolean = false;

  avatarUrls: any = ['avatar-list', 'avatar-add', 'avatar-list-category', 'avatar-add-category'];
  proxyUrls: any = ['add-proxy', 'list-proxy'];
  newsUrls: any = ['add-news-source', 'list-news-source', 'add-category', 'list-category', 'add-language', 'list-language']
  clientUrls: any = ['add-client', 'list-client']
  jobsUrls: any = ['heartbeat', 'collection-list', 'cloud-logs', 'collection-entity', 'profile-finder', 'job-logs', 'job-detail', 'migration-job-tracking', 'job-status-tracking', 'migration-report']

  @ViewChild('accordion', { static: true }) expansion: MatAccordion;
  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(result => {
      if (result["url"] !== '') {
        this.expandSubNavigation();
        //this.activeMainNavigation()       
      }
    })

  }

  ngOnInit(): void {
    this.sidenavWidth = 20;
    this.lftPnlSize = false;
    this.expandSubNavigation()
    if (window.innerWidth < 767) {
      this.sidenavWidth = 4;
      this.lftPnlSize = false;
      this.firstPanel = false;
      this.secondPanel = false;
      this.thirdPanel = false;
      this.fourthPanel = false;
      this.fifthPanel = false;
    }

  }

  expandSubNavigation() {
    let ActivUrl = this.router.url.toString().split('?')[0].split('/');
    let url = ActivUrl[ActivUrl.length - 1];

    if ((this.avatarUrls.indexOf(url) !== -1) || (ActivUrl[2] == 'avatar-update')) {
      this.firstPanel = true;
      this.firstPanelHeader = true
    } else {
      this.firstPanel = false;
      this.firstPanelHeader = false;
    }

    if ((this.proxyUrls.indexOf(url) !== -1) || (ActivUrl[2] == 'proxy-update')) {
      this.secondPanel = true;
      this.secondPanelHeader = true;
    } else {
      this.secondPanel = false;
      this.secondPanelHeader = false;
    }

    if ((this.newsUrls.indexOf(url) !== -1) || (ActivUrl[2] == 'update-news-source')) {
      this.thirdPanel = true;
      this.thirdPanelHeader = true;
    } else {
      this.thirdPanel = false;
      this.thirdPanelHeader = false;
    }

    if ((this.clientUrls.indexOf(url) !== -1) || (ActivUrl.indexOf('update-client') !== -1)) {
      this.fourthPanel = true;
      this.fourthPanelHeader = true;
    } else {
      this.fourthPanel = false;
      this.fourthPanelHeader = false;
    }

    if ((this.jobsUrls.indexOf(url) !== -1)) {
      this.fifthPanel = true;
      this.fifthPanelHeader = true;
    } else {
      this.fifthPanel = false;
      this.fifthPanelHeader = false;
    }
  }




  navSmall() {
    if (this.sidenavWidth == 20) {
      this.sidenavWidth = 4;
      this.lftPnlSize = true;
      this.firstPanel = false
      this.secondPanel = false
      this.thirdPanel = false
      this.fourthPanel = false;
      this.fifthPanel = false;
    } else {
      this.sidenavWidth = 20;
      this.lftPnlSize = false;
    }
  }

  activeMainNavigation() {
    let ActivUrl = this.router.url.toString().split('/');
    let url = ActivUrl[ActivUrl.length - 1];

    if ((url == 'avatar-list') || (url == 'avatar-add') || (url == 'avatar-list-category') || (url == 'avatar-add-category')) this.firstPanelHeader = true;
    else this.firstPanelHeader = false;
    if ((url == 'add-proxy') || (url == 'list-proxy')) this.secondPanelHeader = true;
    else this.secondPanelHeader = false;
    if ((url == 'add-news-source') || (url == 'list-news-source') || (url = 'add-category') || (url == 'list-category') || (url == 'add-language') || (url == 'list-language')) this.thirdPanelHeader = true
    else this.thirdPanelHeader = false;
  }


}
