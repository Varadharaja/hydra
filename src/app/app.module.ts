import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngleComponent } from './Thir-D.js/components/angle/angle.component';
import { ColorComponent } from './Thir-D.js/components/color/color.component';
import { ScaleComponent } from './Thir-D.js/components/scale/scale.component';
import { PointComponent } from './Thir-D.js/components/point/point.component';
import { HydraComponent } from './Thir-D.js/components/hydra/hydra.component';
import { DynamicDirective } from './dynamic.directive';
import { ChatMessage } from './Thir-D.js/contracts/chatmessage';

@NgModule({
  declarations: [
    AppComponent,
    AngleComponent,
    ColorComponent,
    ScaleComponent,
    PointComponent,
    HydraComponent,
    DynamicDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  entryComponents: [
    AngleComponent,
    ColorComponent,
    ScaleComponent,
    PointComponent,
    HydraComponent  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
