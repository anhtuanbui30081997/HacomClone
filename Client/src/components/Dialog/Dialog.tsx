import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react'
import { useId } from 'react'

interface Props {
  children?: React.ReactNode
  renderDialog?: React.ReactNode
  className?: string
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dialog({ children, renderDialog, className, isOpen, onOpenChange }: Props) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: onOpenChange
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown'
  })
  const role = useRole(context)
  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss, role])
  const id = useId()
  return (
    <div className={className}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal id={id}>
          <FloatingOverlay className='grid place-items-center bg-overlay' lockScroll>
            <FloatingFocusManager context={context} modal={true}>
              <div ref={refs.setFloating} {...getFloatingProps()}>
                {renderDialog}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </div>
  )
}
