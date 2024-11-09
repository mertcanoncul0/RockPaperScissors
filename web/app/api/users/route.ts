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

  return NextResponse.json({
    data: users,
    page: Number(page),
    limit: take,
    totalRecords,
    totalPages: Math.ceil(totalRecords / take),
  })
}
