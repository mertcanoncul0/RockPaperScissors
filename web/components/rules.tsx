'use client'

import { useState } from 'react'
import Modal from '@/components/modal'

export default function Rules() {
  const [showRules, setShowRules] = useState(false)

  const openRules = () => setShowRules(true)
  const closeRules = () => setShowRules(false)

  return (
    <>
      <button
        className='absolute bottom-16 lg:bottom-4 lg:right-4 border border-white rounded-lg text-white px-9 py-2 text-lg font-bold tracking-widest uppercase hover:bg-black transition-colors hover:border-black'
        onClick={openRules}
      >
        Rules
      </button>

      <Modal title='Rules' showRules={showRules} closeRules={closeRules} />
    </>
  )
}
