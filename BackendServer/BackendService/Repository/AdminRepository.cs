using AdminService.Data;
using BackendService.Model;
using BackendService.Repository.Interfaces;

namespace BackendService.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public AdminRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateAdminAsync(Admin admin)
        {
            _dbContext.Admins.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteAdminAsync(string email)
        {
            var filteredData = _dbContext.Admins.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Admin>> GetAllAdminsAsync()
        {
            return _dbContext.Admins.ToList();
        }
        public async Task<Admin> UpdateAdminAsync(Admin admin)
        {
            var result = _dbContext.Admins.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Admin> GetAdminAsync(string email) => _dbContext.Admins.Where(x => x.Email == email).FirstOrDefault();
    }
}
