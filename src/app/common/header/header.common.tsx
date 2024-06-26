// import React, {useState, useRef, useLayoutEffect, useEffect} from 'react'
// import useMeasure from 'react-use-measure'
// import {toast} from 'react-hot-toast'
// import {useSpringValue, animated} from '@react-spring/web'
// import {
//   MdMenu,
//   MdKeyboardArrowDown,
//   BsThreeDotsVertical,
//   ImUser,
//   IoCloseCircle,
//   IoIosArrowForward,
//   IoIosArrowBack,
//   MdCheck
// } from 'react-icons/all'

// import {
//   InputField,
//   Button,
//   Box,
//   Modal,
//   Breadcrumb,
//   ToolTip,
//   Dropdown,
//   Menu
// } from 'src/app/common'
// import {useInput} from 'src/hooks'
// import {useAuth} from 'src/app/routing'
// import {isValid, validator} from 'src/utils'
// // import {userAuthLogoutAction} from 'src/redux'
// import companyLogo from 'src/assets/icons/logo1.png'
// import {useDispatch} from 'src/store'

// const companyData = [
//   {
//     id: 1,
//     name: 'Codniv Innovations Pvt. Ltd.',
//     img: companyLogo,
//     role: 'Superadmin'
//   },
//   {
//     id: 2,
//     name: 'PEES Travels Pvt. Ltd.',
//     img: companyLogo,
//     role: 'SD'
//   },
//   {
//     id: 3,
//     name: 'SEED Pvt. Ltd.',
//     img: companyLogo,
//     role: 'Admin'
//   }
// ]

// export const Header = () => {
//   // const dispatch = useDispatch()
//   const [visible, setVisible] = useState<boolean>(false)

//   const {handleLogout, setSidenavExpand, sidenavExpand} = useAuth()
//   // const {register, handleSubmit, errors, watch} = useForm()

//   const [companySelected, setCompanySelected] = useState(
//     companyData.filter((_, index) => index === 0)[0]
//   )

//   // const newPassword = useRef({})
//   // newPassword.current = watch('newPassword', '')

//   const [switchFlag, setSwitchFlag] = useState<boolean>(true)

//   const [leftRef, {height: leftHeight}] = useMeasure()
//   const [rightRef, {height: rightHeight}] = useMeasure()

//   const translateX = useSpringValue(0)
//   const height = useSpringValue(70)

//   useLayoutEffect(() => {
//     // console.log('leftHeight, rightHeight: ', leftHeight, rightHeight)
//     if (leftHeight > 0 && rightHeight > 0)
//       height.start(switchFlag ? leftHeight + 67 : rightHeight + 77)
//   }, [switchFlag])

//   return (
//     <div className="header-container">
//       <div className="header">
//         <div className="header-left">
//           <div
//             className="header-menu"
//             onClick={() => setSidenavExpand((prev) => !prev)}
//           >
//             {sidenavExpand ? (
//               <BsThreeDotsVertical size={14} />
//             ) : (
//               <MdMenu size={16} />
//             )}
//           </div>
//           <div className="header-breadcrumb">
//             <Breadcrumb />
//           </div>
//         </div>

//         <div className="header-right">
//           <div className="logged-user">
//             <Dropdown
//               triggerToggle
//               style={{
//                 top: 40
//               }}
//               placement="bottomright"
//               trigger={() => (
//                 <div className="logged-user-container">
//                   <span className="logged-user-icon">
//                     <ImUser size={14} />
//                   </span>

//                   <span className="logged-user-name">
//                     {/* {user?.data?.full_name ??
//                       user?.data?.user_details?.full_name} */}
//                     Admin
//                   </span>

//                   <span className="logged-user-arrow-down">
//                     <MdKeyboardArrowDown size={24} />
//                   </span>
//                 </div>
//               )}
//             >
//               <Menu.Container style={{width: 210, overflow: 'hidden'}}>
//                 <animated.div
//                   style={{translateX, height}}
//                   className="header-dropdown-container"
//                 >
//                   <div className="header-dropdown-left" ref={leftRef}>
//                     {/* <div className="menu-header">
//                       <div className="menu-header-avatar">
//                         <img
//                           src={companySelected.img}
//                           alt={companySelected.name}
//                           className="menu-header-avatar-img"
//                         />
//                       </div>
//                       <div className="menu-header-content">
//                         <ToolTip text={companySelected.name}>
//                           <div className="menu-header-content-company-name">
//                             {companySelected.name}
//                           </div>
//                         </ToolTip>
//                         <div className="menu-header-content-user-role">
//                           {companySelected.role}
//                         </div>
//                       </div>
//                     </div>
//                     <Menu.Separator /> */}
//                     <Menu.Item
//                       className="menuItem"
//                       onClick={() => setVisible(true)}
//                     >
//                       Change Password
//                     </Menu.Item>

//                     {/* <Menu.Item
//                       className="menuItem"
//                       onClick={() => {
//                         translateX.start(-212)
//                         setSwitchFlag(false)
//                       }}
//                     >
//                       <div className="switch-company-button">
//                         <div className="switch-company-button-text">
//                           Switch Company
//                         </div>
//                         <div className="switch-company-button-icon">
//                           <IoIosArrowForward />
//                         </div>
//                       </div>
//                     </Menu.Item> */}

