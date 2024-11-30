import prisma from '@/lib/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || 1
  const limit = searchParams.get('limit') || 10

  const take = Number(limit)
  const skip = (Number(page) - 1) * take

  const totalRecords = await prisma.user.count()

  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: {
      score: 'desc',
    },
  })

  const usersWithRate = users.map((user) => {
    if (user.playedMatch > 1) {
      return {
        ...user,
        wonRate: ((user.wonMatch / user.playedMatch) * 100).toFixed(2),
      }
    }

    return {
      ...user,
      wonRate: 0,
    }
  })

  console.log(usersWithRate)

  return NextResponse.json({
    data: usersWithRate,
    page: Number(page),
    limit: take,
    totalRecords,
    totalPages: Math.ceil(totalRecords / take),
  })
}
