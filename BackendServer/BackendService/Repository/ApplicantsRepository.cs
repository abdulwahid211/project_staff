using AdminService.Data;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class ApplicantsRepository : IApplicantsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public ApplicantsRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateApplicantAsync(Applicants admin)
        {
            _dbContext.Applicants.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteApplicantAsync(string email)
        {
            var filteredData = _dbContext.Applicants.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Applicants>> GetAllApplicantsAsync()
        {
            return await _dbContext.Applicants.ToListAsync();
        }
        public async Task<Applicants> UpdateApplicantAsync(Applicants admin)
        {
            var result = _dbContext.Applicants.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Applicants> GetApplicantAsync(string email) => await _dbContext.Applicants.Where(x => x.Email == email).FirstOrDefaultAsync();
    }
}
