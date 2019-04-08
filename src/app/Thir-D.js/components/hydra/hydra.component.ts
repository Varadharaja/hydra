import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ChatMessage } from '../../contracts/chatmessage';
import { DynamicDirective } from 'src/app/dynamic.directive';
import { IComponent } from 'src/app/IComponent';
import { Angle } from '../../contracts/angle';
import { AngleComponent } from '../angle/angle.component';
import { ScaleComponent } from '../scale/scale.component';
import { ColorComponent } from '../color/color.component';
import { PointComponent } from '../point/point.component';
import { CompItem } from 'src/app/compItem';

@Component({
  selector: 'app-hydra',
  templateUrl: './hydra.component.html',
  styleUrls: ['./hydra.component.css']
})
export class HydraComponent implements OnInit, OnDestroy  {

  comps: CompItem[] = new Array();

  @ViewChild(DynamicDirective) dynHost: DynamicDirective;

  Conversation: ChatMessage[] = new Array();

  UserMessage: string = "";

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    let newMessage = new ChatMessage("hydra-", "Hello Guest User") ;

    this.Conversation.push(newMessage);

    this.comps.push(new CompItem(AngleComponent, undefined));
    this.comps.push(new CompItem(ColorComponent, undefined));
    this.comps.push(new CompItem(PointComponent, undefined));
    this.comps.push(new CompItem(ScaleComponent, undefined));
   }

  ngOnInit() {
    //this.loadComponent();
  }

  ngOnDestroy() {
  }

  OnKeyPress(e: any)
  {
      var unicode = e.keyCode? e.keyCode : e.charCode;
      var actualkey = String.fromCharCode(unicode);
      {
        switch(e.charCode)
        {
          case 13:
          let textCtrl =   document.querySelector("input[for='chat-msg']") as HTMLInputElement;

          if (textCtrl != null)
          {
            let msg = textCtrl.value;
            textCtrl.value = "";
            textCtrl.blur();

            this.Conversation.push(new ChatMessage("", msg));

            let hydraResponse = new ChatMessage("hydra-", "Please fill in the below details.");

            this.Conversation.push(hydraResponse);
            this.loadComponentByHint(msg);
            (document.querySelector("div[for='dyn-tmpl']") as HTMLDivElement).focus();
            
          }

          break;
          default:
            this.UserMessage += actualkey;
        }
      }
 }

  OnKeyDown(e: any)
  {
    if (e.keyCode == 8)
    {
      this.UserMessage = this.UserMessage.substr(0,this.UserMessage.length - 2);
    }
  }

  loadComponent() {

    let compItem = this.comps[0];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(compItem.component);

    let viewContainerRef = this.dynHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<IComponent>componentRef.instance).data = compItem.data;
  }

  loadComponentByHint(compHint: string)
  {
    let compItem = this.comps.filter(a => a.component.name.toLowerCase().indexOf(compHint) > -1)[0];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(compItem.component);

    let viewContainerRef = this.dynHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<IComponent>componentRef.instance).data = compItem.data;

  }
}
