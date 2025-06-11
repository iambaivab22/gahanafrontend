import React, {useEffect, useState, useCallback, useMemo} from 'react'
import {useDispatch} from 'src/store'
import ReactDOM from 'react-dom/client'
// import {delteProductAction, getProductListAction} from './product.slice'
import {useSelector} from 'react-redux'
import {
  Box,
  Button,
  CheckBox,
  HStack,
  Modal,
  SelectField,
  Table
} from 'src/app/common'
import {useNavigate} from 'react-router-dom'
// import {toast} from 'react-hot-toast'

import {getOrderListAction} from '../web/cart/cart.slice'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import QRCode from 'qrcode'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image
} from '@react-pdf/renderer'
import {AiOutlineClose} from 'react-icons/ai'
import {MdCheckBoxOutlineBlank} from 'react-icons/md'
import {IoCheckboxOutline} from 'react-icons/io5'

import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react'

export const OrderListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [orderList, setOrderLists] = useState<any>()
  const [selectedCateory, setSelectedCategory] = useState<any>()
  const orderData = useSelector((state: any) => state.cart)

  console.log(orderData, 'order item')

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
  const [activeData, setActiveData] = useState<any>([{}])

  const orderPdf = useMemo(() => {
    console.log(activeData, 'sa')
    if (!!activeOrderDetals) {
      return <OrderPDf data={activeData} />
    }
  }, [activeOrderDetals, showDetails])

  // useEffect(() => {
  //   activeOrderDetals && setActiveData([activeOrderDetals])
  // }, [activeOrderDetals])

  const [dataToPrint, setDataToPrint] = useState<any>([])

  const [isChecked, setIsChecked] = useState(false)

  const BulkActionHandler = (value, ordersData) => {
    console.log(value, 'ordersData', ordersData)
    if (value) {
      setDataToPrint((prev: any) => [
        ...prev,
        {data: ordersData, isPrinting: value}
      ])
    } else {
    }
  }

  console.log(dataToPrint, 'data to print')

  const [active, setActive] = useState(false)

  console.log('active data item', activeData)

  return (
    <div>
      <Box>
        <HStack justify="space-between" style={{margin: '20px 0'}}>
          <Button
            title="Add Order list"
            onClick={() => console.log('add order list')}
          ></Button>

          <Button
            title="Print all orders"
            onClick={() => {
              console.log('acccc', activeData)
              setShowDetails(true)
              setActiveOrderDetails(activeData)
            }}
          ></Button>
        </HStack>

        {!showDetails && (
          <Table
            columns={[
              {
                field: 'products',
                name: 'Print order Details',
                render: (datas, itemvalue) => {
                  return (
                    <div
                      onClick={() => {
                        {
                          activeData?.find((item, index) => {
                            return item._id === itemvalue._id
                          }) !== undefined
                            ? setActiveData(
                                activeData.filter((item, index) => {
                                  return item._id !== itemvalue._id
                                })
                              )
                            : setActiveData((prev) => [...prev, itemvalue])

                          BulkActionHandler(true, itemvalue)
                        }
                      }}
                    >
                      {activeData?.find((item, index) => {
                        return item._id === itemvalue._id
                      }) !== undefined ? (
                        <IoCheckboxOutline size={22} />
                      ) : (
                        <MdCheckBoxOutlineBlank size={22} />
                      )}
                    </div>
                  )
                }
              },
              ,
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
                  return <div>{datas?.email}</div>
                }
              },

              {
                field: 'products',
                name: 'Quantity',
                render: (datas) => {
                  return <div>{datas?.[0]?.quantity}</div>
                }
              },
              {
                field: 'products',
                name: 'Price',
                render: (datas) => {
                  return <div>{getNprPrice(datas?.[0]?.price)}</div>
                }
              },

              {
                field: 'OrderedAt',
                name: 'Ordered At',
                render: (datas) => {
                  const value = new Date(datas?.replace(/,/g, ''))
                  console.log(datas, value, 'datas to date')

                  // function convertUnixToISO(unixMs) {
                  //   return new Date(unixMs).toISOString()
                  // }

                  // const data = convertUnixToISO(value)
                  // console.log('pani paryo hai finaly', data)
                  // console.log(datas, 'datas to date value')
                  return <div>{datas ?? '-'}</div>
                }
              },

              {
                field: 'productOrderId',
                name: 'Ordered Id',
                render: (datas) => {
                  const value = new Date(datas?.replace(/,/g, ''))
                  console.log(datas, value, 'datas to date')

                  // function convertUnixToISO(unixMs) {
                  //   return new Date(unixMs).toISOString()
                  // }

                  // const data = convertUnixToISO(value)
                  // console.log('pani paryo hai finaly', data)
                  // console.log(datas, 'datas to date value')
                  return <div>{datas ?? '-'}</div>
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
                        setActiveData([item])
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
            setActiveOrderDetails(undefined)
            setActiveData([{}])
          }}
        />
      </Box>
    </div>
  )
}

// const OrderPDf = ({data}) => {
//   const meroDate = new Date()

//   return (
//     <PDFViewer
//       style={{
//         height: '100vh',
//         width: '75vw',
//         position: 'absolute',
//         top: 0,
//         left: '0'
//       }}
//     >
//       <Document>
//         <Page style={styles.body}>
//           <View style={styles.orderDetailsContainer}>
//             <Image
//               style={styles.images}
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNyE_y63CdiQwrOyaUDsNWmntsXiuAm4Izg&s"
//             ></Image>

//             <Text style={styles.header}>ORDER DETAILS</Text>
//           </View>
//           {/* </View> */}

//           <View style={styles.viewContainer}>
//             <View>
//               <Text style={styles.origin} fixed>
//                 Origin
//               </Text>
//               <Text
//                 style={{
//                   fontSize: '16px',
//                   fontWeight: 800,
//                   lineHeight: 2,
//                   marginLeft: '10px'
//                 }}
//               >
//                 KTM
//               </Text>
//             </View>

//             <View>
//               <Text style={styles.destination}>Destination</Text>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 800, marginLeft: '10px'}}
//               >
//                 {data.shippingLocation}
//               </Text>
//             </View>

//             <View>
//               <Text style={styles.destination}>Product</Text>

//               <Text
//                 style={{fontSize: '16px', fontWeight: 800, marginLeft: '10px'}}
//               >
//                 {data?.name}
//               </Text>
//             </View>
//           </View>
//           {/* <Image
//         style={styles.image}
//         src="/images/quijote1.jpg"
//       /> */}

//           <View style={styles.viewContainer}>
//             <View style={{marginTop: '40px'}}>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 600, fontFamily: 'Arvo'}}
//               >
//                 COD Value
//               </Text>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 800, marginLeft: '10px'}}
//               >
//                 COD@#$@E$123
//               </Text>
//             </View>

//             <View style={{marginTop: '40px'}}>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 600, fontFamily: 'Arvo'}}
//               >
//                 Quantity
//               </Text>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 800, marginLeft: '10px'}}
//               >
//                 {data.products[0].quantity}
//               </Text>
//             </View>

//             <View style={{marginTop: '40px'}}>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 600, fontFamily: 'Arvo'}}
//               >
//                 Price
//               </Text>
//               <Text
//                 style={{fontSize: '16px', fontWeight: 800, marginLeft: '10px'}}
//               >
//                 {data.products[0].price}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.viewContainer}>
//             <View style={styles.viewContainer}>
//               <View style={{marginTop: '40px'}}>
//                 <Text
//                   style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     fontFamily: 'Arvo'
//                   }}
//                 >
//                   Shipper details
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: '14px',
//                     fontWeight: 800,
//                     marginTop: '5px',
//                     marginLeft: '10px'
//                   }}
//                 >
//                   Aabhushan Gallery
//                 </Text>

//                 <Text
//                   style={{
//                     fontSize: '14px',
//                     fontWeight: 800,
//                     marginTop: '5px',
//                     marginLeft: '10px'
//                   }}
//                 >
//                   Lavi Prajapati
//                 </Text>

//                 <Text
//                   style={{
//                     fontSize: '14px',
//                     fontWeight: 800,
//                     marginTop: '5px',
//                     marginLeft: '10px'
//                   }}
//                 >
//                   Kathmandu,Nepal 44600
//                 </Text>

//                 <View
//                   style={{
//                     ...styles.viewContainer,
//                     justifyContent: 'flex-start',
//                     gap: '10px',
//                     marginTop: '5px'
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: '16px',
//                       fontWeight: 800,
//                       marginLeft: '10px'
//                     }}
//                   >
//                     Tel:
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: '14px',
//                       fontWeight: 800,
//                       marginLeft: '10px'
//                     }}
//                   >
//                     9841934343
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.viewContainer}>
//               <View style={{marginTop: '40px'}}>
//                 <Text
//                   style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     fontFamily: 'Arvo'
//                   }}
//                 >
//                   Consignee Details
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: '14px',
//                     fontWeight: 800,
//                     marginTop: '5px',
//                     marginLeft: '10px'
//                   }}
//                 >
//                   {data.userId?.email}
//                 </Text>
//                 {/*
//               <Text
//                 style={{fontSize: '14px', fontWeight: 800, marginTop: '5px'}}
//               >
//                 {}
//               </Text> */}

