using AdminService.Data;
using BackendService.Model;
using EmployerService.Repository;

namespace BackendService.Repository
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public EmployerRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateEmployer(Employer Employer)
        {
            _dbContext.Employers.Add(Employer);
            Save();
        }

        public bool DeleteEmployer(string email)
        {
            var filteredData = _dbContext.Employers.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            Save();
            return result != null ? true : false;
        }

        public IEnumerable<Employer> GetAllEmployers() => _dbContext.Employers.ToList();

        public Employer UpdateEmployer(Employer Employer)
        {
            var result = _dbContext.Employers.Update(Employer);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public void Save() => _dbContext.SaveChanges();

        public Employer GetEmployer(string email) => _dbContext.Employers.Where(x => x.Email == email).FirstOrDefault();
    }
}
