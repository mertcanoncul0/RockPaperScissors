'use client'

import { toast } from 'sonner'

export async function scoreUpdate(winningScore: number) {
  const response = await fetch('/api/users/score', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ score: winningScore }),
  })

  if (response.ok) {
    toast.success('Skor güncellendi!')
  }
}

export async function playedMatch() {
  const response = await fetch('/api/users/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (response.ok) {
    toast.success('Oynanan maç eklendi!')
  }
}
