// import React, {useEffect, useState} from 'react'
// // import Link from 'next/link'
// import {Link, useNavigate} from 'react-router-dom'
// // import {useRouter} from 'next/router'
// import {useLocation} from 'react-router-dom'

// import {FiSearch, FiChevronDown} from 'react-icons/fi'
// // import {TbPhoneCall} from 'react-icons/tb'

// import {HeaderDrawer} from '../headerDrawer/headerDrawer.component'
// // import attorney from 'assets/images/profilelogo.webp'
// import Theme from 'src/theme'
// import {useMedia} from 'src/hooks'
// import {HStack} from 'src/app/common'

// import {
//   HeaderContainer,
//   Search,
//   HeaderLogo,
//   HeaderLogoTextWrapper,
//   HeaderLogoSubText,
//   HeaderContent,
//   HeaderItem,
//   HeaderLinks,
//   MainHoverContainer,
//   HoverText,
//   NestedHoverText,
//   WithSubCategory,
//   WithOutSubCategory,
//   HoverTextWith,
//   HeaderLogoText,
//   PersonalInjuryLink
// } from './_header.style'
// import {
//   getCategoryLink,
//   getMenuLink,
//   headerMenu,
//   MenuType
// } from 'src/helpers/getNavLink.helper'
// import {useDispatch, useSelector} from 'src/store'
// // import {getCommonDescription} from 'redux/commonDescription/commonDescription.slice'
// // import {profileServices} from 'redux/profile/profile.service'

// export const Header = () => {
//   // useEffect(() => {
//   //   ;async () => {
//   //     try {
//   //       const res = await profileServices.getProfileById({profileId: 55})
//   //       console.log(res.profile_details.image, 'res from header')
//   //       // setHeaderImage(res.profile_details.image)
//   //     } catch (err) {
//   //       console.log(err)
//   //     }
//   //   }
//   // }, [])
//   // const [headerImage, setHeaderImage] = useState('')
//   const media = useMedia()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [personalInjury, setPersonalInjury] = useState<any | undefined>()
//   const [practiceAreas, setPracticeAreas] = useState<any | undefined>()
//   const [news, setNews] = useState<any | undefined>()
//   const [profiles, setProfiles] = useState<any | undefined>()

//   const dispatch = useDispatch()
//   useEffect(() => {
//     // dispatch(getCommonDescription())
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // const {
//   //   commonDescriptionData: {
//   //     personal,
//   //     practice,
//   //     news: newsList,
//   //     about,
//   //     profiles: profileList
//   //   }
//   // } = useSelector((state) => state.commonDescription)

//   // useEffect(() => {
//   //   ;(async () => {
//   //     try {
//   //       const remappedProfiles:
//   //         | Array<{
//   //             total_count: string
//   //             category_details: any
//   //           }>
//   //         | undefined = profileList?.rows.map((profile) => {
//   //         return {
//   //           total_count: profile.total_count,
//   //           category_details: {
//   //             id: profile.profile_details.id,
//   //             type: 'attorney_profile',
//   //             title: profile.profile_details.name,
//   //             sub_categories: null,
//   //             common_category_id: null,
//   //             is_description_only: true,
//   //             slug: profile.profile_details.slug
//   //           }
//   //         } as {
//   //           total_count: string
//   //           category_details: any
//   //         }
//   //       })
//   //       // REPOSITION DURGA BHURTEL TO TOP
//   //       const titleToBeAtTop = 'Durga'
//   //       const topEl =
//   //         remappedProfiles?.filter((el) =>
//   //           el.category_details.title
//   //             .toLocaleLowerCase()
//   //             .includes(titleToBeAtTop.toLocaleLowerCase())
//   //         ) || []
//   //       const topNotEl =
//   //         remappedProfiles?.filter(
//   //           (el) =>
//   //             !el.category_details.title
//   //               .toLocaleLowerCase()
//   //               .includes(titleToBeAtTop.toLocaleLowerCase())
//   //         ) || []

//   //       setPersonalInjury(personal)
//   //       setPracticeAreas(practice)
//   //       setNews(newsList)
//   //       setProfiles({
//   //         total: '0',
//   //         rows: [...topEl, ...topNotEl] ?? [],
//   //         isLast: false
//   //       })
//   //     } catch (err) {}
//   //   })()
//   // }, [personal, practice, newsList, about, profileList])

