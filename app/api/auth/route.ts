import prisma from '@/lib/db'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Token yok' }, { status: 401 })
  }

  const { id } = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string }

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return NextResponse.json(
      { message: 'Kullanıcı bulunamadı' },
      { status: 404 }
    )
  }

  return NextResponse.json({ ...user }, { status: 200 })
}
