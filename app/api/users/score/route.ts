import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { score, local } = await request.json()

  console.log(score, local);


  if (!token) {
    return NextResponse.json({ message: 'Token yok' }, { status: 401 })
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        score: user.score + score,
        wonMatch: !local ? user.wonMatch + 1 : user.wonMatch,
      },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Geçersiz token' }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Token yok' }, { status: 401 })
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.user.update({
      where: { id },
      data: {
        playedMatch: user.playedMatch + 1,
      },
    })

    return NextResponse.json(
      { message: 'Oyun başarıyla kaydedildi' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Geçersiz token' }, { status: 400 })
  }
}