//   const [activeIndex, setActiveIndex] = useState(0)

//   let data = null
//   let left = 'unset'

//   let right = 'unset'
//   let arrowLeft = 'unset'
//   let arrowRight = 'unset'

//   let display = 'unset'
//   let height = undefined

//   if (activeIndex === 1) {
//     // data = (
//     //   // <MainHoverContent
//     //   //   data={personal}
//     //   //   menuType="personal_injury"
//     //   // ></MainHoverContent>
//     // )
//     display = 'flex'
//     left = '-100px'
//     arrowLeft = '170px'
//   } else if (activeIndex === 2) {
//     // data = (
//     //   // <MainHoverContent
//     //   //   data={practice}
//     //   //   menuType="practice_areas"
//     //   // ></MainHoverContent>
//     // )
//     left = '30px'
//     display = 'flex'
//     arrowLeft = '200px'
//     height = '350px'
//   } else if (activeIndex === 3) {
//     data = (
//       <MainHoverContent
//         data={profiles}
//         menuType="attorney_profile"
//       ></MainHoverContent>
//     )

//     display = 'flex'
//     right = '120px'
//     arrowRight = '50px'
//     height = '130px'
//   } else if (activeIndex == 4) {
//     data = (
//       <MainHoverContent
//         data={news}
//         isNews={true}
//         menuType="news"
//       ></MainHoverContent>
//     )
//     display = 'flex'
//     right = '60px'
//     arrowRight = '40px'
//     height = '130px'
//   } else if (activeIndex == 5) {
//     display = 'none'
//   }
//   return (
//     <HeaderContainer>
//       <div style={{width: '95%', margin: '0 auto'}}>
//         <HeaderContent>
//           <HStack align="center" justify="space-between">
//             <HeaderDrawer
//               image={'/assets/image/profilelogo.webp'}
//               data={{
//                 personalInjury,
//                 practiceAreas,
//                 news,
//                 profiles
//               }}
//             />
//             <HeaderLogo onClick={() => navigate('/home')}>
//               <img
//                 src="/src/assets/images/logo.jpg"
//                 alt="logo"
//                 width="60"
//                 height="60"
//                 style={{borderRadius: '50%'}}
//               />

//               <HeaderLogoTextWrapper>
//                 <HeaderLogoText>Bhurtel Law Firm</HeaderLogoText>
//                 <HeaderLogoSubText>Personal Injury Lawyer</HeaderLogoSubText>
//               </HeaderLogoTextWrapper>
//             </HeaderLogo>
//           </HStack>
//           {media.lg && (
//             <HeaderLinks>
//               {/* <Link href="/home">
//                 <HeaderItem
//                   isActive={router.pathname.includes('/home')}
//                   onMouseOver={() => setActiveIndex(5)}
//                 >
//                   Home
//                 </HeaderItem>
//               </Link> */}

//               {/* <HeaderMenu
//                 menuType="personal_injury"
//                 data={personal}
//                 index={1}
//                 setActiveIndex={setActiveIndex}
//               /> */}
//               {/*
//               <HeaderMenu
//                 menuType="practice_areas"
//                 data={practice}
//                 index={2}
//                 setActiveIndex={setActiveIndex}
//               /> */}

//               <Link to="/case-results">
//                 <HeaderItem
//                   isActive={location.pathname.includes('/case-results')}
//                   onMouseOver={() => setActiveIndex(5)}
//                 >
//                   Case Results
//                 </HeaderItem>
//               </Link>

//               <HeaderMenu
//                 menuType="attorney_profile"
//                 data={profiles}
//                 index={3}
//                 setActiveIndex={setActiveIndex}
//               />

//               <HeaderMenu
//                 menuType="news"
//                 data={news}
//                 index={4}
//                 setActiveIndex={setActiveIndex}
//               />

//               <Link to="/contact-us">
//                 <HeaderItem
//                   isActive={location.pathname.includes('/contact-us')}
//                   onMouseOver={() => setActiveIndex(5)}
//                 >
//                   Contact Us
//                 </HeaderItem>
//               </Link>

