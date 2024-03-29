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
  useRole,
  arrow,
  safePolygon,
  FloatingPortal,
  FloatingOverlay
} from '@floating-ui/react'
import React, { ElementType, useId, useRef, useState } from 'react'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  overlay?: boolean
}

export default function Popover({
  initialOpen,
  placement = 'bottom',
  children,
  renderPopover,
  as: Element = 'div',
  className,
  overlay = false
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(2),
      shift(),
      flip(),
      arrow({
        element: arrowRef
      })
    ],
    placement
  })

  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const focus = useFocus(context)
  const role = useRole(context, { role: 'tooltip' })
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, role, dismiss])
  const id = useId()
  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {isOpen && (
        <FloatingPortal id={id}>
          {overlay ? (
            <FloatingOverlay className='grid place-items-center bg-overlay' lockScroll>
              <div
                ref={refs.setFloating}
                style={{ ...floatingStyles, left: '50%', transform: 'translate(-50%, 34.5455px)' }}
                {...getFloatingProps()}
              >
                {renderPopover}
              </div>
            </FloatingOverlay>
          ) : (
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              {renderPopover}
            </div>
          )}
        </FloatingPortal>
      )}
    </Element>
  )
}
