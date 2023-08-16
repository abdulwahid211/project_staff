using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Model;

namespace BackendService.Repository
{
    public class AppliedJobsRepository : IAppliedJobsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public AppliedJobsRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateAppliedJobs(AppliedJobs admin)
        {
            _dbContext.AppliedJobs.Add(admin);
            Save();
        }

        public bool DeleteAppliedJobs(int AppliedJobs)
        {
            var filteredData = _dbContext.AppliedJobs.Where(x => x.AppliedJobsID == AppliedJobs).ToList();
            var result = _dbContext.Remove(filteredData);
            Save();
            return result != null ? true : false;
        }

        public IEnumerable<AppliedJobs> GetAllAppliedJobs() => _dbContext.AppliedJobs.ToList();

        public AppliedJobs UpdateAppliedJobs(AppliedJobs admin)
        {
            var result = _dbContext.AppliedJobs.Update(admin);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public void Save() => _dbContext.SaveChanges();

        public AppliedJobs GetAppliedJobs(int AppliedJobsID) => _dbContext.AppliedJobs.Where(x => x.AppliedJobsID == AppliedJobsID).FirstOrDefault();

        public bool VerifyAlreadyAppliedJob(string ApplicantID, string VacancyID)
        {
            throw new NotImplementedException();
        }
    }
}
