


export type patternModel = {

  pattern:string,
  error_message:string,
};

export type restrictionModel = {

  type:string,
  use:string,
  patternM:Array<patternModel>,
};

export type RecviceNodeModel = {
  title:string,
  Tclass:string,
  class:string,
  input:string,
  placeholder:string,
  restriction:restrictionModel,
}


export type RecviceDataModel = {

  title:string,
  class:string,
  node:Array<RecviceNodeModel>,
};