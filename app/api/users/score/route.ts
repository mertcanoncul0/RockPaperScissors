import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { score } = await request.json()

  if (!token) {
    return {
      status: 401,
      json: { message: 'Token yok' },
    }
  }

  const { id } = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string }

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return {
      status: 404,
      json: { message: 'Kullanıcı bulunamadı' },
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { score: user.score + score },
  })

  return NextResponse.json({ ...updatedUser }, { status: 200 })
}
