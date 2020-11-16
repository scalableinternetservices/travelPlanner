import * as React from 'react'

export function input(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      width="100%"
      height="32px"
      border-radius="3px"
      border="1px solid #eaeaea"
      padding="5px 10px"
      font-size="12px"

      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      {...props}
    ></svg>
  )
}
/*

#searchBar {
  width: 100%;
  height: 32px;
  border-radius: 3px;
  border: 1px solid #eaeaea;
  padding: 5px 10px;
  font-size: 12px;
}

#searchWrapper {
  position: relative;
}

#searchWrapper::after {
  content: '🔍';
  position: absolute;
  top: 7px;
  right: 15px;
}
*/