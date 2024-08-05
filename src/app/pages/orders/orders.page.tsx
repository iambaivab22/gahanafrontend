import React, {useEffect, useState, useCallback, useMemo} from 'react'
import {useDispatch} from 'src/store'
// import {delteProductAction, getProductListAction} from './product.slice'
import {useSelector} from 'react-redux'
import {Box, Button, HStack, Modal, SelectField, Table} from 'src/app/common'
import {useNavigate} from 'react-router-dom'
// import {toast} from 'react-hot-toast'

import {getOrderListAction} from '../web/cart/cart.slice'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font
} from '@react-pdf/renderer'
import {AiOutlineClose} from 'react-icons/ai'

export const OrderListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [orderList, setOrderLists] = useState<any>()
  const [selectedCateory, setSelectedCategory] = useState<any>()
  const orderData = useSelector((state: any) => state.cart)

  console.log(orderData, 'order data')

  useEffect(() => {
    dispatch(
      getOrderListAction({
        onSuccess: () => console.log('Order list fetched Successfully')
      })
    )
  }, [])

  useEffect(() => {
    console.log(orderData, 'orderdata')
  }, [orderData])

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [activeOrderDetals, setActiveOrderDetails] = useState<any>(undefined)

  const orderPdf = useMemo(() => {
    console.log(activeOrderDetals, showDetails, 'sa')
    if (!!activeOrderDetals) {
      return <OrderPDf data={activeOrderDetals} />
    }
  }, [activeOrderDetals, showDetails])

  return (
    <div>
      <Box>
        <HStack justify="space-between" style={{margin: '20px 0'}}>
          <Button
            title="Add Order list"
            onClick={() => console.log('add order list')}
          ></Button>
        </HStack>

        {!showDetails && (
          <Table
            columns={[
              {
                field: 'products',
                name: 'Name',
                render: (datas) => {
                  console.log(datas, 'datasssssssssss')
                  return <div>{datas?.[0]?.productId?.name}</div>
                }
              },

              {
                field: 'userId',
                name: 'Customer Name',
                render: (datas) => {
                  console.log(datas, 'datasssssssssss')
                  return <div>{datas?.email}</div>
                }
              },

              {
                field: 'products',
                name: 'Quantity',
                render: (datas) => {
                  console.log(datas, 'datasssssssssss')
                  return <div>{datas?.[0]?.quantity}</div>
                }
              },
              {
                field: 'products',
                name: 'Price',
                render: (datas) => {
                  console.log(datas, 'datasssssssssss')
                  return <div>{getNprPrice(datas?.[0]?.price)}</div>
                }
              },
              {
                field: 'isInsideValley',
                name: 'Is Inside Valley?',
                render: (datas) => {
                  console.log(datas, '')
                  return <div>{datas === true ? 'yes' : 'no'}</div>
                }
              },
              {
                field: 'shippingLocation',
                name: 'Shipping Location',
                render: (datas) => {
                  console.log(datas, '')
                  return <div>{datas}</div>
                }
              },
              {
                field: 'shippingLocation',
                name: 'Shipping Location',
                render: (datas) => {
                  console.log(datas, '')
                  return <div>{datas}</div>
                }
              },

              {
                field: 'shippingLocation',
                name: 'Order Details',
                render: (datas, item) => {
                  return (
                    <Button
                      title="Show details"
                      onClick={() => {
                        console.log('item', item)
                        setShowDetails(true)
                        setActiveOrderDetails(item)
                      }}
                    ></Button>
                  )
                }
              }

              // {
              //   field: 'subCategories',
              //   name: 'SubCategory',
              //   render: (datas) => (
              //     <div className="subCategoryButton">
              //       {datas?.map((item: any, index: number) => {
              //         return <p className="subCategoryButton-item">{item.name}</p>
              //       })}
              //     </div>
              //   )
              // }
            ]}
            data={(orderData && orderData.orderData) ?? []}
            actions={
              {
                // onView: (item: any) => {
                //   navigate(`view/${item.id}`)
                // },
                // onEdit: (item: any) => {
                //   console.log(item.id, 'item id to delete')
                //   navigate(`update/${item._id}`)
                // },
                // onDelete: (item: any, onCloseModalHandler) => {
                //   dispatch(
                //     deleteShopByBudgetAction({
                //       shopByBudgetId: item._id,
                //       onSuccess: (data: any) => {
                //         onCloseModalHandler()
                //         toast.success('ShopByBudget deleted successfully')
                //         dispatch(
                //           getShopByBudgetListAction({
                //             onSuccess: () => {}
                //           })
                //         )
                //       }
                //     })
                //   )
                // }
              }
            }
            pagination={{
              totalCount: Number(orderData.orderData?.length ?? 1)
              // perPage: Number(import.meta.REACT_APP_TABLE_LIMIT || 10)
            }}
          />
        )}

        {orderPdf}

        <AiOutlineClose
          fill="red"
          style={{position: 'fixed', right: '20px', top: '20px', zIndex: '20'}}
          onClick={() => {
            setShowDetails(false)
            setActiveOrderDetails(undefined)
          }}
        />
      </Box>
    </div>
  )
}

