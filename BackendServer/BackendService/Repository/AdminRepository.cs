using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BackendService.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public AdminRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateAdminAsync(Admin admin)
        {
            _dbContext.Admins.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteAdminAsync(string email)
        {
            var filteredData = await _dbContext.Admins.Where(x => x.Email == email).ToListAsync();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Admin>> GetAllAdminsAsync(IHttpContextAccessor http)
        {
            if (_tokenMethods.ValidateUser(http).IsNullOrEmpty())
            {
                throw new ArgumentException("Valid Token is required to access resource");
            }
            else
            {
                return await _dbContext.Admins.ToListAsync();
            }
        }
        public async Task<Admin> UpdateAdminAsync(Admin admin)
        {
            var result = _dbContext.Admins.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Admin> GetAdminAsync(string email) => await _dbContext.Admins.Where(x => x.Email == email).FirstOrDefaultAsync();
    }
}
