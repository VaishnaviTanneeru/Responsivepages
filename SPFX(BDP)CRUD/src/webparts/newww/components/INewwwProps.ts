import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
export interface INewwwProps {
  items: any[];
  viewFields: IViewField[];
  description:string;
  context:WebPartContext
  }
