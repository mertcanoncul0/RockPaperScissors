import React, { useMemo, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from '@nextui-org/react'
import useSWR from 'swr'

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json())

export default function LeaderTable() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSWR(`/api/users?page=${page}`, fetcher, {
    keepPreviousData: true,
  }) as {
    data: {
      data: {
        username: string
        playedMatch: number
        score: number
        wonRate: number
      }[]
      count: number
    }
    isLoading: boolean
  }

  const rowsPerPage = 10

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
  }, [data?.count, rowsPerPage])

  const loadingState = isLoading || data.data?.length === 0 ? 'loading' : 'idle'
  console.log(data)

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="username" className="text-lg">
          Kullanıcı Adı
        </TableColumn>
        <TableColumn key="playedMatch" className="text-lg">
          Oynanan Maç
        </TableColumn>
        <TableColumn key="score" className="text-lg">
          Skor
        </TableColumn>
        <TableColumn key="wonRate" className="text-lg">
          Kazanma Oranı
        </TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={`${item?.username}-${item.playedMatch}`}>
            {(columnKey) => (
              <TableCell className="table-cell">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
