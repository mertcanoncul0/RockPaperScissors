import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, username, password } = await request.json()

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: 'Tüm alanlar gereklidir' },
      { status: 400 }
    )
  }

  const findUserByEmail = await prisma.user.findFirst({ where: { email } })
  const findUserByUsername = await prisma.user.findFirst({
    where: { username },
  })

  if (findUserByEmail || findUserByUsername) {
    if (
      findUserByEmail?.username?.toLowerCase() === username.toLowerCase() ||
      findUserByUsername?.email?.toLowerCase() === email.toLowerCase()
    ) {
      return NextResponse.json(
        { message: 'Bu isim zaten bir kullanıcıya kayıtlı' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Bu Email zaten bir kullanıcıya kayıtlı' },
      { status: 409 }
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

  return NextResponse.json({ ...newUser, message: 'Kaydınız Başarılı' })
}
