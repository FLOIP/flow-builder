export interface IContactPropertyMultipleChoice {
  value: string,
  description: string,
}

export interface IContactPropertyOption {
  id: string,
  name: string,
  display_label: string,
  data_type: string,
  choices?: IContactPropertyMultipleChoice[],
}

export interface IContactPropertyOptionForUISelector extends IContactPropertyOption {
  // $isDisabled is used by vue-multiselect
  $isDisabled: boolean,
}
