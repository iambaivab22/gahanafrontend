import {FormEvent, useState} from 'react'
import {useFormInput} from 'use-form-input'
import {
  Button,
  InputField,
  Label,
  HStack,
  VStack,
  TextArea,
  TextEditor,
  Card
} from 'src/app/common'
import {DragArea} from '../dragArea'
import {getImageUrl} from 'src/helpers/getImageUrl.helper'

interface InputComponentProps {
  isDetailPage?: boolean
  onSubmit: any
  onEditSubmit: any
  firstLevel?: boolean
  descriptionOnly?: boolean
  categoryOnly?: boolean
  setIsDetailPage: (arg: any) => void
  detail?: {
    description_details?: {
      id: number
      slug: string
      title: string
      posted_at: string
      thumbnail: string
      main_description: string
      short_description: string
      video_link: string
    }
    category_details: {
      id: number
      type: string
      title: string
      common_category_id: number
      is_description_only: boolean
    }
  }
  loading: boolean
  heading: string
}
export const InputformClone = ({
  isDetailPage = false,
  firstLevel,
  onSubmit,
  detail,
  onEditSubmit,
  heading,
  loading,
  descriptionOnly,
  categoryOnly,
  setIsDetailPage
}: InputComponentProps) => {
  const [image, setImage] = useState<string>('')

  const [data, {setValue}] = useFormInput({
    title: detail?.category_details?.title ?? '',
    isDescriptionOnly: detail?.category_details?.is_description_only
      ? true
      : false,
    descriptionTitle: detail?.description_details?.title ?? '',
    shortDescription: detail?.description_details?.short_description ?? '',
    description: detail?.description_details?.main_description ?? '',
    videoLink: detail?.description_details?.video_link ?? ''
  })

  const onSubmitHandler = () => {
    const {
      title,
      isDescriptionOnly,
      description,
      shortDescription,
      descriptionTitle,
      videoLink
    } = data
    const body = {
      title,
      isDescriptionOnly,
      description,
      shortDescription,
      descriptionTitle,
      videoLink,
      image
    }

    onSubmit(body)
  }

  const onEditSubmitHandler = () => {
    const {
      title,
      isDescriptionOnly,
      description,
      shortDescription,
      descriptionTitle,
      videoLink
    } = data

    const commonBody = {} as any

    if (!!title && title !== detail?.category_details?.title) {
      commonBody.title = title
    }
    if (isDescriptionOnly !== detail?.category_details.is_description_only) {
      commonBody.isDescriptionOnly = isDescriptionOnly
    }

    const descriptionBody = {} as any
    if (
      !!shortDescription &&
      shortDescription !== detail?.description_details?.short_description
    ) {
      descriptionBody.shortDescription = shortDescription
    }
    if (
      !!description &&
      description !== detail?.description_details?.main_description
    ) {
      descriptionBody.description = description
    }
    if (
      !!descriptionTitle &&
      descriptionTitle !== detail?.description_details?.title
    ) {
      descriptionBody.descriptionTitle = descriptionTitle
    }

    if (!!videoLink && videoLink !== detail?.description_details?.video_link) {
      descriptionBody.videoLink = videoLink
    }

    if (!!image) {
      descriptionBody.image = image
    }
    onEditSubmit({commonBody, descriptionBody})
  }

  return (
    <Card
      title={
        <HStack justify="space-between" align="center">
          <div>{heading}</div>
          <Button
            title={!!detail ? 'Update' : 'Create'}
            color="success"
            onClick={!!detail ? onEditSubmitHandler : onSubmitHandler}
            loading={loading}
          ></Button>
        </HStack>
      }
    >
      {!descriptionOnly && !categoryOnly && (
        <div>
          <label>
            <input
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setIsDetailPage(e.currentTarget.checked)
              }
              type="checkbox"
              checked={isDetailPage}
            />{' '}
            Is Detail page
          </label>
        </div>
      )}
      <VStack gap="$3">
        {isDetailPage ? (
          <VStack gap="$2">
            <InputField
              value={data.descriptionTitle}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setValue('descriptionTitle', e.currentTarget.value)
              }
              placeholder="Title"
            />

            <TextArea
              value={data.shortDescription}
              placeholder="Short Description"
              onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                setValue('shortDescription', e.currentTarget.value)
              }
            />
            <Label labelName="Description" />
            <TextEditor
              descriptionBody={data.description}
              onChange={(e: any) => setValue('description', e)}
            />

            <InputField
              value={data.videoLink}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setValue('videoLink', e.currentTarget.value)
              }
              placeholder="Video Link"
            />

            <VStack gap="$2">
              <Label labelName="Image" />
              <DragArea
                getImage={(data) => setImage(data)}
                defaultImage={
                  detail?.description_details?.thumbnail &&
                  getImageUrl(
                    'commonDescription',
                    detail.description_details.thumbnail
                  )
                }
              ></DragArea>
            </VStack>
          </VStack>
        ) : (
          <VStack gap="$2">
            <InputField
              value={data.title}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setValue('title', e.currentTarget.value)
              }
              placeholder="Title"
            />
            <div>
              <label>
                <input
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setValue('isDescriptionOnly', e.currentTarget.checked)
                  }
                  type="checkbox"
                  checked={data.isDescriptionOnly}
                />{' '}
                Is Description only
              </label>
            </div>
          </VStack>
        )}
        {categoryOnly ? null : (
          <HStack justify="flex-end" align="center" gap="$2">
            <Button
              title={!!detail ? 'Update' : 'Create'}
              color="success"
              onClick={!!detail ? onEditSubmitHandler : onSubmitHandler}
              loading={loading}
            ></Button>
          </HStack>
        )}
      </VStack>
    </Card>
  )
}
