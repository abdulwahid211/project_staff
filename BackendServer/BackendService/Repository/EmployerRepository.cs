using AdminService.Data;
using BackendService.Model;
using BackendService.Repository.Interfaces;

namespace BackendService.Repository
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public EmployerRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateEmployerAsync(Employer admin)
        {
            _dbContext.Employers.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteEmployerAsync(string email)
        {
            var filteredData = _dbContext.Employers.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Employer>> GetAllEmployersAsync()
        {
            return _dbContext.Employers.ToList();
        }
        public async Task<Employer> UpdateEmployerAsync(Employer admin)
        {
            var result = _dbContext.Employers.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Employer> GetEmployerAsync(string email) => _dbContext.Employers.Where(x => x.Email == email).FirstOrDefault();
    }
}
