using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IEmployerRepository
    {
        public Task<IEnumerable<Employer>> GetAllEmployersAsync();
        public Task<Employer> GetEmployerAsync(string email);
        public Task<bool> CreateEmployerAsync(Employer employer);
        public Task<Employer> UpdateEmployerAsync(Employer employer);
        public Task<bool> DeleteEmployerAsync(string email);
    }
}
