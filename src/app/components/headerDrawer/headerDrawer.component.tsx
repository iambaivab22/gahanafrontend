import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from '../drawerMenu/sidebarData'
import SubMenu from '../drawerMenu/drawerMenu.component'
import {IconContext} from 'react-icons/lib'
import {getCategoryListAction} from 'src/app/pages/category/category.slice'
import {useDispatch, useSelector} from 'src/store'

const Nav = styled.div`
  background: #d8848c;

  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SidebarNav = styled.nav<{sidebar: boolean}>`
  background: rgb(112 46 111);

  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
`

export const Sidebar = ({handleClose}: {handleClose: () => void}) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  const [category, setCategory] = useState<any>()

  const {categoryData}: any = useSelector((state: any) => state.category)
  const [menyList, setMenuList] = useState<any>()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getCategoryListAction({
        onSuccess: () => {}
      })
    )
  }, [])

  useEffect(() => {
    const mappedCategoryWeb = categoryData?.map((item: any, index: number) => {
      if (item?.subCategories?.length > 0) {
        return {
          key: index,
          title: item.name,
          path: item.name,
          type: 'page',
          hasChildren: true,
          id: item.id,
          subNav: item.subCategories?.map((itemSub, indexSub) => {
            return {
              key: indexSub + index,
              title: itemSub.name,
              id: itemSub.id,
              link: item.name / itemSub.name,
              type: 'page'
            }
          })
        }
      } else {
        return {
          title: item.name,
          path: item.name,
          type: 'page'
        }
      }
    })

    setCategory(mappedCategoryWeb)
  }, [categoryData])

  const SidebarData = [
    {
      title: 'Overview',
      path: '/overview',
      // icon: <AiIcons.AiFillHome />,
      // iconClosed: <RiIcons.RiArrowDownSFill />,
      // iconOpened: <RiIcons.RiArrowUpSFill />,

      subNav: [
        {
          title: 'Users',
          path: '/overview/users'
          // icon: <IoIcons.IoIosPaper />
        },
        {
          title: 'Revenue',
          path: '/overview/revenue'
          // icon: <IoIcons.IoIosPaper />
        }
      ]
    },
    {
      title: 'Reports',
      path: '/reports',
      // icon: <IoIcons.IoIosPaper />,
      // iconClosed: <RiIcons.RiArrowDownSFill />,
      // iconOpened: <RiIcons.RiArrowUpSFill />,

      subNav: [
        {
          title: 'Reports',
          path: '/reports/reports1',
          // icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Reports 2',
          path: '/reports/reports2',
          // icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Reports 3',
          path: '/reports/reports3'
          // icon: <IoIcons.IoIosPaper />
        }
      ]
    },
    {
      title: 'Products',
      path: '/products'
      // icon: <FaIcons.FaCartPlus />
    },
    {
      title: 'Team',
      path: '/team'
      // icon: <IoIcons.IoMdPeople />
    },
    {
      title: 'Messages',
      path: '/messages',
      // icon: <FaIcons.FaEnvelopeOpenText />,

      // iconClosed: <RiIcons.RiArrowDownSFill />,
      // iconOpened: <RiIcons.RiArrowUpSFill />,

      subNav: [
        {
          title: 'Message 1',
          path: '/messages/message1'
          // icon: <IoIcons.IoIosPaper />
        },
        {
          title: 'Message 2',
          path: '/messages/message2'
          // icon: <IoIcons.IoIosPaper />
        }
      ]
    },
    {
      title: 'Support',
      path: '/support'
      // icon: <IoIcons.IoMdHelpCircle />
    }
  ]

  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {category?.map((item, index) => {
              return (
                <SubMenu handleClose={showSidebar} item={item} key={index} />
              )
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}
