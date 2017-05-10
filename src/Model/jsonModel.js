


export type patternModel = {

  pattern:string,
  error_message:string,
};

export type restrictionModel = {


  patternM:Array<patternModel>,
};

export type RecviceNodeModel = {
  title:string,
  classID:string,
  input:string,
  placeholder:string,
  type:string,
  use:string,
  maxLength:Number,
  minLength: Number,
  source:string,
  restriction:restrictionModel,
}


export type RecviceDataModel = {

  title:string,
  classID:string,
  node:Array<RecviceNodeModel>,
};