//                 <Text
//                   style={{
//                     fontSize: '14px',
//                     fontWeight: 800,
//                     marginLeft: '10px'
//                   }}
//                 >
//                   {data.shippingLocation}
//                 </Text>

//                 <View
//                   style={{
//                     ...styles.viewContainer,
//                     justifyContent: 'flex-start',
//                     gap: '5px'
//                     // marginTop: '5px'
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: '14px',
//                       fontWeight: 800,
//                       marginLeft: '10px'
//                     }}
//                   >
//                     Mobile:
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: '14px',
//                       fontWeight: 800,
//                       marginLeft: '10px'
//                     }}
//                   >
//                     9841934343
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View
//             style={{
//               width: '100%',

//               textAlign: 'right',
//               marginTop: '20px'
//             }}
//           >
//             <Text></Text>

//             <View style={{borderTop: '1px solid black'}}>
//               <Text
//                 style={{
//                   fontSize: '14px',
//                   fontWeight: 800,
//                   fontFamily: 'Arvo',
//                   marginTop: '20px'
//                 }}
//               >
//                 Print Date:
//                 {/* {date} */}
//               </Text>

//               <Text
//                 style={{fontSize: '14px', fontWeight: 800, marginLeft: '10px'}}
//               >
//                 {meroDate.toLocaleDateString()}
//               </Text>
//             </View>
//           </View>

