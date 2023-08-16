// import moment from 'moment'
// import {GoLocation} from 'react-icons/go'
// import {Chip, ConfirmationModal} from 'src/app/common'
// import {KeyValueTable} from '../keyValueTable'
// import {getImageUrl} from 'src/helpers/getImageUrl.helper'
// import {useDispatch} from 'src/store'
// import {
//   getBusinessDetailByIdAction,
//   updateBusinessStatusAction
// } from 'src/app/pages/business/business.slice'
// import {CarouselSlider} from '../carouselSlider'

// export const BusinessDetail = ({
//   profile_details,
//   user_details
// }: Comp.BusinessDetailProps) => {
//   const dispatch = useDispatch()

//   console.log(profile_details, 'profile details')

//   return (
//     <div className="businessDetail-container">
//       <div className="businessDetail">
//         <div className="businessDetail-topinfo">
//           <div className="businessDetail-topinfo-leftside">
//             <div className="businessDetail-topinfo-leftside-logo">
//               <img
//                 src={getImageUrl('user', profile_details?.logo)}
//                 alt="logo"
//               />
//             </div>
//             <div className="businessDetail-topinfo-leftside-orgInfo">
//               <div className="businessDetail-topinfo-leftside-orgInfo-title">
//                 <p>{profile_details?.business_name}</p>
//               </div>
//               <div className="businessDetail-topinfo-leftside-orgInfo-location">
//                 <div className="businessDetail-topinfo-leftside-orgInfo-location-icon">
//                   <GoLocation />
//                 </div>
//                 <div className="businessDetail-topinfo-leftside-orgInfo-location-name">
//                   {profile_details?.address}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="businessDetail-topinfo-rightbtn">
//             <Chip
//               title={
//                 user_details?.is_business_approved ? 'Approved' : 'Pending'
//               }
//               color={user_details?.is_business_approved ? 'Green' : 'Crimson'}
//             />
//           </div>
//         </div>

//         <div className="businessDetail-slider">
//           {profile_details?.images?.length && (
//             <CarouselSlider>
//               {profile_details?.images.map((data: string, index: any) => (
//                 <img
//                   src={getImageUrl('user', data)}
//                   alt="image"
//                   className="image"
//                   key={index}
//                 />
//               ))}
//             </CarouselSlider>
//           )}
//         </div>

//         <div className="businessDetail-about">
//           <div className="businessDetail-about-header">
//             <p>About</p>
//           </div>
//           <div
//             className="businessDetail-about-content"
//             dangerouslySetInnerHTML={{__html: profile_details?.about}}
//           />
//         </div>
//         <div className="businessDetail-detail">
//           <div className="businessDetail-detail-header">
//             <p>Details</p>
//           </div>
//           <KeyValueTable
//             details={[
//               {
//                 name: 'Organization Name',
//                 value: profile_details?.business_name
//               },
//               {name: 'Contact Number', value: user_details?.phone},
//               {name: 'District', value: profile_details?.district},
//               {
//                 name: 'Organization Sector',
//                 value: profile_details?.organization_sector
//               },
//               {name: 'Email Address', value: user_details?.email},
//               {name: 'Area', value: profile_details?.address},
//               {
//                 name: 'Establishment Year',
//                 value: profile_details?.establishment_year
//               },
//               {name: 'website', value: profile_details?.website},
//               {
//                 name: 'member since',
//                 value: moment(profile_details?.created_at).fromNow()
//               }
//             ]}
//             repeat={3}
//           />
//         </div>
//         <div className="businessDetail-chip">
//           <ConfirmationModal
//             displayElement={
//               <Chip
//                 title={
//                   user_details?.is_business_approved
//                     ? 'Reject Business'
//                     : 'Approve Business'
//                 }
//                 color={
//                   !user_details?.is_business_approved ? 'Green' : 'Crimson'
//                 }
//               />
//             }
//             label="Do you want to approve this business?"
//             confirmLabel={
//               user_details?.is_business_approved ? 'Reject' : 'Approve'
//             }
//             onConfirmClick={(callback) => {
//               dispatch(
//                 updateBusinessStatusAction({
//                   businessId: Number(user_details?.id),
//                   isBusinessApproved: !user_details?.is_business_approved,
//                   callback: () => {
//                     callback()
//                     dispatch(
//                       getBusinessDetailByIdAction({
//                         businessId: Number(user_details?.id)
//                       })
//                     )
//                   }
//                 })
//               )
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }
