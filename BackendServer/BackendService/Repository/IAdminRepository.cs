using BackendService.Model;

namespace AdminService.Repository
{
    public interface IAdminRepository
    {
        public IEnumerable<Admin> GetAllAdmins();
        public Admin GetAdmin(string email);
        public Admin CreateAdmin(Admin admin);
        public Admin UpdateAdmin(Admin admin);
        public bool DeleteAdmin(string email);
    }
}