const OrderPDf = ({data}) => {
  const meroDate = new Date()

  return (
    <PDFViewer
      style={{
        height: '100vh',
        width: '75vw',
        position: 'absolute',
        top: 0,
        left: '0'
      }}
    >
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            Order Details
          </Text>
          <View style={styles.viewContainer}>
            <View>
              <Text style={styles.origin} fixed>
                Origin
              </Text>
              <Text style={{fontSize: '16px', fontWeight: 800, lineHeight: 2}}>
                KTM
              </Text>
            </View>

            <View>
              <Text style={styles.destination}>Destination</Text>
              <Text style={{fontSize: '16px', fontWeight: 800}}>
                {data.shippingLocation}
              </Text>
            </View>

            <View>
              <Text style={styles.destination}>Product</Text>
              <Text style={{fontSize: '16px', fontWeight: 800}}>
                {data.quantity}
              </Text>
            </View>
          </View>
          {/* <Image
        style={styles.image}
        src="/images/quijote1.jpg"
      /> */}

          <View style={styles.viewContainer}>
            <View style={{marginTop: '40px'}}>
              <Text style={{fontSize: '16px', fontWeight: 600}}>COD Value</Text>
              <Text style={{fontSize: '16px', fontWeight: 800}}>jflkdsf</Text>
            </View>

            <View style={{marginTop: '40px'}}>
              <Text style={{fontSize: '16px', fontWeight: 600}}>Quantity</Text>
              <Text style={{fontSize: '16px', fontWeight: 800}}>
                {data.products[0].quantity}
              </Text>
            </View>

            <View style={{marginTop: '40px'}}>
              <Text style={{fontSize: '16px', fontWeight: 600}}>Price</Text>
              <Text style={{fontSize: '16px', fontWeight: 800}}>
                {data.products[0].price}
              </Text>
            </View>
          </View>

          <View style={styles.viewContainer}>
            <View style={styles.viewContainer}>
              <View style={{marginTop: '40px'}}>
                <Text style={{fontSize: '16px', fontWeight: 600}}>
                  Shipper details
                </Text>
                <Text
                  style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
                >
                  Aabhushan Gallery
                </Text>

                <Text
                  style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
                >
                  Lavi Prajapati
                </Text>

                <Text
                  style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
                >
                  Kathmandu,Nepal 44600
                </Text>

                <View
                  style={{
                    ...styles.viewContainer,
                    justifyContent: 'flex-start',
                    gap: '10px',
                    marginTop: '5px'
                  }}
                >
                  <Text style={{fontSize: '16px', fontWeight: 800}}>Tel:</Text>
                  <Text style={{fontSize: '14px', fontWeight: 800}}>
                    9841934343
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.viewContainer}>
              <View style={{marginTop: '40px'}}>
                <Text style={{fontSize: '16px', fontWeight: 600}}>
                  Consignee Details
                </Text>
                <Text
                  style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
                >
                  {data.userId?.email}
                </Text>
                {/* 
              <Text
                style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
              >
                {}
              </Text> */}

                <Text
                  style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
                >
                  {data.shippingLocation}
                </Text>

                <View
                  style={{
                    ...styles.viewContainer,
                    justifyContent: 'flex-start',
                    gap: '10px',
                    marginTop: '5px'
                  }}
                >
                  <Text style={{fontSize: '16px', fontWeight: 800}}>
                    Mobile
                  </Text>
                  <Text style={{fontSize: '14px', fontWeight: 800}}>
                    9841934343
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.viewContainer}>
            <Text></Text>

            <View>
              <Text style={{fontSize: '14px', fontWeight: 800}}>
                Print Date:
                {/* {date} */}
              </Text>

              <Text style={{fontSize: '14px', fontWeight: 800}}>
                {meroDate.toLocaleDateString()}
              </Text>
            </View>
          </View>

          <Text
            style={styles.pageNumber}
            render={({pageNumber, totalPages}) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  )
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  origin: {
    fontSize: 18,
    textAlign: 'center'
    // fontFamily: 'Oswald',
    // float: 'left'
  },
  destination: {
    fontSize: 18,
    textAlign: 'center'
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '20px',
    width: '75vw'
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 800
    // color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  }
})
