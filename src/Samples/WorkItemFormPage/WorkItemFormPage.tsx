/* import {
  IWorkItemFormService,
  WorkItemField,
  WorkItemTrackingServiceIds
} from "azure-devops-extension-api/WorkItemTracking"; */
import * as SDK from "azure-devops-extension-sdk";
import * as React from "react";
import { showRootComponent } from "../../Common";
import "./iconFont.css";
import AppTagPicker from "./AppTagPicker";
import { FieldTag } from "./interfaces";

const FIELD_DATA: FieldTag[] = [
  {
    id: 'champ1',
    name: 'Champ 1',
  },
  {
    id: 'champ2',
    name: 'Champ 2',
  },
  {
    id: 'champ3',
    name: 'Champ 3',
  },
]

interface WorkItemFormPageComponentState {
  fieldsSelected: FieldTag[];
  fields: FieldTag[];
}

const checkClassIfFieldSelected: Function = (id: string, data: FieldTag[]) => {
  const existe = !!data.find(el => el.id === id);
  return existe ? '' : 'hidden';
}

export class WorkItemFormPageComponent extends React.Component<{},  WorkItemFormPageComponentState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      fieldsSelected: [],
      fields: FIELD_DATA,
    };
  }

  public componentDidMount() {
    SDK.init().then(async () => {});
  }

  public render(): JSX.Element {
    return (
      <div className="margin-8">
        <AppTagPicker
          data={this.state.fields}
          setDataSelected={(data) => {
            this.setState({fieldsSelected: data})
          }}
        />
        <div id="champ1" className={`${checkClassIfFieldSelected("champ1", this.state.fieldsSelected)}`}>
          Champ 1
        </div>
        <div id="champ2" className={`${checkClassIfFieldSelected("champ2", this.state.fieldsSelected)}`}>
          Champ 2
        </div>
        <div id="champ3" className={`${checkClassIfFieldSelected("champ3", this.state.fieldsSelected)}`}>
          Champ 3
        </div>
      </div>
    );
  }
}

export default WorkItemFormPageComponent;

showRootComponent(<WorkItemFormPageComponent />);
