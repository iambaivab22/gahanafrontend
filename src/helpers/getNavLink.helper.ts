type ValueObjType = {
  label: string
  value: string
  link: string
}

export interface HeaderMenuType {
  personal_injury: ValueObjType
  practice_areas: ValueObjType
  contacts: ValueObjType
  case_results: ValueObjType
  attorney_profile: ValueObjType
  news: ValueObjType
}

export type MenuType = keyof typeof headerMenu

export const getMenuLink = (menuType: MenuType, menuList: any | undefined) => {
  const link = `${headerMenu[menuType].link}`

  if (
    // menuType === 'personal_injury' ||
    // menuType === 'practice_areas' ||
    menuType === 'news' ||
    menuType === 'attorney_profile'
  ) {
    let newLink: string = link
    menuList?.map((menu, id) => {
      if (id === 0) {
        newLink = getCategoryLink(
          menuType,
          menu.category_details.slug,
          menu.category_details.is_description_only
        )
      }
      return
    })

    return newLink
  } else if (menuType === 'personal_injury') {
    let personalInjuryLink: string =
      '/practice-areas/article/personal-injury-42'

    return personalInjuryLink
  } else if (menuType === 'practice_areas') {
    let practiceAreasLink: string = '/practice-areas/article/practice-areas-93'
    return practiceAreasLink
  }

  return link
}

export const getCategoryLink = (
  menuType: MenuType,
  menuSlug: string,
  isDescription: boolean
) => {
  const link = `${headerMenu[menuType].link}`

  return link + `/${isDescription ? 'article' : 'list'}/${menuSlug}`
}

export const headerMenu: HeaderMenuType = {
  personal_injury: {
    label: 'Personal Injury',
    value: 'personal-injury',
    link: '/personal-injury'
  },
  practice_areas: {
    label: 'Practice Areas',
    value: 'practice-areas',
    link: '/practice-areas'
  },
  contacts: {
    label: 'Contact Us',
    value: 'contacts',
    link: '/contact-us'
  },
  case_results: {
    label: 'Case Results',
    value: 'case-results',
    link: '/case-results'
  },
  attorney_profile: {
    label: 'Attorney Profile',
    value: 'attorney-profile',
    link: '/attorney-profile'
  },
  news: {
    label: 'News',
    value: 'news',
    link: '/news'
  }
}
