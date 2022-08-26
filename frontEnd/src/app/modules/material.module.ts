import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  exports: [MatCardModule, MatButtonModule, MatIconModule],
})
export class NgMaterialModule {}
