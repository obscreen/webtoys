import React from "react"

export const nl2br = (text: string): React.ReactElement[] => {
  return text.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 ? <br /> : null}
    </React.Fragment>
  ))
}