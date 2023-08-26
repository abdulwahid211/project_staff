using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Model;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class AppliedJobsRepository : IAppliedJobsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public AppliedJobsRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateAppliedJobsAsync(AppliedJobs job)
        {
            _dbContext.AppliedJobs.Add(job);
            int result = await SaveAsync();
            return result != 0;
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

        public async Task<IEnumerable<AppliedJobs>> GetAllAppliedJobsAsync()
        {
            return await _dbContext.AppliedJobs.ToListAsync();
        }
        public async Task<AppliedJobs> UpdateAppliedJobsAsync(AppliedJobs job)
        {
            var result = _dbContext.AppliedJobs.Update(job);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<AppliedJobs> GetAppliedJobsAsync(int id) => await _dbContext.AppliedJobs.Where(x => x.VacancyID == id).FirstOrDefaultAsync();

        // TO DO..
        public Task<bool> VerifyAlreadyAppliedJobAsync(string ApplicantID, string VacancyID)
        {
            throw new NotImplementedException();
        }
    }
}
