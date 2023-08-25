using BackendService.Model;
using BackendService.Repository.Interfaces;
using VacanciesService.Repository;

namespace BackendService.Graphql
{
    public sealed class Mutation
    {
        //Admin
        public Task<bool> CreateAdmin([Service] IAdminRepository context, [Service] IHttpContextAccessor http, Admin admin) => context.CreateAdminAsync(admin);
        public Task<bool> DeleteAdmin([Service] IAdminRepository context, string Email) => context.DeleteAdminAsync(Email);
        public Task<Admin> UpdateAdmin([Service] IAdminRepository context, Admin admin) => context.UpdateAdminAsync(admin);

        //Applicant
        public Task<bool> CreateApplicant([Service] IApplicantsRepository context, Applicants applicant) => context.CreateApplicantAsync(applicant);
        public Task<bool> DeleteApplicant([Service] IApplicantsRepository context, string Email) => context.DeleteApplicantAsync(Email);
        public Task<Applicants> UpdateApplicant([Service] IApplicantsRepository context, Applicants applicant) => context.UpdateApplicantAsync(applicant);

        //Employer
        public Task<bool> CreateEmployer([Service] IEmployerRepository context, Employer employer) => context.CreateEmployerAsync(employer);
        public Task<bool> DeleteEmployer([Service] IEmployerRepository context, string Email) => context.DeleteEmployerAsync(Email);
        public Task<Employer> UpdateEmployer([Service] IEmployerRepository context, Employer employer) => context.UpdateEmployerAsync(employer);

        //Vacancies
        public Task<bool> CreateVacancies([Service] IVacanciesRepository context, Vacancies vacancy) => context.CreateVacanciesAsync(vacancy);
        public Task<bool> DeleteVacancies([Service] IVacanciesRepository context, int VacancyID) => context.DeleteVacanciesAsync(VacancyID);
        public Task<Vacancies> UpdateVacancies([Service] IVacanciesRepository context, Vacancies vacancy) => context.UpdateVacanciesAsync(vacancy);

        //userlogins
        public Task<string> AdminsLogin([Service] IUserAuthLogins context, string email, string password) => context.AdminLoginAsync(email, password);
        public Task<string> ApplicantLogin([Service] IUserAuthLogins context, string email, string password) => context.ApplicantLoginAsync(email, password);
    }
}