//               <MainHoverContainer
//                 left={left}
//                 right={right}
//                 arrowRight={arrowRight}
//                 arrowLeft={arrowLeft}
//                 display={display}
//                 classNameName="test"
//                 height={height}
//               >
//                 {data}
//               </MainHoverContainer>
//             </HeaderLinks>
//           )}
//           <Search>
//             <Link to="/search">
//               <FiSearch size={20} color="white" />
//             </Link>
//             {/* <a
//               href="tel:+212-461-4628"
//               style={{display: 'flex', alignItems: 'center'}}
//             >
//               <TbPhoneCall size={20} color={Theme.colors.$gray800} />
//             </a> */}
//           </Search>
//         </HeaderContent>
//       </div>
//       {/* {!media.lg && (
//         // <PersonalInjuryLink
//         //   href={getMenuLink('personal_injury', personal?.rows)}
//         // >
//         //   Personal Injury
//         // </PersonalInjuryLink>
//       )} */}
//     </HeaderContainer>
//   )
// }

// function HeaderMenu({
//   menuType,
//   data,
//   style,
//   index,

//   setActiveIndex
// }: {
//   menuType: MenuType
//   data?: any
//   style?: React.CSSProperties
//   pathname?: string
//   index?: number

//   setActiveIndex?: (index: number) => void
// }) {
//   const location = useLocation()

//   return (
//     <HeaderItem
//       isActive={location.pathname.includes(headerMenu[menuType].link)}
//       onMouseOver={() => setActiveIndex && index && setActiveIndex(index)}
//     >
//       <Link to={getMenuLink(menuType, data?.rows)}>
//         <div>{headerMenu[menuType].label}</div>
//       </Link>

//       {/* MENU */}
//       <FiChevronDown
//         style={{
//           cursor: 'pointer',
//           height: '12px',
//           width: '14px'
//         }}
//       />
//     </HeaderItem>
//   )
// }

// export const MainHoverContent = ({data, isNews, menuType}: any) => {
//   const withSubCategories: any = data?.rows?.filter(
//     (category: {total_count: string; category_details: any}) => {
//       return category.category_details.sub_categories
//     }
//   )

//   const withOutSubCategories: any = data?.rows?.filter(
//     (category: {total_count: string; category_details: any}) => {
//       return category.category_details.sub_categories === null
//     }
//   )

//   return (
//     <>
//       {!data || data.length === 0 ? (
//         <HoverText
//           classNameName="category"
//           style={{
//             color: Theme.colors.$gray600,
//             fontSize: Theme.fontSizes.$3,
//             alignSelf: 'center'
//           }}
//         >
//           Categories not found
//         </HoverText>
//       ) : null}

