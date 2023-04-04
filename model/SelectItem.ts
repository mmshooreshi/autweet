interface SelectItemBase {
    value: number | string | boolean
    label: string
}

type SelectItemWithOptionalDisabled = SelectItemBase & { disabled?: boolean }

type SelectItem = SelectItemWithOptionalDisabled | SelectItemBase

export { SelectItem }