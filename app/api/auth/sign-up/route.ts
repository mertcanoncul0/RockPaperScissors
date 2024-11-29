import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, username, password } = await request.json()

  if (!email || !password || !username) {
    return NextResponse.json(
      { error: 'Tüm alanlar gereklidir' },
      { status: 400 }
    )
  }

  const user = await prisma.user.findFirst({ where: { email } })

  if (user) {
    if (user.username?.toLowerCase() === username.toLowerCase()) {
      return NextResponse.json(
        { error: 'Bu isim zaten bir kullanıcıya kayıtlı' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Bu Email zaten bir kullanıcıya kayıtlı' },
      { status: 404 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      score: 0,
      playedMatch: 0,
      wonRate: 0,
      wonMatch: 0,
    },
  })

  return NextResponse.json({ ...newUser })
}