//           <Text
//             style={styles.pageNumber}
//             render={({pageNumber, totalPages}) =>
//               `${pageNumber} / ${totalPages}`
//             }
//             fixed
//           />
//         </Page>
//       </Document>
//     </PDFViewer>
//   )
// }

const OrderPDf = ({data}) => {
  const currentDate = new Date()

  const [qrImages, setQrImages] = useState([])

  const generateQrCodeUrl = async (text: string) => {
    try {
      const image = await QRCode.toDataURL(text, {
        width: 280, // Set the width and height to 200px

        errorCorrectionLevel: 'M'
      })
      console.log(image, 'image value')
      return image
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {data
          ?.filter((item) => Object.keys(item).length !== 0)
          ?.map((item, index) => {
            console.log(item, 'itemsssssss')

            return (
              <Page
                size={{width: 216, height: 288}}
                style={styles.page}
                key={index}
              >
                {/* Header */}
                <View style={styles.header}>
                  <Image
                    style={styles.logo}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNyE_y63CdiQwrOyaUDsNWmntsXiuAm4Izg&s"
                  />
                  <Text style={styles.headerTitle}>ORDER DETAILS</Text>
                </View>
                {/* Basic Info Section */}
                <View style={styles.box}>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>Origin</Text>
                      <Text style={styles.value}>KTM</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.label}>Destination</Text>
                      <Text style={styles.value}>{item.shippingLocation}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>Product</Text>
                      <Text style={styles.smallValue}>
                        {item?.products[0]?.productId?.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.qrcode}>
                    <Image
                      style={styles.qrCode}
                      // src={generateQrCodeUrl(item.shippingLocation ?? '')}

                      src={generateQrCodeUrl(
                        `http://localhost:3000/orderDetails?orderId=${item?._id}&isForOrder=true`
                      )}
                    />
                  </View>
                </View>
                {/* Order Details Section */}
                <View style={[styles.box, {backgroundColor: '#f0f7ff'}]}>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>COD Value</Text>
                      <Text style={styles.value}>COD@#$</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.label}>Quantity</Text>
                      <Text style={styles.value}>
                        {item?.products?.[0]?.quantity}
                      </Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.label}>Price</Text>
                      <Text style={styles.value}>
                        {item?.products[0]?.price}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Contact Details Section */}
                <View style={styles.section}>
                  <View style={styles.row}>
                    <View style={[styles.column, styles.box]}>
                      <Text style={styles.label}>Shipper Details</Text>
                      <Text style={styles.value}>Aabhushan Gallery</Text>
                      <Text style={styles.smallValue}>
                        Kathmandu, Nepal 44600
                      </Text>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Tel:</Text>
                        <Text style={styles.contactValue}>9841934343</Text>
                      </View>
                    </View>
                    <View style={[styles.column, styles.box]}>
                      <Text style={styles.label}>Consignee Details</Text>
                      <Text style={styles.smallValue}>
                        {item.userId?.email}
                      </Text>
                      <Text style={styles.smallValue}>
                        {item.shippingLocation}
                      </Text>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Mobile:</Text>
                        <Text style={styles.contactValue}>9841934343</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Footer */}
                <View style={styles.footer}>
                  <Text style={styles.printDate}>
                    Print Date: {currentDate.toLocaleDateString()}
                  </Text>
                </View>
              </Page>
            )
          })}
      </Document>
    </PDFViewer>
  )
}

