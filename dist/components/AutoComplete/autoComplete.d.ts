import { FC, ReactElement } from "react";
import { BaseInputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<BaseInputProps, "onSelect"> {
    fetchSuggestions: (query: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
