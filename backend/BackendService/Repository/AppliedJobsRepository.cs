using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Authentication;
using BackendService.Model;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class SimpleNameValueItem
    {
        public string Name { get; set; }

        public int Uid { get; set; }

        public int Id { get; set; }

        public string Value { get; set; }

    }

    public class AppliedJobsRepository : IAppliedJobsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;

        public AppliedJobsRepository(ITokenUtil tokenMethods, LandSeaDbContext dbContext)
        {
            _tokenMethods = tokenMethods;
            _dbContext = dbContext;
        }
        public async Task<bool> CreateAppliedJobsAsync(AppliedJobs job)
        {
            if (!await VerifyAlreadyAppliedJobAsync(job.ApplicantID, job.VacancyID))
            {
                await _dbContext.AppliedJobs.AddAsync(job);
                int result = await SaveAsync();
                return result != 0;
            }
            return false;
        }

        public async Task<bool> DeleteAppliedJobsAsync(int id)
        {
            var job = await _dbContext.AppliedJobs.FirstOrDefaultAsync(x => x.AppliedJobsID == id);
            if (job == null)
            {
                return false;
            }
            _dbContext.AppliedJobs.Remove(job);
            await SaveAsync();
            return true;
        }

        public async Task<ApplicantApplied> GetAllAppliedJobsAsync(IHttpContextAccessor http, int employerId)
        {
            _tokenMethods.ValidateUserToken(http);
            var ap = from applicants in _dbContext.Applicants
                     from appliedJobs in _dbContext.AppliedJobs
                     from vacancies in _dbContext.Vacancies
                     from employer in _dbContext.Employers
                     where (employerId == vacancies.EmployerID && appliedJobs.ApplicantID == applicants.ApplicantID && appliedJobs.VacancyID == vacancies.VacancyID)
                     orderby applicants.ApplicantID ascending
                     select new ApplicantApplied { ApplicantID = (int)applicants.ApplicantID, FirstName = applicants.FirstName, LastName = applicants.LastName, Telephone = applicants.Telephone, City = applicants.City, Email = applicants.Email, VacancyID = (int)vacancies.VacancyID, JobTitle = vacancies.Title };

            return ap.FirstOrDefault();

            ///    select ( ap.ApplicantID = applicants.ApplicantID, applicants.FirstName, applicants.LastName, applicants.Telephone, applicants.City, applicants.Email, vacancies.VacancyID, JobTitle = vacancies.Title );
            /***
             * 
             *  Select V.VacancyID as VacancyID, V.Title as JobTitle, A.ApplicantID, A.FirstName, A.LastName, A.Telephone, A.City, A.Email 
             *  from applicants AS A inner join vacancies AS V  inner join appliedJobs AS AJ inner join employer as EM on
                V.EmployerId = EM.EmployerId and AJ.ApplicantID = A.ApplicantID and   
                 AJ.VacancyID = V.VacancyID  where EM.EmployerID = ? order by A.ApplicantID ASC;`;
             * 
             * 
             * 
             */
        }
        public async Task<AppliedJobs> UpdateAppliedJobsAsync(AppliedJobs job)
        {
            var result = _dbContext.AppliedJobs.Update(job);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<AppliedJobs> GetAppliedJobsAsync(int id) => await _dbContext.AppliedJobs.Where(x => x.VacancyID == id).FirstOrDefaultAsync();


        public async Task<bool> VerifyAlreadyAppliedJobAsync(int ApplicantID, int VacancyID)
        {
            var restult = await _dbContext.AppliedJobs.FirstOrDefaultAsync(x => x.VacancyID == VacancyID && x.ApplicantID == ApplicantID);

            return (restult is not null);
        }
    }
}