// Font.register({
//   family: 'Arvo',
//   src: 'http://fonts.gstatic.com/s/arvo/v9/MViwy4K6e56oHcyeMzjbCQ.ttf'
// })

const styles = StyleSheet.create({
  viewer: {
    height: '100vh',
    width: '75vw',
    position: 'absolute',
    top: 0,
    left: '0'
  },
  page: {
    padding: 12,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: '0.5px solid #666'
  },
  qrcode: {
    height: 20,
    width: 20
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  headerTitle: {
    fontSize: 12,
    // fontFamily: 'Arvo',
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  column: {
    flex: 1,
    paddingRight: 4
  },
  label: {
    fontSize: 7,
    color: '#444',
    marginBottom: 2
    // fontFamily: 'Arvo'
  },
  value: {
    fontSize: 6,
    fontWeight: 'bold'
  },
  smallValue: {
    fontSize: 6,
    fontWeight: 'bold'
  },
  divider: {
    borderBottom: '0.5px solid #eee',
    marginVertical: 6
  },
  contactInfo: {
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'center'
  },
  contactLabel: {
    fontSize: 7,
    marginRight: 2
  },
  contactValue: {
    fontSize: 7,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    textAlign: 'right'
  },
  printDate: {
    fontSize: 7,
    color: '#666'
  },
  box: {
    padding: 6,
    backgroundColor: '#f8f8f8',
    borderRadius: 2,
    marginBottom: 6
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  qrCode: {
    width: 300,
    objectFit: 'contain'
  }
})
