import React, {useCallback, useMemo, useRef} from 'react'
import {
  TableContainer as MaterialTableContainer,
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHead as MaterialTableHead,
  TableRow as MaterialTableRow,
  Paper as MaterialPaper,
  Pagination as MaterialPagination
} from '@mui/material'
import {IoMdListBox} from 'react-icons/io'
import {AiFillDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'

import {HStack, ToolTip, ConfirmationModal} from 'src/app/common'
import {Loader} from 'src/app/components'

import {ActionButton, StyledTableRow, StyledTableCell} from './table.style'

import {getParsedQuery} from 'src/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import {useQuery} from 'src/hooks'

export const Table = <T, K extends Extract<keyof T, string>>({
  columns,
  data,
  actions,
  loading = false,
  pagination,
  onPageChange
}: {
  columns: Array<{
    field: any
    name: string
    colStyle?: React.CSSProperties
    render?: (item: any) => React.ReactNode
  }>
  data: Array<T>
  actions?: {
    onEdit?: (item: T) => void
    onDelete?: (item: T, onCloseModalHandler: any) => void
    onView?: (item: T) => void
  }
  loading?: boolean
  pagination?: {
    perPage?: number
    totalCount: number
  }
  onPageChange?: (page: number) => void
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery()
  const actionsRef = useRef(actions)
  const hasActions = useMemo(() => {
    if (actionsRef.current) {
      return Object.keys(actionsRef.current).length > 0
    }
    return false
  }, [])

  // const searchParams = useMemo(
  //   () => new URLSearchParams(location.search),
  //   [location.search]
  // )
  const page = query?.page

  const onChange = useCallback(
    (newPageNumber: number) => {
      const queryy = {...query}
      queryy.page = newPageNumber
      navigate(location.pathname + `${getParsedQuery(queryy)}`)
      onPageChange?.(newPageNumber)
    },
    [location]
  )

  return (
    <>
      <MaterialTableContainer
        component={MaterialPaper}
        variant="outlined"
        style={{
          border: '1px solid #e1e1e1',
          paddingBottom: 8
        }}
      >
        <MaterialTable aria-label="customized table">
          <MaterialTableHead>
            <MaterialTableRow>
              {columns.map((item, i) => {
                if (item.name) {
                  return (
                    <StyledTableCell
                      style={item?.colStyle}
                      key={i}
                      align={`${i === 0 ? 'left' : 'center'}`}
                    >
                      {item.name}
                    </StyledTableCell>
                  )
                } else {
                  return (
                    <StyledTableCell
                      style={item.colStyle}
                      key={i}
                      align={`${i === 0 ? 'left' : 'center'}`}
                    >
                      {item.field}
                    </StyledTableCell>
                  )
                }
              })}
              {hasActions ? (
                <StyledTableCell align="center">Actions</StyledTableCell>
              ) : null}
            </MaterialTableRow>
          </MaterialTableHead>

          {loading ? (
            <MaterialTableBody>
              <MaterialTableRow>
                <StyledTableCell align="center" colSpan={columns.length + 1}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100px'
                    }}
                  >
                    <Loader
                      variant="three"
                      loading={true}
                      color="#0051ff"
                      size={26}
                    />
                  </div>
                </StyledTableCell>
              </MaterialTableRow>
            </MaterialTableBody>
          ) : data?.length > 0 ? (
            <MaterialTableBody>
              {data.map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    {columns.map((col, i) => {
                      if (col.render) {
                        return (
                          <StyledTableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            {col.render(item[col.field])}
                          </StyledTableCell>
                        )
                      } else {
                        return (
                          <StyledTableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            {item[col.field] as string}
                          </StyledTableCell>
                        )
                      }
                    })}
                    {hasActions ? (
                      <StyledTableCell align="center" width={50}>
                        <HStack gap="$3">
                          {actionsRef.current?.onView && (
                            <ToolTip text="View">
                              <ActionButton
                                onClick={(e) => {
                                  e.stopPropagation()
                                  actionsRef.current?.onView?.(item)
                                }}
                              >
                                <IoMdListBox size={22} />
                              </ActionButton>
                            </ToolTip>
                          )}

                          {actionsRef.current?.onEdit && (
                            <ToolTip text="Edit">
                              <ActionButton
                                onClick={(e) => {
                                  e.stopPropagation()
                                  actionsRef.current?.onEdit?.(item)
                                }}
                              >
                                <MdEdit size={22} />
                              </ActionButton>
                            </ToolTip>
                          )}

                          {actionsRef.current?.onDelete && (
                            <ToolTip text="Delete">
                              <ConfirmationModal
                                label="want to delete this item ?"
                                danger
                                cancelLabel="Cancel"
                                confirmLabel="Delete"
                                onConfirmClick={(onCloseModalHandler) =>
                                  actionsRef.current?.onDelete?.(
                                    item,
                                    onCloseModalHandler
                                  )
                                }
                                displayElement={
                                  <ActionButton className="action-delete">
                                    <AiFillDelete size={22} />
                                  </ActionButton>
                                }
                              />
                            </ToolTip>
                          )}

                          {/* {actionsRef.current?.onDelete && (
                            <ToolTip text="Delete">
                              <Modal
                                trigger={() => (
                                  <ActionButton className="action-delete">
                                    <AiFillDelete size={22} />
                                  </ActionButton>
                                )}
                              >
                                {(modal) => (
                                  <VStack gap="$4">
                                    <div
                                      style={{
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      Are you sure you want to delete ?
                                    </div>
                                    <HStack gap="$2" justify="end">
                                      <Button
                                        variant="outlined"
                                        color="default"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          modal.close()
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        color="error"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          actionsRef.current?.onDelete?.(item)
                                          modal.close()
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </HStack>
                                  </VStack>
                                )}
                              </Modal>
                            </ToolTip>
                          )} */}
                        </HStack>
                      </StyledTableCell>
                    ) : null}
                  </StyledTableRow>
                )
              })}
            </MaterialTableBody>
          ) : (
            <MaterialTableBody>
              <MaterialTableRow>
                <StyledTableCell align="center" colSpan={columns.length + 1}>
                  No data
                </StyledTableCell>
              </MaterialTableRow>
            </MaterialTableBody>
          )}
        </MaterialTable>
      </MaterialTableContainer>

      {!loading && data?.length > 0 && pagination && pagination.totalCount ? (
        <div style={{width: '100%', display: 'flex'}}>
          <MaterialPagination
            style={{
              marginLeft: 'auto',
              marginTop: 20,
              display: 'inline-block'
            }}
            count={Math.ceil(
              pagination.totalCount / (pagination.perPage ?? 10)
            )}
            boundaryCount={1}
            page={page ? Number(page) : 1}
            variant="outlined"
            shape="rounded"
            onChange={(e, page) => {
              e.preventDefault()
              onChange(page)
            }}
          />
        </div>
      ) : null}
    </>
  )
}
