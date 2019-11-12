import React from "react"
import { Asset } from "stellar-sdk"
import MenuItem from "@material-ui/core/MenuItem"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { stringifyAsset } from "../../lib/stellar"

const useAssetSelectorStyles = makeStyles({
  helperText: {
    maxWidth: 100,
    whiteSpace: "nowrap"
  },
  input: {
    minWidth: 72
  },
  select: {
    fontSize: 18,
    fontWeight: 400
  },
  unselected: {
    opacity: 0.5
  }
})

interface AssetSelectorProps {
  autoFocus?: TextFieldProps["autoFocus"]
  assets: Asset[]
  children?: React.ReactNode
  className?: string
  disabledAssets?: Asset[]
  helperText?: TextFieldProps["helperText"]
  label?: TextFieldProps["label"]
  margin?: TextFieldProps["margin"]
  minWidth?: number | string
  onChange: (asset: Asset) => void
  showXLM?: boolean
  selected?: Asset
  style?: React.CSSProperties
}

function AssetSelector(props: AssetSelectorProps) {
  const classes = useAssetSelectorStyles()

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const assets = [Asset.native(), ...props.assets]

      const matchingAsset = assets.find(asset => stringifyAsset(asset) === event.target.value)

      if (matchingAsset) {
        props.onChange(matchingAsset)
      } else {
        // tslint:disable-next-line no-console
        console.error(
          `Invariant violation: Trustline with value ${event.target.value} selected, but no matching asset found.`
        )
      }
    },
    [props.assets, props.onChange]
  )

  return (
    <TextField
      autoFocus={props.autoFocus}
      className={props.className}
      helperText={props.helperText}
      label={props.label}
      margin={props.margin}
      onChange={onChange}
      placeholder="Select an asset"
      select
      style={{ flexShrink: 0, ...props.style }}
      value={props.selected ? stringifyAsset(props.selected) : ""}
      FormHelperTextProps={{
        className: classes.helperText
      }}
      InputProps={{
        classes: {
          root: classes.input
        },
        style: {
          minWidth: props.minWidth
        }
      }}
      SelectProps={{
        classes: {
          root: props.selected ? undefined : classes.unselected,
          select: classes.select
        },
        displayEmpty: props.selected === undefined,
        renderValue: () => (props.selected ? props.selected.getCode() : "Select")
      }}
    >
      {props.selected ? null : (
        <MenuItem disabled value="">
          Select an asset
        </MenuItem>
      )}
      {props.showXLM ? (
        <MenuItem
          disabled={props.disabledAssets && props.disabledAssets.some(someAsset => someAsset.isNative())}
          value={stringifyAsset(Asset.native())}
        >
          XLM
        </MenuItem>
      ) : null}
      {props.assets.map(asset => (
        <MenuItem
          key={stringifyAsset(asset)}
          disabled={props.disabledAssets && props.disabledAssets.some(someAsset => someAsset.equals(asset))}
          value={stringifyAsset(asset)}
        >
          {asset.getCode()}
        </MenuItem>
      ))}
      {props.children}
    </TextField>
  )
}

export default React.memo(AssetSelector)
