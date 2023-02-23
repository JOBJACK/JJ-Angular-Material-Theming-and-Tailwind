import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { tap } from 'rxjs/operators';
import { ThemeBuilderService } from './theme-builder.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {

  primaryColorTheme = document.documentElement.style.getPropertyValue('--theme-primary-500')
  accentColorTheme = document.documentElement.style.getPropertyValue('--theme-accent-500')

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
          }
          if (val.colorCtrAccent) {
            this.accentColor = `#${val.colorCtrAccent.hex}`;
            this.tb.saveAccentColor(this.accentColor);
          }
        })
      )
      .subscribe();
  }

}
