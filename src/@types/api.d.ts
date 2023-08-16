declare module 'quill-image-uploader'
declare namespace Api {
  // Base Response for all API request
  // TODO: - remove base interface ( from both backend + frontend )
  interface Base<T> {
    success: boolean
    data: {
      type: string
      message: string
      data: T
    }
  }

  interface PaginatedData<T> {
    total: string
    rows: Array<T>
    isLast: boolean
  }

  // TODO: - Add API types down here
  interface Session {
    user: {
      id: number
      email: string
      role: string
    }
    token: string
  }

  interface EachClassifiedAds {
    total_count: string
    ads_details: {
      id: number
      created_at: string
      category: string
      product_name: string
      price: string
      website: string
      description: string
      images: string[]
      user_id: number
      is_approved: boolean
      rejected_reason: string
      is_deleted: boolean
    }
    profile_details: {
      id: number
      created_at: string
      user_id: number
      business_name: string
      address: string
      district: string
      organization_sector: string
      website: string
      about: string
      logo: string
      is_verified: boolean
    }
  }

  interface ClassifiedAdsList extends PaginatedData<EachClassifiedAds> {}

  interface productList {
    category: {
      _id: '64be9db1312a02c638389919'
      name: 'shirtsssssssssss'
      subCategories: Array<any>
      __v: 0
    }
    discountPercentage: number
    discountedPrice: number
    image: string[]
    name: string
    originalPrice: number
    price: number
    subCategory: {_id: number; name: string; __v: string}
    video: string
    __v: string
    _id: string
  }

  interface EachJob {
    total_count: string
    jobs_details: {
      id: number
      created_at: string
      job_type: string
      job_title: string
      experience: string
      salary: number
      deadline: string
      website: sring
      requirements: string
      is_verified: boolean
      user_id: number
    }
    profile_details: {
      id: number
      created_at: string
      user_id: number
      business_name: string
      address: string
      district: string
      organization_sector: string
      website: string
      about: string
      logo: string
      is_verified: boolean
    }
  }

  interface JobList extends PaginatedData<EachJob> {}

  interface EachBusiness {
    total_count: string
    user_details: {
      // id: number
      // email: string
      // role: string
      // phone: string
      // is_business_approved: boolean
      // rejected_reason: string
      // is_deleted: boolean

      id: number
      email: string
      role: string
      phone: string
      is_business_approved: boolean
      rejected_reason: string
      is_trusted: boolean
      is_deleted: boolean
      view_count: number
    }
    profile_details: {
      // id: number
      // created_at: string
      // user_id: number
      // business_name: string
      // address: string
      // district: string
      // organization_sector: string
      // website: string
      // about: string
      // logo: string
      // is_verified: boolean

      about: string
      address: string
      business_name: string
      created_at: string
      district: string
      establishment_year: string
      id: number
      logo: string
      images: string[]
      organization_sector: string
      user_id: number
      website: string
      is_deleted: boolean
      view_count: number
      facebook: string
      instagram: string
      tiktok: string
      google: string
      coordinates: [number, number]
    }
  }

  interface BusinessList extends PaginatedData<EachBusiness> {}

  interface EachClaim {
    total_count: string
    claimed_by_user_details: {
      id: number
      email: string
      role: string
      phone: string
      is_business_approved: boolean
      rejected_reason: string
      is_deleted: boolean
    }
    claimed_business_profile_details: {
      id: number
      created_at: string
      user_id: number
      business_name: string
      address: string
      district: string
      organization_sector: string
      establishment_year: string
      website: string
      about: string
      logo: string
    }
    claim_details: {
      id: number
      created_at: string
      business_user_id: number
      user_id: number
      image: string
      remarks: string
      is_deleted: boolean
    }
  }

  interface ClaimList extends PaginatedData<EachClaim> {}

  interface UserList {
    total_count: string
    id: number
    email: string
    role: string
    phone: string
    is_business_approved: boolean
    created_at: string
    is_deleted: boolean
  }
  interface UserListResponse extends PaginatedData<UserList> {}

  interface EachAdsReport {
    total_count: string
    ads_details: {
      id: number
      created_at: string
      category: string
      product_name: string
      price: string
      website: string
      description: string
      images: string[]
      user_id: number
      is_approved: boolean
      rejected_reason: string
      is_deleted: boolean
    }
    reported_by_user_details: {
      id: number
      email: string
      role: string
      phone: string
      is_business_approved: boolean
      rejected_reason: string
      is_deleted: boolean
    }
    report_details: {
      id: number
      created_at: string
      user_id: number
      remarks: string
      ads_id: number
    }
  }

  interface AdsReportList extends PaginatedData<EachAdsReport> {}

  interface EachJobsReport {
    total_count: string
    jobs_details: {
      id: number
      created_at: string
      job_type: string
      job_title: string
      experience: string
      salary: number
      deadline: string
      website: string
      requirements: string
      user_id: number
      is_approved: boolean
      rejected_reason: string
      is_deleted: boolean
    }
    reported_by_user_details: {
      id: number
      email: string
      role: string
      phone: string
      is_business_approved: boolean
      rejected_reason: string
      is_deleted: boolean
    }
    report_details: {
      id: number
      created_at: string
      user_id: number
      remarks: string
      ads_id: number
    }
  }

  interface JobsReportList extends PaginatedData<EachJobsReport> {}
}
