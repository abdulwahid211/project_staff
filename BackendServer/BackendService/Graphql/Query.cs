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
        public Task<Admin> Admin([Service] IAdminRepository context, [Service] IHttpContextAccessor http, string email) => context.GetAdminAsync(email, http);
        public Task<IEnumerable<Applicants>> Applicants([Service] IApplicantsRepository context, [Service] IHttpContextAccessor http) => context.GetAllApplicantsAsync(http);
        public Task<Applicants> Applicant([Service] IApplicantsRepository context, [Service] IHttpContextAccessor http, string email) => context.GetApplicantAsync(email, http);
        public Task<AppliedJobs> AppliedJobs([Service] IAppliedJobsRepository context, int employerId) => context.GetAppliedJobsAsync(employerId);
        public Task<IEnumerable<Vacancies>> Vacancies([Service] IVacanciesRepository context) => context.GetAllVacanciesAsync();
        public Task<Vacancies> Vacancy([Service] IVacanciesRepository context, int VacancyID) => context.GetVacancyAsync(VacancyID);
        public Task<IEnumerable<Employer>> Employers([Service] IEmployerRepository context, [Service] IHttpContextAccessor http) => context.GetAllEmployersAsync(http);
        public Task<Employer> Employer([Service] IEmployerRepository context, [Service] IHttpContextAccessor http, string email) => context.GetEmployerAsync(email, http);

    }
}
