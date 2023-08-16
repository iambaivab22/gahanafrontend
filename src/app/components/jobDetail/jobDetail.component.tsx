import {BiTimeFive} from 'react-icons/bi'
import {KeyValueTable} from '../keyValueTable'
import {HStack, StatInfo, Title, VStack} from 'src/app/common'

export const JobDetail = ({
  jobDetails: {
    jobId,
    views,
    postedAt,
    jobType,
    jobTitle,
    jobDetail,
    jobRequirements
  }
}: Comp.JobDetailProps) => {
  return (
    <VStack gap="$5" justify="space-between" className="jobDetail-container">
      <VStack className="jobDetail">
        <VStack gap="$5" justify="center" className="jobDetail-jobIntro">
          <HStack gap="$7" justify="space-between" align="center">
            <Title smallheading className="jobId">
              Job id: {jobId}
            </Title>

            <HStack justify="space-between" align="center" gap="$7">
              {/* <StatInfo icon={<AiOutlineEye />} value={`${views} views`} /> */}
              <StatInfo icon={<BiTimeFive />} value={`${postedAt}`} />
            </HStack>
          </HStack>
          <div className="jobDetail-jobIntro-typeTitle">
            <Title smallheading>{jobType}</Title>
            <Title>{jobTitle}</Title>
          </div>
        </VStack>

        <VStack className="jobDetail-detail" gap="$2">
          <Title subheading>Job Details</Title>
          <KeyValueTable details={jobDetail} repeat={2} />
        </VStack>

        <VStack className="jobDetail-jobRequirement" gap="$2">
          <Title subheading> Requirements</Title>
          <div className="jobDetail-jobRequirement-text">
            <div dangerouslySetInnerHTML={{__html: jobRequirements}} />
          </div>
        </VStack>
      </VStack>
    </VStack>
  )
}
