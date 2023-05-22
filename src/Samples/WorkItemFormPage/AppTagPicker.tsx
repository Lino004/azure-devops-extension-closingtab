import { useObservableArray } from "azure-devops-ui/Core/Observable";
import { ISuggestionItemProps } from "azure-devops-ui/SuggestionsList";
import { TagPicker } from "azure-devops-ui/TagPicker";
import * as React from "react";
import { FieldTag } from "./interfaces";

interface ComponentProps {
  data: FieldTag[],
  setDataSelected(data: FieldTag[]): void
}

const AppTagPicker: React.FunctionComponent<ComponentProps> = ({ data, setDataSelected }) => {
  const [tagItems, setTagItems] = useObservableArray<FieldTag>([]);
  const [suggestions, setSuggestions] = useObservableArray<FieldTag>([]);

  const areTagsEqual = (a: FieldTag, b: FieldTag) => {
    return a.name === b.name;
  };

  const convertItemToPill = (tag: FieldTag) => {
    return {
      content: tag.name,
      onClick: () => {}
    };
  };

  const onSearchChanged = (searchValue: string) => {
    setSuggestions(data
      .filter(testItem => testItem.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
    );
  };

  const onTagAdded = (tag: FieldTag) => {
    setTagItems([...tagItems.value, tag]);
    setDataSelected(tagItems.value);
  };

  const onTagRemoved = (tag: FieldTag) => {
    setTagItems(tagItems.value.filter(x => x.name !== tag.name));
    setDataSelected(tagItems.value)
  };

  const renderSuggestionItem = (tag: ISuggestionItemProps<FieldTag>) => {
    return <div className="body-m">{tag.item.name}</div>;
  };

  return (
    <div className="flex-column">
      <label>Select field</label>
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

export default AppTagPicker;
