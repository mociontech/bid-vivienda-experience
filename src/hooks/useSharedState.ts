import { useCallback, useEffect, useState } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { db, sessionPath } from '../lib/firebase'
import { initialSharedState, type SharedState } from '../types/experience'

const STATE_PATH = sessionPath('state')

export function useSharedState() {
  const [state, setState] = useState<SharedState>(initialSharedState)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const stateRef = ref(db, STATE_PATH)
    const unsubscribe = onValue(stateRef, (snapshot) => {
      const value = snapshot.val() as Partial<SharedState> | null
      setState({ ...initialSharedState, ...value })
      setConnected(true)
    })
    return () => unsubscribe()
  }, [])

  const patch = useCallback((partial: Partial<SharedState>) => {
    return update(ref(db, STATE_PATH), { ...partial, updatedAt: Date.now() })
  }, [])

  return { state, patch, connected }
}
