import { CategoryType } from "../../../database";

export type _CategoryType = CategoryType & {
    new?: boolean;
}