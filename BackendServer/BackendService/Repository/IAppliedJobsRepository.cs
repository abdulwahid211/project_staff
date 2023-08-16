using BackendService.Model;

namespace AppliedJobsService.Repository
{
    public interface IAppliedJobsRepository
    {
        public IEnumerable<AppliedJobs> GetAllAppliedJobs();
        public AppliedJobs GetAppliedJobs(int email);
        public void CreateAppliedJobs(AppliedJobs appliedJobs);
        public AppliedJobs UpdateAppliedJobs(AppliedJobs appliedJobs);
        public bool DeleteAppliedJobs(int AppliedJobsID);
        public bool VerifyAlreadyAppliedJob(string ApplicantID, string VacancyID);
    }
}
