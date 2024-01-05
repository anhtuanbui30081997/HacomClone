import {
  Placement,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react'
import React, { ElementType, useState } from 'react'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  roleType?: 'dialog' | 'tooltip'
  icon: React.ReactNode
}

export default function Popover({
  initialOpen,
  placement = 'bottom',
  children,
  renderPopover,
  as: Element = 'div',
  className,
  roleType = 'tooltip',
  icon
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(6), shift(), flip()],
    placement
  })

  const hover = useHover(context)
  const focus = useFocus(context)
  const role = useRole(context, { role: roleType })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, role, dismiss])

  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps({
        onMouseEnter: () => console.log('enter'),
        onMouseOver: () => console.log('hover'),
        onFocus: () => console.log('focused')
      })}
    >
      {icon}
      {children}
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps}>
          {renderPopover}
        </div>
      )}
    </Element>
  )
}
