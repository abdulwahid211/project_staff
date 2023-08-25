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
        public ApplicantsRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateApplicantAsync(Applicants admin)
        {
            _dbContext.Applicants.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteApplicantAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            var filteredData = _dbContext.Applicants.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Applicants>> GetAllApplicantsAsync(IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            return await _dbContext.Applicants.ToListAsync();
        }
        public async Task<Applicants> UpdateApplicantAsync(Applicants admin, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            var result = _dbContext.Applicants.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Applicants> GetApplicantAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            return await _dbContext.Applicants.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }
}
