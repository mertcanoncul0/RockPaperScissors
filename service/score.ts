'use client'

import { myToast } from '@/lib/helper'

export async function scoreUpdate(winningScore: number, local: boolean) {
  const response = await fetch('/api/users/score', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ score: winningScore, local }),
  })

  if (response.ok) {
    myToast('Skor güncellendi!', 'success', 1300)
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
    myToast('Oynanılan maçlara eklendi!', 'success', 1300)
  }
}
