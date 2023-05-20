import {
  IWorkItemFormService,
  WorkItemField,
  WorkItemTrackingServiceIds
} from "azure-devops-extension-api/WorkItemTracking";
import * as SDK from "azure-devops-extension-sdk";
import * as React from "react";
import { showRootComponent } from "../../Common";
import "./iconFont.css";
import { SimpleTagPickerExample } from "./SimpleTagPickerExample";

interface WorkItemFormPageComponentState {
  fieldsSelected: WorkItemField[];
  fields: WorkItemField[];
}

export class WorkItemFormPageComponent extends React.Component<{},  WorkItemFormPageComponentState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      fieldsSelected: [],
      fields: [],
    };
  }

  public componentDidMount() {
    SDK.init().then(async () => {
      this.getFields();
    });
  }

  public render(): JSX.Element {
    return (
      <div className="margin-8">
        <SimpleTagPickerExample
          data={this.state.fields}
          setDataSelected={(data) => {
            this.setState({fieldsSelected: data})
          }}
        />
        <div className="flex-column rhythm-vertical-4">
          {this.state.fieldsSelected.map(field => {
            return (
              <span>
                {field.name}
              </span>
            )
          })}
        </div>
      </div>
    );
  }

  private async getFields() {
    const workItemFormService = await SDK.getService<IWorkItemFormService>(
      WorkItemTrackingServiceIds.WorkItemFormService
    );
    const res = await workItemFormService.getFields();
    this.setState({fields: res});
  }
}

export default WorkItemFormPageComponent;

showRootComponent(<WorkItemFormPageComponent />);
