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
  })

  const rowsPerPage = 10

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
  }, [data?.count, rowsPerPage])

  const loadingState = isLoading || data.data?.length === 0 ? 'loading' : 'idle'

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
          Username
        </TableColumn>
        <TableColumn key="playedMatch" className="text-lg">
          Played Match
        </TableColumn>
        <TableColumn key="score" className="text-lg">
          Score
        </TableColumn>
        <TableColumn key="wonRate" className="text-lg">
          Win Rate
        </TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: any) => (
          <TableRow key={item?.name}>
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
