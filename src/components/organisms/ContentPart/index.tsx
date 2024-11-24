import * as React from "react";

type Props = {
  children: React.ReactNode
  className?: string
}

const ContentPart = (props: Props) => {
  const { children } = props;

  return (
    <>
      {children}
    </>
  )
}

export default ContentPart;