//       <WithOutSubCategory isNews={isNews ? true : false}>
//         {withOutSubCategories &&
//           [
//             {
//               id: 1,
//               category_details: {
//                 slug: 'rams',
//                 is_description_only: true,
//                 title: 'ram'
//               }
//             },
//             {
//               id: 2,
//               category_details: {
//                 slug: 'shyams',
//                 is_description_only: false,
//                 title: 'shyam'
//               }
//             },
//             {
//               id: 3,
//               category_details: {
//                 slug: 'haris',
//                 is_description_only: true,
//                 title: 'haris'
//               }
//             },
//             {
//               id: 4,
//               category_details: {
//                 slug: 'sitas',
//                 is_description_only: true,
//                 title: 'sita'
//               }
//             },
//             {
//               id: 5,
//               category_details: {
//                 slug: 'laxmans',
//                 is_description_only: true,
//                 title: 'laxman'
//               }
//             }
//           ].map((el, id) => {
//             return (
//               <Link
//                 key={id}
//                 to={getCategoryLink(
//                   menuType,
//                   el.category_details.slug,
//                   el.category_details.is_description_only
//                 )}
//               >
//                 <HoverText
//                   classNameName="category"
//                   key={id}
//                   style={{
//                     color: Theme.colors.$primary100,
//                     fontSize: Theme.fontSizes.$3,
//                     fontWeight: 'normal'
//                   }}
//                 >
//                   <div> {el.category_details.title}</div>
//                 </HoverText>
//               </Link>
//             )
//           })}
//       </WithOutSubCategory>
//       <WithSubCategory
//         style={{
//           gridTemplateRows: `repeat(1, auto)`
//         }}
//       >
//         {withSubCategories &&
//           [
//             {
//               id: 1,
//               category_details: {
//                 sub_categories: [
//                   {
//                     id: 1,
//                     slug: 'Srams subcategory',
//                     is_description_only: false,
//                     title: 'SubSrams'
//                   }
//                 ],
//                 slug: 'srams',
//                 is_description_only: true,
//                 title: 'ram'
//               }
//             },
//             {
//               id: 2,
//               category_details: {
//                 slug: 'sshyams',
//                 is_description_only: false,
//                 title: 'Sshyam',
//                 sub_categories: [
//                   {
//                     id: 1,
//                     slug: 'Sshyam subcategory',
//                     is_description_only: false,
//                     title: 'SubSshyam'
//                   }
//                 ]
//               }
//             },
//             {
//               id: 3,
//               category_details: {
//                 sub_categories: [
//                   {
//                     id: 1,
//                     slug: 'Sharis subcategory',
//                     is_description_only: true,
//                     title: 'SubSharis'
//                   }
//                 ],
//                 slug: 'Sharis',
//                 is_description_only: true,
//                 title: 'haris'
//               }
//             },
//             {
//               id: 4,
//               category_details: {
//                 sub_categories: [
//                   {
//                     id: 1,
//                     slug: 'Ssitas subcategory',
//                     is_description_only: false,
//                     title: 'SubSsite'
//                   }
//                 ],
//                 slug: 'Ssitas',
//                 is_description_only: true,
//                 title: 'Ssita'
//               }
//             },
//             {
//               id: 5,
//               category_details: {
//                 sub_categories: [
//                   {
//                     id: 1,
//                     slug: 'SLaxmans subcategory',
//                     is_description_only: false,
//                     title: 'SubSLaxman'
//                   }
//                 ],
//                 slug: 'Slaxmans',
//                 is_description_only: true,
//                 title: 'Slaxman'
//               }
//             }
//           ].map((el, id) => {
//             return (
//               <HoverTextWith
//                 key={id}
//                 style={{
//                   color: Theme.colors.$primary100,
//                   fontSize: Theme.fontSizes.$3,
//                   fontWeight: 'normal',
//                   paddingLeft: 10
//                 }}
//               >
//                 <Link
//                   to={getCategoryLink(
//                     menuType,
//                     el.category_details.slug,
//                     el.category_details.is_description_only
//                   )}
//                 >
//                   <div> {el.category_details.title}</div>
//                 </Link>

//                 {el.category_details.sub_categories && (
//                   <>
//                     {el.category_details.sub_categories.map(
//                       (subitems, index) => {
//                         return (
//                           <NestedHoverText
//                             key={subitems.id.toString()}
//                             style={{
//                               fontSize: Theme.fontSizes.$2
//                             }}
//                           >
//                             <Link
//                               to={getCategoryLink(
//                                 menuType,
//                                 subitems.slug,
//                                 subitems.is_description_only
//                               )}
//                             >
//                               <div> {subitems.title}</div>
//                             </Link>
//                           </NestedHoverText>
//                         )
//                       }
//                     )}
//                   </>
//                 )}
//               </HoverTextWith>
//             )
//           })}
//       </WithSubCategory>
//     </>
//   )
// }

import {
  FaCartArrowDown,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaOpencart,
  FaTiktok,
  FaUserAlt
} from 'react-icons/fa'
import Dropdown from 'react-multilevel-dropdown'
import {HStack, SearchField} from 'src/app/common'
import {useMedia} from 'src/hooks'
import {Sidebar} from '../headerDrawer/headerDrawer.component'
import {AiFillAccountBook, AiOutlineAccountBook} from 'react-icons/ai'
import {RiArrowDropDownLine} from 'react-icons/ri'

