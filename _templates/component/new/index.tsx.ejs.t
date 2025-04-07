---
to: <%= targetDir %>/<%= h.changeCase.pascal(name) %>.tsx
---

import React from 'react'
import clsx from 'clsx'
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const <%= name %>Variants = cva(
  '',
  {
    variants:{
      variant: {

      }
    },
    defaultVariants:{}
  }
)

type Props = {
  className?:string;
} & VariantProps<typeof <%= name %>Variants>;

export const <%= h.changeCase.pascal(name) %> = ({variant, className}: Props) => {
  return (
    <div className={clsx(<%= name %>Variants({ variant },className))}></div>
  )
}