//                     <Menu.Item
//                       className="menuItem"
//                       onClick={
//                         () => handleLogout()
//                         // dispatch(userAuthLogoutAction(handleLogout))
//                       }
//                       danger
//                     >
//                       Logout
//                     </Menu.Item>
//                   </div>
//                   {/* <div className="header-dropdown-right" ref={rightRef}>
//                     <Menu.Item
//                       className="menuItem"
//                       onClick={() => {
//                         translateX.start(0)
//                         setSwitchFlag(true)
//                       }}
//                     >
//                       <div className="back-button">
//                         <div className="back-button-icon">
//                           <IoIosArrowBack />
//                         </div>
//                         <div className="back-button-text">Back</div>
//                       </div>
//                     </Menu.Item>
//                     <Menu.Separator />
//                     {companyData.map((company) => {
//                       return (
//                         <div
//                           className="menu-list"
//                           key={company.id}
//                           onClick={() => setCompanySelected(company)}
//                         >
//                           <div className="menu-list-avatar">
//                             <img
//                               src={company.img}
//                               alt={company.name}
//                               className="menu-list-avatar-img"
//                             />
//                           </div>
//                           <div className="menu-list-content">
//                             <ToolTip text={company.name}>
//                               <div className="menu-list-content-company-name">
//                                 {company.name}
//                               </div>
//                             </ToolTip>
//                             <div className="menu-list-content-user-role">
//                               {company.role}
//                             </div>
//                           </div>
//                           {companySelected.id === company.id && (
//                             <div className="menu-list-selected">
//                               <MdCheck />
//                             </div>
//                           )}
//                         </div>
//                       )
//                     })}
//                   </div> */}
//                 </animated.div>
//               </Menu.Container>
//             </Dropdown>
//             <ChangePasswordModal {...{visible, setVisible}} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ChangePasswordModal = ({
//   visible,
//   setVisible
// }: {
//   visible: boolean
//   setVisible: React.Dispatch<React.SetStateAction<boolean>>
// }) => {
//   const {data, onChangeHandler, onClear} = useInput({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   })
//   const {handleLogout} = useAuth()

//   // const {passwordLoader} = useSelector((state: any) => state.login)
//   // const {user} = useSelector((state) => state.user)

//   const dispatch = useDispatch()
//   const handleModalClose = () => {
//     setVisible(false)
//     onClear()
//   }
//   const onSubmit = (e: any) => {
//     e.preventDefault()

//     const catchedErros = {}
//     const validate = validator(catchedErros)

//     const {oldPassword, newPassword, confirmPassword} = data

//     validate('oldPassword', oldPassword.length === 0, () => {
//       toast.error("Phone can't be empty!")
//     })

//     validate('newPassword', newPassword.length < 6, () => {
//       toast.error("Password can't be empty!")
//     })

//     validate('confirmPassword', confirmPassword.length < 6, () => {
//       toast.error('Password must be atleaset 6 characters')
//     })

//     newPassword.length === confirmPassword.length &&
//       confirmPassword.length > 6 &&
//       validate('confirmPassword', newPassword !== confirmPassword, () => {
//         toast.error("Password doesn't match. Please recheck")
//       })

//     if (!isValid(catchedErros)) {
//       return
//     }

//     if (
//       String(data.newPassword) === String(data.confirmPassword) &&
//       data.newPassword.length >= 6
//     ) {
//       dispatch(
//         changePassword({
//           oldPass: data.oldPassword,
//           newPass: data.newPassword,
//           onSuccess: () => {
//             toast.success('Successfully changed password')
//             handleLogout()
//           }
//         })
//       )
//       handleModalClose()
//     } else if (data.newPassword.length < 6) {
//       toast.error('Password must be atleaset 6 characters')
//     } else {
//       toast.error("Password doesn't match. Please recheck")
//     }
//   }

//   return (
//     <Modal visible={visible} width={360}>
//       <div className="change-password-modal">
//         <div className="change-password-modal-header">
//           <div>
//             <h3>Change Password</h3>
//           </div>
//           <IoCloseCircle size={24} color="red" onClick={handleModalClose} />
//         </div>
//         <form onSubmit={onSubmit} className="change-password-modal-form">
//           <InputField
//             name="oldPassword"
//             placeholder="Old Password"
//             type="password"
//             // ref={register({required: true})}
//             value={data.oldPassword}
//             onChange={onChangeHandler('oldPassword')}
//           />
//           <InputField
//             placeholder="Password"
//             name="newPassword"
//             // ref={register({
//             //   required: 'You must specify a password',
//             // })}
//             value={data.newPassword}
//             onChange={onChangeHandler('newPassword')}
//             type="password"
//           />
//           <InputField
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             // ref={register({
//             //   validate: (value) =>
//             //     value === newPassword.current ||
//             //     'The passwords do not match',
//             // })}
//             value={data.confirmPassword}
//             onChange={onChangeHandler('confirmPassword')}
//             type="password"
//           />
//           {/* {errors.confirmPassword && (
//                   <p>{errors.confirmPassword.message}</p>
//                 )} */}
//           <Box flexBox jEnd mb={20} mt={20} style={{width: '100%'}}>
//             {/* <ActivityIndicator animating={passwordLoader}> */}
//             <Button title="Submit" color="primary" />
//             {/* </ActivityIndicator> */}
//             <Button title="Cancel" type="button" onClick={handleModalClose} />
//           </Box>
//         </form>
//       </div>
//     </Modal>
//   )
// }

import React from 'react'

export const Header = () => {
  return <div>header.common</div>
}
