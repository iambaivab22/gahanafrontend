declare namespace Comp {
  interface ActiveVersionProps {
    version_details:
      | {
          created_by?: {full_name: string}
          doc_folder_name: string
          docs: string[]
          id: number
          is_latest: boolean
          nas_loc: string
          og_docs: any
          remarks: any
        }
      | undefined
  }

  interface BranchDetailsProps {
    companyId: number | string
    branchId: number | string
    showEdit?: boolean
  }

  interface PurchaseAmountProps {
    type: string
    editable?: boolean
    vehicleId: number
  }

  interface SearchImageEditorProps {
    imageViewerVisible: boolean
    setImageViewerVisible: React.Dispatch<React.SetStateAction<boolean>>
    vehicleNumberData: Com.DhaddaProps['vehicleNumberData']
    list?: comp.ActiveVersionProps
    activeVersion?: comp.ActiveVersionProps['version_details']
    docType?: string
    onSuccess?: () => void
    setActiveImage?: React.Dispatch<React.SetStateAction<undefined | string>>
    userInfo?: React.ReactNode
    retakeButton?: any
  }

  interface CropperImageEditorProps {
    image: string | undefined
    editorRef: (ref: {
      editor: any
      download: () => void
      print: (imageName: any) => void
      save: (imageName: string, successCallback: () => void) => void
      crop: () => void
    }) => void
    setZoomValue: React.Dispatch<React.SetStateAction<number | string>>

    baseZoomValue: React.MutableRefObject<number>
    onSave?: (
      croppedImage: any,
      imageName: string,
      callback: () => void
    ) => void
    onCrop: () => void
    setTempCroppedImage: React.Dispatch<
      React.SetStateAction<null | string | void>
    >
    onPrint: (imageName: string) => void
  }
  interface ValidateLotFormType {
    licenseType: string
    symbol: number
    zoneItem: number
    provinceItem: number
    office?: string
    vehicleType?: number
    wheelsCount?: string
    lotNum: string
    vehicleNum?: string
  }
  interface ValidateNumberFormType {
    vehicleNum?: string
  }

  interface EnterVehicleType {
    type: string
    searchHandler: (data: ValidateLotFormType, licensePlate: string) => void
  }

  interface SelectVehicleType {
    type: string
    processType?: any
    closeHandler?: () => void
    searchHandler: (data: ValidateLotFormType) => void
  }

  interface SelectedVersionProps {
    selectedVersion: string
    setSelectedVersion: React.Dispatch<React.SetStateAction<string>>
  }

  interface ProcessBarProps {
    processDetail: Api.GetOwnerProcessResponse
    processTypeCode: string
    noPlate?: string
  }

  interface ProcessButtonGroupProps {
    processStatus: number
    processTypeCode: string
    isOwnerProcess: boolean
  }

  interface ProcessButtonProps<T> {
    status: T
    processTypeCode: any
    isOwnerProcess: boolean
  }

  interface AddressModalProps {
    onConfirm?: (arg: any) => void
    value?: any
    prevData: any
    defaultData?: any
    addAddress: (body: any, callback: () => void) => void
  }

  interface ActivityLogProps {
    data: any
    isVisible: boolean
    updateVisibleState: any
  }

  interface AlternateTableProps {
    columns: AlternateTableColumns[]
    data: Api.OldVehicleRegistration[]
    actions?: boolean
    dataLoader?: boolean
    totalCount?: number
    deleteLoader?: boolean
    onDeleteHandler?: (arg: any, cb?: (arg?: any) => void) => void
    onEditHandler?: (arg: any, cb?: (arg?: any) => void) => void
    onViewHandler?: (
      arg: any,
      cb?: (arg?: any) => void,
      running?: boolean
    ) => void
    resetLoader?: boolean
    onResetHandler?: (arg: any, cb?: (arg?: any) => void) => void
    onSelectHandler?: (arg: any, cb?: (arg?: any) => void) => void
    selected?: (item: Api.OldVehicleRegistration) => void
    csv?: boolean
    editOwner: boolean
    onPageChange?: (arg: number) => void
  }

  interface AlternateTableColumns {
    field: Extract<keyof Api.OldVehicleRegistration, string>
    name: string
    colStyle?: React.CSSProperties
    headStyle?: React.CSSProperties
    render?: (
      item?: Api.OldVehicleRegistration[Extract<
        keyof Api.OldVehicleRegistration,
        string
      >],
      itemId?: number,
      index?: number
    ) => React.ReactNode
  }

  interface OwnerCreateSectionProps {
    modalTitle: 'Owner' | 'Co-owner'
    types: Array<string>
    onConfirm: (data: any) => void
    onStart?: any
    absoluteModal?: any
    value: string
    editOwner?: boolean
    placeholder?: 'Owner' | 'Co-owner'
  }

  interface NewOwnerProps {
    activeView: any
    ownerType: string
    setNewOwnerData?: React.Dispatch<any>
    modalTitle?: string
    editing?: any
    setEditing?: any
  }

  interface OTPModalProps {
    data?: {'mobile number'?: string; email?: string}
    otpId?: number
    onModalClose: () => void
    onVerifyOTP?: (code: string) => void
    loading?: boolean
  }

  interface OTPModelProps extends Omit<OTPModalProps, 'onModalClose'> {
    displayElement?: React.ReactNode
    visible?: boolean
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>
  }

  interface ProfileDetailProps {
    profileDetails: {
      image: string
      fullname: string
      location: string
      phone: number
      email: string
      memberSince: string
    }
    businessCard?: boolean
    profileCard?: boolean
  }
  interface KeyValueTableItems {
    name?: string
    value?: string | number
  }

  interface KeyValueTableProps {
    details: KeyValueTableItems[]
    repeat: number
  }
  interface JobDetailProps {
    jobDetails: {
      jobId: number
      views: number
      postedAt: string
      jobType: string
      jobTitle: string
      jobDetail: Comp.DetailGridProps['details']
      jobRequirements: string
    }
  }

  interface ProductDetailProps {
    productDetails: {
      id: number
      views?: number
      time?: string
      catagory?: string
      itemName?: string
      price?: string
      description?: string
      website?: string
    }
  }
  interface BusinessDetailProps {
    profile_details: {
      // business_name: string
      // logo: string
      // address: string
      // about: string
      // phone: string
      // organization_sector: string
      // created_at: string
      // website: string
      // establishment_year: string
      // district:

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
    user_details: {
      // id: string
      // email: string
      // phone: string
      // is_business_approved: boolean

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
  }
}
