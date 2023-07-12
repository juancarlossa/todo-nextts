import Link from 'next/link'

import React from 'react'

type ButtonProps = {
  label: string;
  route: string;
  className: string;
  target: string;
}

export default function Button({ label, route, className, target }: ButtonProps) {

  return (
    <>
        <Link href={route} target={target} className={className}>
          {label}
        </Link>
    </>
  )
}


