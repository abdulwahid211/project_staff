using BackendService.Model;
using BackendService.Repository.Interfaces;
using VacanciesService.Repository;

namespace BackendService.Graphql
{
    public sealed class Mutation
    {
        //Admin
        public Task<bool> CreateAdmin([Service] IAdminRepository context, [Service] IHttpContextAccessor http, Admin admin) => context.CreateAdminAsync(admin, http);
        public Task<bool> DeleteAdmin([Service] IAdminRepository context, [Service] IHttpContextAccessor http, string Email) => context.DeleteAdminAsync(Email, http);
        public Task<Admin> UpdateAdmin([Service] IAdminRepository context, [Service] IHttpContextAccessor http, Admin admin) => context.UpdateAdminAsync(admin, http);

        //Applicant
        public Task<bool> CreateApplicant([Service] IApplicantsRepository context, Applicants applicant) => context.CreateApplicantAsync(applicant);
        public Task<bool> DeleteApplicant([Service] IApplicantsRepository context, [Service] IHttpContextAccessor http, string Email) => context.DeleteApplicantAsync(Email, http);
        public Task<Applicants> UpdateApplicant([Service] IApplicantsRepository context, [Service] IHttpContextAccessor http, Applicants applicant) => context.UpdateApplicantAsync(applicant, http);

        //Employer
        public Task<bool> CreateEmployer([Service] IEmployerRepository context, [Service] IHttpContextAccessor http, Employer employer) => context.CreateEmployerAsync(employer, http);
        public Task<bool> DeleteEmployer([Service] IEmployerRepository context, [Service] IHttpContextAccessor http, string Email) => context.DeleteEmployerAsync(Email, http);
        public Task<Employer> UpdateEmployer([Service] IEmployerRepository context, [Service] IHttpContextAccessor http, Employer employer) => context.UpdateEmployerAsync(employer, http);

        //Vacancies
        public Task<bool> CreateVacancies([Service] IVacanciesRepository context, [Service] IHttpContextAccessor http, Vacancies vacancy) => context.CreateVacanciesAsync(vacancy, http);
        public Task<bool> DeleteVacancies([Service] IVacanciesRepository context, [Service] IHttpContextAccessor http, int VacancyID) => context.DeleteVacanciesAsync(VacancyID, http);
        public Task<Vacancies> UpdateVacancies([Service] IVacanciesRepository context, [Service] IHttpContextAccessor http, Vacancies vacancy) => context.UpdateVacanciesAsync(vacancy, http);

        //userlogins
        public Task<string> AdminsLogin([Service] IUserAuthLogins context, string email, string password) => context.AdminLoginAsync(email, password);
        public Task<string> ApplicantLogin([Service] IUserAuthLogins context, string email, string password) => context.ApplicantLoginAsync(email, password);
    }
}
