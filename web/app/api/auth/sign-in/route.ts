import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email veya şifre yanlış' },
      { status: 400 }
    )
  }

  const user = await prisma.user.findFirst({ where: { email } })

  if (!user) {
    return NextResponse.json(
      { error: "bu mail'e ait bir kullanıcı bulunamadı" },
      { status: 404 }
    )
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return NextResponse.json({ error: 'Şifre yanlış' }, { status: 400 })
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  const response = NextResponse.json({ ...user, token }, { status: 200 })

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return response
}
