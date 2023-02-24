import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { tap } from 'rxjs/operators';
import { ThemeBuilderService } from './theme-builder.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent  {

  primaryColorTheme
  accentColorTheme
  primaryColor = '#1c9fda';
  accentColor = '#f6fa06';

  public disabled = false;
  public colorPrimary: ThemePalette = 'primary';
  public colorAccent: ThemePalette = 'accent';
  public touchUi = false;
  myForm: FormGroup;

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  public listColors = ['primary', 'accent', 'warn'];

  constructor(
    public tb: ThemeBuilderService,
    public fb: FormBuilder
    ) {
      this.tb.savePrimaryColor(this.primaryColor);
      this.tb.saveAccentColor(this.accentColor);
      this.myForm = fb.group({
        colorCtrPrimary: null,
        colorCtrAccent: null,
      });
      this.onFormChanges();
  }

  onFormChanges() {
    this.myForm.valueChanges
      .pipe(
        tap((val) => {
          if (val.colorCtrPrimary) {
            this.primaryColor = `#${val.colorCtrPrimary.hex}`;
            this.tb.savePrimaryColor(this.primaryColor);
            this.primaryColorTheme = document.documentElement.style.getPropertyValue('--theme-primary-500')
          }
          if (val.colorCtrAccent) {
            this.accentColor = `#${val.colorCtrAccent.hex}`;
            this.tb.saveAccentColor(this.accentColor);
            this.accentColorTheme = document.documentElement.style.getPropertyValue('--theme-accent-500')
          }
        })
      )
      .subscribe();
  }

}
