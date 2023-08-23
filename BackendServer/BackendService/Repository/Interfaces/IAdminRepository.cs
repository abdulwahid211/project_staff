using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IAdminRepository
    {
        public Task<IEnumerable<Admin>> GetAllAdminsAsync();
        public Task<Admin> GetAdminAsync(string email);
        public Task<bool> CreateAdminAsync(Admin admin);
        public Task<Admin> UpdateAdminAsync(Admin admin);
        public Task<bool> DeleteAdminAsync(string email);
    }
}
