import React from "react"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { HorizontalLayout } from "../Layout/Box"

interface SummaryDetailsFieldProps {
  fullWidth?: boolean
  helperText?: React.ReactNode
  label: React.ReactNode
  value: React.ReactNode
}

/** Based on TextField */
export const SummaryDetailsField = React.memo(function SummaryDetailsField(props: SummaryDetailsFieldProps) {
  const InputComponent = React.useCallback(() => <>{props.value}</>, [props.value])
  return (
    <FormControl style={{ flex: props.fullWidth ? "0 0 100%" : "0 0 48%" }}>
      <InputLabel style={{ overflow: "visible", textTransform: "none", whiteSpace: "nowrap" }}>
        {props.label}
      </InputLabel>
      <Input
        disableUnderline
        inputComponent={InputComponent}
        style={{ maxWidth: "100%", overflow: "hidden", wordBreak: "break-word" }}
      />
      {props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : null}
    </FormControl>
  )
})

interface SummaryDetailsLineProps {
  children: React.ReactNode
}

function SummaryDetailsLine(props: SummaryDetailsLineProps) {
  return (
    <HorizontalLayout style={{ flexWrap: "wrap", justifyContent: "space-between", width: "100%" }}>
      {props.children}
    </HorizontalLayout>
  )
}

const useSummaryItemStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "flex-start",
    borderBottom: "none",
    flexDirection: "column",
    padding: "1px 0"
  },
  heading: {
    display: "block",
    padding: "16px 0",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "18px",
    textAlign: "left"
  }
})

interface SummaryItemProps {
  children: React.ReactNode
  heading?: React.ReactNode
}

export function SummaryItem(props: SummaryItemProps) {
  const classes = useSummaryItemStyles()
  return (
    <ListItem className={classes.root} disableGutters>
      {props.heading ? (
        <Typography color="textSecondary" className={classes.heading} variant="subtitle1">
          {props.heading}
        </Typography>
      ) : null}
      <SummaryDetailsLine>{props.children}</SummaryDetailsLine>
    </ListItem>
  )
}
