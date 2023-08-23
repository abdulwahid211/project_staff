using BackendService.Model;

namespace AppliedJobsService.Repository
{
    public interface IAppliedJobsRepository
    {
        public Task<IEnumerable<AppliedJobs>> GetAllAppliedJobsAsync();
        public Task<AppliedJobs> GetAppliedJobsAsync(int email);
        public Task<bool> CreateAppliedJobsAsync(AppliedJobs appliedJobs);
        public Task<AppliedJobs> UpdateAppliedJobsAsync(AppliedJobs appliedJobs);
        public Task<bool> DeleteAppliedJobsAsync(int AppliedJobsID);
        public Task<bool> VerifyAlreadyAppliedJobAsync(string ApplicantID, string VacancyID);
    }
}
