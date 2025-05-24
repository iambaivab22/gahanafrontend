import {useEffect} from 'react'

export const useBodyOverflowHiddenOnClassInView = (classNames: string[]) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting)
        document.body.style.overflow = anyVisible ? 'hidden' : ''
      },
      {threshold: 0.01}
    )

    const elements: Element[] = []

    classNames.forEach((className) => {
      const found = document.querySelectorAll(`.${className}`)
      found.forEach((el) => {
        observer.observe(el)
        elements.push(el)
      })
    })

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      document.body.style.overflow = ''
    }
  }, [classNames])
}
