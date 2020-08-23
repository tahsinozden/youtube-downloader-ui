import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements OnInit {

  dark = false;

  constructor() {
    const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
    this.dark = prefersColor.matches;
    this.updateDarkMode();

    prefersColor.addEventListener(
        'change',
        mediaQuery => {
          this.dark = mediaQuery.matches;
          this.updateDarkMode();
        }
    );
  }

  updateDarkMode() {
    document.body.classList.toggle('dark', this.dark);
  }

  ngOnInit() {}

}
