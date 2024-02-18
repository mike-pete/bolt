// import { changeCurrentJob } from '../stores/useCurrentJob'

const handleLocationChanged = (location: string) => {
    // const queryString = JSON.parse(location).search
    // const urlParams = new URLSearchParams(queryString)
    // const jobId = urlParams.get('currentJobId')
    // changeCurrentJob(typeof jobId === 'string' ? jobId : undefined)
    console.log('location changed', location)
}

export default handleLocationChanged
