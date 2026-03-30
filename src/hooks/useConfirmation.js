import { useState } from 'react'

export function useConfirmation(initialValue = null) {
  const [pending, setPending] = useState(initialValue)
  const request = (value = true) => setPending(value)
  const cancel = () => setPending(null)
  return { pending, request, cancel }
}
