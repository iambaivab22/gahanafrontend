// import {useEffect} from 'react'

// import {Card} from 'src/app/common'
// import {BusinessDetail} from 'src/app/components'
// import {useParams} from 'src/hooks'
// import {useDispatch, useSelector} from 'src/store'
// import {getBusinessDetailByIdAction} from '../../business.slice'

// export const BusinessDetailPage = () => {
//   const businessId = useParams('businessId')
//   const dispatch = useDispatch()
//   const {detail} = useSelector((state) => state.business)
//   useEffect(() => {
//     dispatch(getBusinessDetailByIdAction({businessId: Number(businessId)}))
//   }, [businessId])

//   return (
//     <Card>
//       {detail && (
//         <BusinessDetail
//           profile_details={detail?.profile_details}
//           user_details={detail?.user_details}
//         />
//       )}

//       {/* <Box flexBox vertical pl={32} pr={32} pb={32}>
//         <div className="adsListHeader">Ads List and Job List</div>
//         <Table
//           columns={[
//             {
//               field: 'sn',
//               name: 'S.N'
//             },
//             {
//               field: 'productName',
//               name: 'Product Name',
//               render: (data) => <div>{data}</div>
//             },
//             {
//               field: 'price',
//               name: 'Price',
//               render: (data) => <div>{data}</div>
//             },
//             {
//               field: 'address',
//               name: 'Address',
//               render: (data) => <div>{data}</div>
//             },
//             {
//               field: 'postedDate',
//               name: 'Posted Date',
//               render: (data) => <div>{data}</div>
//             }
//           ]}
//           data={AdsData}
//           actions={{
//             onView: (item) => {
//               navigate('/')
//             },
//             onDelete: (item, onCloseModalHandler) => {
//               onCloseModalHandler()
//             }
//           }}
//           pagination={{perPage: 1, totalCount: 10}}
//         />
//       </Box> */}
//     </Card>
//   )
// }
