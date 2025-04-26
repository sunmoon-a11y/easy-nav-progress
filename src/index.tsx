import {
  createContext,
  createElement,
  ReactNode,
  useCallback,
  useContext, useRef
} from 'react'
import { createPortal } from 'react-dom'

function toCss(
  element: HTMLElement,
  properties: { [key: string]: string | undefined } | string,
  value?: string
): void {
  if (typeof properties === 'string') {
    if (value !== undefined) {
      element.style[properties as any] = value
    }
  } else {
    for (const prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        const val = properties[prop]
        if (val !== undefined) {
          element.style[prop as any] = val
        }
      }
    }
  }
}

const transition = {
  from: {
    width: '99%',
    opacity: '1',
    transition: 'width 10s cubic-bezier(0.1, 0.05, 0, 1)'
  },
  to: {
    opacity: '0',
    width: '100%',
    transition: 'width 0.2s ease-out, opacity 0.5s 0.2s'
  },
  end: {
    width: '0%'
  }
}

const ProgressBarContext = createContext<{
  done: () => void;
  start: () => void;
}>({
  done: () => null,
  start: () => null
})


export default function ProgressBarProvider({ children }: { children: ReactNode }) {
  const domRef = useRef<HTMLElement | null>(null)

  const start = useCallback(() => {
    const dom = document.querySelector('.progress-bar') as HTMLElement
    if (!dom) return
    domRef.current = dom
    toCss(dom, transition.from)
  }, [])

  const done = useCallback(() => {
    if (!domRef.current) return
    toCss(domRef.current, transition.to)
    domRef.current.addEventListener('transitionend', function(_e: TransitionEvent) {
      if (_e?.propertyName === 'opacity') {
        toCss(domRef.current!, transition.end)
      }
    })
  }, [])

  return createElement(
    ProgressBarContext.Provider,
    {
      value: {
        start,
        done
      }
    },
    [
      children,
      createPortal(
        createElement('div', {
          className: 'progress-bar',
          style: {
            width: 0,
            height: '2px',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            backgroundColor: 'cyan'
          }
        }),
        document.body
      )
    ]
  )
}

export const useProgressBar = () => {
  return useContext(ProgressBarContext)
}