export const DesktopHeader = () => {
  const menus = [
    {
      name: 'NECKLACE',
      link: '/page/necklace',
      type: 'page'
    },
    {
      name: 'BRACELET',
      link: '/page/bracelet',
      type: 'page',
      hasChildren: true,
      children: [
        {
          name: 'Modern Bracelet',
          link: '/pages/bracelet/modern',
          type: 'page',
          hasChildren: true,
          children: [
            {
              name: "Men's",
              link: '/pages/bracelet/modern/men',
              type: 'page',
              hasChildren: true,

              children: [
                {
                  name: '2021',
                  link: '/pages/bracelet/modern/men/2021',
                  type: 'page'
                }
              ]
            },
            {
              name: "Women's",
              link: '/pages/bracelet/modern/women',
              type: 'page',
              hasChildren: true,
              children: [
                {
                  name: 'Original',
                  link: '/pages/bracelet/nepali/original',
                  type: 'page'
                }
              ]
            }
          ]
        },
        {
          name: 'Traditional',
          link: '/pages/bracelet/traditional',
          type: 'page',
          hasChildren: true,
          children: [
            {
              name: 'Chain',
              link: '/pages/bracelet/traditional/chain',
              type: 'page'
            }
          ]
        }
      ]
    },
    {
      name: 'Bangles',
      link: '/page/bangles',
      type: 'page',
      hasChildren: true,
      children: [
        {
          name: 'Gold Bangles',
          link: '/pages/bangles/gold Bangles',
          type: 'page'
        },
        {
          name: 'Silver Bangles',
          link: '/pages/bangles/SilverBangles',
          type: 'page'
        }
      ]
    },
    {
      name: 'Rings',
      link: '/page/rings',
      type: 'page',
      hasChildren: true,
      children: [
        {
          name: 'Gold ring',
          link: '/pages/rings/gold',
          type: 'page'
        },
        {
          name: 'Diamond ring',
          link: '/pages/rings/diamond',
          type: 'page'
        }
      ]
    },
    {
      name: 'EarRings',
      link: '/page/earrings',
      type: 'page',
      hasChildren: true,
      children: [
        {
          name: 'Gold',
          link: '/pages/rings/gold',
          type: 'page'
        },
        {
          name: 'Diamond',
          link: '/pages/rings/diamond',
          type: 'page'
        }
      ]
    },
    {
      name: 'Pendants',
      link: '/page/pendants',
      type: 'page',
      hasChildren: true,
      children: [
        {
          name: 'Gold',
          link: '/pages/pendants/gold',
          type: 'page'
        },
        {
          name: 'Diamond',
          link: '/pages/pendants/diamond',
          type: 'page'
        }
      ]
    }
  ]

  return (
    <div className="navmenuList">
      <div className="navmenuContainer">
        {menus.map((menu) => (
          <Dropdown
            title={
              <HStack gap="$3" align="center">
                <p className="menuText">{menu.name}</p>

                {menu.hasChildren && <RiArrowDropDownLine size={22} />}
              </HStack>
            }
            // menuclassName="text-14 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black flex "
          >
            {menu.children &&
              menu.children.map((item) => (
                <>
                  <Dropdown.Item>
                    <HStack gap="$3" align="center">
                      <p className="menuText">{item.name}</p>{' '}
                      {item.hasChildren && (
                        <div>
                          <RiArrowDropDownLine size={22} />
                        </div>
                      )}
                    </HStack>

                    {item.children &&
                      item.children.map((submenu) => (
                        <Dropdown.Submenu position="right">
                          <Dropdown.Item>{submenu.name}</Dropdown.Item>
                          {item.children &&
                            item.children.map((submenu) => (
                              <Dropdown.Submenu position="right">
                                <Dropdown.Item className="menuText">
                                  {submenu.name}
                                </Dropdown.Item>
                              </Dropdown.Submenu>
                            ))}
                        </Dropdown.Submenu>
                      ))}
                  </Dropdown.Item>
                </>
              ))}
          </Dropdown>
        ))}

        {/* <nav className="desktop-navigation-menu">
          <div className="container">
            <ul className="desktop-menu-category-list">
              <li className="menu-category">
                <a href="#" className="menu-title">
                  Home
                </a>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Categories
                </a>

                <div className="dropdown-panel">
                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="#">Electronics</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Desktop</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Laptop</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Camera</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Tablet</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Headphone</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">
                        <img
                          src="./assets/images/electronics-banner-1.jpg"
                          alt="headphone collection"
                          width="250"
                          height="119"
                        />
                      </a>
                    </li>
                  </ul>

                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="#">Men's</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Formal</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Casual</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Sports</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Jacket</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Sunglasses</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">
                        <img
                          src="./assets/images/mens-banner.jpg"
                          alt="men's fashion"
                          width="250"
                          height="119"
                        />
                      </a>
                    </li>
                  </ul>

                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="#">Women's</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Formal</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Casual</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Perfume</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Cosmetics</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Bags</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">
                        <img
                          src="./assets/images/womens-banner.jpg"
                          alt="women's fashion"
                          width="250"
                          height="119"
                        />
                      </a>
                    </li>
                  </ul>

                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="#">Electronics</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Smart Watch</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Smart TV</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Keyboard</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Mouse</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">Microphone</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="#">
                        <img
                          src="./assets/images/electronics-banner-2.jpg"
                          alt="mouse collection"
                          width="250"
                          height="119"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Men's
                </a>

                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="#">Shirt</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Shorts & Jeans</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Safety Shoes</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Wallet</a>
                  </li>
                </ul>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Women's
                </a>

                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="#">Dress & Frock</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Earrings</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Necklace</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Makeup Kit</a>
                  </li>
                </ul>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Jewelry
                </a>

                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="#">Earrings</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Couple Rings</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Necklace</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Bracelets</a>
                  </li>
                </ul>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Perfume
                </a>

                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="#">Clothes Perfume</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Deodorant</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Flower Fragrance</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="#">Air Freshener</a>
                  </li>
                </ul>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Blog
                </a>
              </li>

              <li className="menu-category">
                <a href="#" className="menu-title">
                  Hot Offers
                </a>
              </li>
            </ul>
          </div>
        </nav> */}
      </div>

      {/* <Dropdown title="Dropdown title" position="right">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>
          Item 2
          <Dropdown.Submenu position="right">
            <Dropdown.Item>Subitem 1</Dropdown.Item>
            <Dropdown.Item>Subitem 2</Dropdown.Item>
          </Dropdown.Submenu>
        </Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown> */}
    </div>
  )
}

