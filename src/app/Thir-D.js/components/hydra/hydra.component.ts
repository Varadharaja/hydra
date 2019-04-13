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
import { ShapeComponent } from '../shape/shape.component';
import { Shape } from '../../contracts/shape';
import { GxUtils } from '../../contracts/gxUtils';
import { Color } from '../../contracts/color';
import { ArenaComponent } from '../arena/arena.component';
import * as ng from "angular";
import { HydraApiService } from './hydra-api.service';
import { HydraContext } from './hydraContext';
import { Goal } from '../../contracts/goal';
import { Scale } from '../../contracts/scale';
import { Point } from '../../contracts/point';


@Component({
  selector: 'app-hydra',
  templateUrl: './hydra.component.html',
  styleUrls: ['./hydra.component.css']
})
export class HydraComponent implements OnInit, OnDestroy  {
  
  context: HydraContext = new HydraContext(); 
  arena: ArenaComponent = new ArenaComponent();
  shouldShowApplyButton: boolean = false;
  comps: CompItem[] = new Array();

  @ViewChild(DynamicDirective) dynHost: DynamicDirective;

  dynHostData: any;

  Conversation: ChatMessage[] = new Array();

  UserMessage: string = "";

  constructor(private hydraService: HydraApiService, private componentFactoryResolver: ComponentFactoryResolver) {

    this.context.currentGoalId = "START";

    let newMessage = new ChatMessage("hydra-", "Hello Guest User") ;

    this.Conversation.push(newMessage);
    this.GetNextGoals();

    this.comps.push(new CompItem(AngleComponent, new Angle(0,0,0)));
    this.comps.push(new CompItem(ColorComponent, new Color(255,255,255)));
    this.comps.push(new CompItem(PointComponent, new Point(0,0,0)));
    this.comps.push(new CompItem(ScaleComponent, new Scale(1,1,1)));

    let initShape = new Shape("");
    initShape.Id = GxUtils.NewGuid();
    initShape.Type = -1;
    initShape.Color = new Color(255,255,255,1);
    initShape.Color.Value = "#ff00ff";
    this.comps.push(new CompItem(ShapeComponent, initShape));

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

            let hydraResponse ;
            this.shouldShowApplyButton = this.loadComponentByHint(msg);
            if (this.shouldShowApplyButton)
            {
             hydraResponse = new ChatMessage("hydra-", "Please fill in the below details.");
             this.Conversation.push(hydraResponse); 
             (document.querySelector("div[for='dyn-tmpl']") as HTMLDivElement).focus();

            }
            else
            {
              hydraResponse = new ChatMessage("hydra-", "Sorry, didn't get that.");
              this.Conversation.push(hydraResponse);
            }

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

  GetNextGoals()
  {
    this.hydraService.getGoals(this.context.currentGoalId).forEach(m=>{
      if (m != null && m.length > 0)
      {
        this.Conversation.push(new ChatMessage("hydra-", "Please choose any of the below options:", m));
      }
      else
      {
        this.Conversation.push(new ChatMessage("hydra-", "Sorry, not able to process your request"));

      }

    });
  }

  ProcessGoal(goal: Goal)
  {
    this.context.currentGoalId = goal.Id; 
    this.context.currentGoal = JSON.parse(JSON.stringify(goal));
    this.Conversation.push(new ChatMessage("", "You have opted to " + goal.Name.toLowerCase() ));

    if (goal.ActionHint != "")
    {
      this.Conversation.push(new ChatMessage("hydra-", "Please fill in the below details"));

      this.shouldShowApplyButton = eval('this.' + goal.ActionHint);
    }
    else
    {
      this.GetNextGoals();

    }
  }


  processMessage()
  {
    //  list shapes
    //  select shape
    //  change shape specific characteristics - e.g., height/width/Length
    //  change/increase/decrease the height
    //  Move the object left / right or top or below
    //  Rotate the object
    //  Scale the object
    //  Keeping the context of which shape is under consideration
    //  Load previously saved shapes
    // Repeated tasks like workflows eg., move object 1 to the right of object2, place object 1 on top of obj2, etc.,

  }

  loadComponent() {

    let compItem = this.comps[0];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(compItem.component);

    let viewContainerRef = this.dynHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<IComponent>componentRef.instance).data = compItem.data;
  }

  loadComponentByHint(compHint: string): boolean
  {


    let viewContainerRef = this.dynHost.viewContainerRef;
    viewContainerRef.clear();
    let compItems = this.comps.filter(a => a.component.name.toLowerCase().indexOf(compHint) > -1);

    if (compItems.length == 0)
    {
      return false;
    }
    else
    {
      let compItem = compItems[0];

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(compItem.component);

      let componentRef = viewContainerRef.createComponent(componentFactory);
      let inputType = compItem.data.constructor.name;

      if (this.context.currentGoal.PreProcess != null)
      {
        let compData: any;

        eval("compData=this." + this.context.currentGoal.PreProcess + "('"+ compHint +"')");

        (<IComponent>componentRef.instance).data = compData;
        this.dynHostData = (<IComponent>componentRef.instance).data;

      }
      else
      {
        (<IComponent>componentRef.instance).data = compItem.data;
        this.dynHostData = (<IComponent>componentRef.instance).data;
      }


      return true;
    }

  }



  applyChanges()
  {
    // Post Process event of the goal
   eval('this.' +  this.context.currentGoal.PostProcess + "(this.dynHostData)");

    let viewContainerRef = this.dynHost.viewContainerRef;
    viewContainerRef.clear();
    this.shouldShowApplyButton =false;

    this.Conversation.push(new ChatMessage("", "Your changes to " + this.context.currentGoal.Name.toLocaleLowerCase() + " are applied."));
    
    this.GetNextGoals();
  }
}
