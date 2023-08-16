using BackendService.Model;

namespace ApplicantsService.Repository
{
    public interface IApplicantsRepository
    {
        public IEnumerable<Applicants> GetAllApplicants();
        public Applicants GetApplicant(string email);
        public void CreateApplicant(Applicants applicant);
        public Applicants UpdateApplicant(Applicants applicant);
        public bool DeleteApplicant(string email);
    }
}
