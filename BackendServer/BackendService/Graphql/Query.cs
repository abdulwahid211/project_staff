using AppliedJobsService.Repository;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using VacanciesService.Repository;

namespace BackendService.Graphql
{
    public sealed class Query
    {
        [UseFiltering]
        public Task<IEnumerable<Admin>> Admins([Service] IAdminRepository context, [Service] IHttpContextAccessor http) => context.GetAllAdminsAsync(http);
        public Task<Admin> Admin([Service] IAdminRepository context, string email) => context.GetAdminAsync(email);
        public Task<IEnumerable<Applicants>> Applicants([Service] IApplicantsRepository context) => context.GetAllApplicantsAsync();
        public Task<Applicants> Applicant([Service] IApplicantsRepository context, string email) => context.GetApplicantAsync(email);
        public Task<AppliedJobs> AppliedJobs([Service] IAppliedJobsRepository context, int employerId) => context.GetAppliedJobsAsync(employerId);
        public Task<IEnumerable<Vacancies>> Vacancies([Service] IVacanciesRepository context) => context.GetAllVacanciesAsync();
        public Task<Vacancies> Vacancy([Service] IVacanciesRepository context, int VacancyID) => context.GetVacancyAsync(VacancyID);
        public Task<IEnumerable<Employer>> Employers([Service] IEmployerRepository context) => context.GetAllEmployersAsync();
        public Task<Employer> Employer([Service] IEmployerRepository context, string email) => context.GetEmployerAsync(email);

    }
}
