using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public EmployerRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateEmployerAsync(Employer employer, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            _dbContext.Employers.Add(employer);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteEmployerAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            var filteredData = await _dbContext.Employers.Where(x => x.Email == email).ToListAsync();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Employer>> GetAllEmployersAsync(IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            return await _dbContext.Employers.ToListAsync();
        }
        public async Task<Employer> UpdateEmployerAsync(Employer employer, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            var result = _dbContext.Employers.Update(employer);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Employer> GetEmployerAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            return await _dbContext.Employers.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }
}
