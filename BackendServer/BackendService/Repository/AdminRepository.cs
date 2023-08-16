using AdminService.Data;
using AdminService.Repository;
using BackendService.Model;

namespace BackendService.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public AdminRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Admin CreateAdmin(Admin admin)
        {
            _dbContext.Admins.Add(admin);
            Save();
            return admin;
        }

        public bool DeleteAdmin(string email)
        {
            var filteredData = _dbContext.Admins.Where(x => x.Email == email).ToList();
            var result = _dbContext.Remove(filteredData);
            Save();
            return result != null ? true : false;
        }

        public IEnumerable<Admin> GetAllAdmins()
        {
            Console.WriteLine(_dbContext.Admins.ToList());
            return _dbContext.Admins.ToList();



        }
        public Admin UpdateAdmin(Admin admin)
        {
            var result = _dbContext.Admins.Update(admin);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public void Save() => _dbContext.SaveChanges();

        public Admin GetAdmin(string email) => _dbContext.Admins.Where(x => x.Email == email).FirstOrDefault();
    }
}
