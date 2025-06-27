export class UiControl {
}

import { Type } from "@angular/core";

export type MenuItem = {
    icon : string;
    label : string;
    route? : string;
    subItems? : MenuItem[];
}

export interface Widget{
    id : number;
    label : string;
    content : Type<unknown>
}
