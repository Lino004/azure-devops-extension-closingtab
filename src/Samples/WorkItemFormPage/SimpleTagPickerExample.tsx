import { WorkItemField } from "azure-devops-extension-api/WorkItemTracking";
import { useObservableArray } from "azure-devops-ui/Core/Observable";
import { ISuggestionItemProps } from "azure-devops-ui/SuggestionsList";
import { TagPicker } from "azure-devops-ui/TagPicker";
import * as React from "react";

interface ComponentProps {
  data: WorkItemField[],
  setDataSelected(data: WorkItemField[]): void
}

export const SimpleTagPickerExample: React.FunctionComponent<ComponentProps> = ({ data, setDataSelected }) => {
  const [tagItems, setTagItems] = useObservableArray<WorkItemField>([]);
  const [suggestions, setSuggestions] = useObservableArray<WorkItemField>([]);

  const areTagsEqual = (a: WorkItemField, b: WorkItemField) => {
    return a.referenceName === b.referenceName;
  };

  const convertItemToPill = (tag: WorkItemField) => {
    return {
      content: tag.name,
      onClick: () => alert(`Clicked tag "${tag.name}"`)
    };
  };

  const onSearchChanged = (searchValue: string) => {
    setSuggestions(data
      .filter(testItem => testItem.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
    );
  };

  const onTagAdded = (tag: WorkItemField) => {
    setTagItems([...tagItems.value, tag]);
    setDataSelected(tagItems.value)
  };

  const onTagRemoved = (tag: WorkItemField) => {
    setTagItems(tagItems.value.filter(x => x.referenceName !== tag.referenceName));
  };

  const renderSuggestionItem = (tag: ISuggestionItemProps<WorkItemField>) => {
    return <div className="body-m">{tag.item.name}</div>;
  };

  return (
    <div className="flex-column">
      <label>Document Closing List</label>
      <TagPicker
        areTagsEqual={areTagsEqual}
        convertItemToPill={convertItemToPill}
        noResultsFoundText={"No results found"}
        onSearchChanged={onSearchChanged}
        onTagAdded={onTagAdded}
        onTagRemoved={onTagRemoved}
        renderSuggestionItem={renderSuggestionItem}
        selectedTags={tagItems}
        suggestions={suggestions}
        suggestionsLoading={false}
        ariaLabel={"Search..."}
      />
    </div>
  );
};