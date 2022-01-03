import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
@NgModule({
  declarations: [ChatComponent],
  imports: [
    ChatRoutingModule, 
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ HttpClientModule],
})
export class ChatModule { }
