using AdminService.Data;
using ApplicantsService.Repository;
using BackendService.Model;

namespace BackendService.Repository
{
    public class ApplicantsRepository : IApplicantsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public ApplicantsRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateApplicant(Applicants applicants)
        {
            _dbContext.Applicants.Add(applicants);
            Save();
        }

        public bool DeleteApplicant(string email)
        {
            var filteredData = _dbContext.Applicants.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            Save();
            return result != null ? true : false;
        }

        public IEnumerable<Applicants> GetAllApplicants() => _dbContext.Applicants.ToList();

        public Applicants UpdateApplicant(Applicants applicants)
        {
            var result = _dbContext.Applicants.Update(applicants);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public void Save() => _dbContext.SaveChanges();

        public Applicants GetApplicant(string email) => _dbContext.Applicants.Where(x => x.Email == email).FirstOrDefault();
    }
}