export const TopHeader = () => {
  return (
    <>
      <div className="header-top">
        <div className="container">
          <ul className="header-social-container">
            <li>
              <a href="#" className="social-link">
                {/* <ion-icon name="logo-facebook"></ion-icon> */}
                <FaFacebook></FaFacebook>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                {/* <ion-icon name="logo-twitter"></ion-icon> */}
                <FaTiktok></FaTiktok>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                {/* <ion-icon name="logo-instagram"></ion-icon> */}
                <FaInstagram></FaInstagram>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                {/* <ion-icon name="logo-linkedin"></ion-icon> */}
                <FaLinkedinIn></FaLinkedinIn>
              </a>
            </li>
          </ul>

          <div className="header-alert-news">
            <p>
              <b>Upto 50% off</b>
              This Week Order Over - $55
            </p>
          </div>

          <div className="header-top-actions">
            {/* <select name="currency">
              <option value="usd">USD &dollar;</option>
              <option value="eur">EUR &euro;</option>
            </select>

            <select name="language">
              <option value="en-US">English</option>
              <option value="es-ES">Espa&ntilde;ol</option>
              <option value="fr">Fran&ccedil;ais</option>
            </select> */}
            10 years of Trusted Jeweler
          </div>
        </div>
      </div>

      <div className="topHeader-container">
        <div className="topHeader">
          <div className="topHeader-logo">
            <img
              src="src/assets/images/logo.jpg"
              alt="logo"
              className="topHeader-logo-image"
            ></img>
          </div>

          <div className="topHeader-search">
            <SearchField
              placeholder="Search Your Product"
              onChange={() => console.log('search called')}
            ></SearchField>
          </div>

          <div className="topHeader-cartProfile">
            <div className="topHeader-cartProfile-cart">
              <FaCartArrowDown size={20} />
            </div>

            <div className="topHeader-cartProfile-profile">
              <FaUserAlt size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Header = () => {
  const media = useMedia()

  return <>{media.md ? <DesktopHeader /> : <Sidebar></Sidebar>}</>
}
