using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IApplicantsRepository
    {
        public Task<IEnumerable<Applicants>> GetAllApplicantsAsync();
        public Task<Applicants> GetApplicantAsync(string email);
        public Task<bool> CreateApplicantAsync(Applicants applicant);
        public Task<Applicants> UpdateApplicantAsync(Applicants applicant);
        public Task<bool> DeleteApplicantAsync(string email);
    }
}
