using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> CreateAdminAsync(Admin admin, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            _dbContext.Admins.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteAdminAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            var filteredData = await _dbContext.Admins.Where(x => x.Email == email).ToListAsync();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Admin>> GetAllAdminsAsync(IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            return await _dbContext.Admins.ToListAsync();
        }
        public async Task<Admin> UpdateAdminAsync(Admin admin, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            var result = _dbContext.Admins.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Admin> GetAdminAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.CheckValidateUser(http);
            return await _dbContext.Admins.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }

}
