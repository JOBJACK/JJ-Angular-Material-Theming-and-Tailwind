import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { tap } from 'rxjs';
import { ThemeBuilderService } from './theme-builder.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {

  primaryColor = document.documentElement.style.getPropertyValue('--theme-primary-500')
  accentColor = document.documentElement.style.getPropertyValue('--theme-accent-500')

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
            this.tb.savePrimaryColor();
          }
          if (val.colorCtrAccent) {
            this.accentColor = `#${val.colorCtrAccent.hex}`;
            this.tb.saveAccentColor();
          }
        })
      )
      .subscribe();
  }

}
