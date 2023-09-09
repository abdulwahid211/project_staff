using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class ApplicantsRepository : IApplicantsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        private readonly ICVRepository _iCVRepository;
        public ApplicantsRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateApplicantAsync(Applicants applicant)
        {
            var hashPassword = PasswordUtil.HashPassword(applicant.Password);
            applicant.Password = hashPassword;
            _dbContext.Applicants.Add(applicant);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteApplicantAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var applicant = await _dbContext.Applicants.FirstOrDefaultAsync(x => x.Email == email);
            if (applicant == null)
            {
                return false;
            }
            _dbContext.Applicants.Remove(applicant);
            await SaveAsync();

            var cv = await _dbContext.CVFiles.FirstOrDefaultAsync(x => x.Email == email);
            if (cv == null)
            {
                return false;
            }
            _dbContext.CVFiles.Remove(cv);
            await SaveAsync();

            return true;
        }

        public async Task<IEnumerable<Applicants>> GetAllApplicantsAsync(IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Applicants.ToListAsync();
        }
        public async Task<Applicants> UpdateApplicantAsync(Applicants applicant, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var hashPassword = PasswordUtil.HashPassword(applicant.Password);
            applicant.Password = hashPassword;
            var result = _dbContext.Applicants.Update(applicant);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Applicants> GetApplicantAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Applicants.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }
}
