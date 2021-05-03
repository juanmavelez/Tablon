export interface ITag {
  _id: string;
  type: string;
  lenguages?: string[];
  names?: string[];
  frameworks?: string[];
  preprocessors?: string[];
}

export interface ITagResponse {
  data: ITag[];
  message: string;
}
