import React, {
  FC,
  ChangeEvent,
  useState,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { BaseInputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutSide";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<BaseInputProps, "onSelect"> {
  fetchSuggestions: (
    query: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOptions,
    value,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceValue = useDebounce(inputValue, 1000);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const triggerSearch = useRef(false);
  const componentef = useRef<HTMLDivElement>(null);
  useClickOutSide(componentef, () => {
    setSuggestions([]);
  });
  console.log("suggestions", suggestions);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debounceValue]);
  const highlight = (index: number) => {
    if (index < 0) {
      index = 9;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  console.log(highlightIndex);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 27:
        setSuggestions([]);
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerSearch.current = true;
    const value = e.target.value.trim();
    setInputValue(value);
  };
  const handleSelect = (item: DataSourceType) => {
    triggerSearch.current = false;
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const highClassName = classNames("suggestion-item", {
            "item-highlighted": index === highlightIndex,
          });

          return (
            <li
              className={highClassName}
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <div className="xdf-auto-complete" ref={componentef}>
        <Input
          onChange={handleChange}
          value={inputValue}
          {...restProps}
          onKeyDown={handleKeyDown}
        />
        {loading && (
          <ul>
            <Icon icon="spinner" spin />
          </ul>
        )}
        {suggestions.length > 0 && generateDropdown()}
      </div>
    </>
  );
};

export default AutoComplete;
