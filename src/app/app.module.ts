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
import { ShapeComponent } from './Thir-D.js/components/shape/shape.component';
import { ArenaComponent } from './Thir-D.js/components/arena/arena.component';
import { HttpClientModule } from '@angular/common/http';
import { TransformationComponent } from './Thir-D.js/components/transformation/transformation.component';

@NgModule({
  declarations: [
    AppComponent,
    AngleComponent,
    ColorComponent,
    ScaleComponent,
    PointComponent,
    HydraComponent,
    DynamicDirective,
    ShapeComponent,
    ArenaComponent,
    TransformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    AngleComponent,
    ColorComponent,
    ScaleComponent,
    PointComponent,
    HydraComponent ,
    ShapeComponent,
    TransformationComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
