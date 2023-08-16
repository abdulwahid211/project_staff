using BackendService.Model;

namespace EmployerService.Repository
{
    public interface IEmployerRepository
    {
        public IEnumerable<Employer> GetAllEmployers();
        public Employer GetEmployer(string email);
        public void CreateEmployer(Employer employer);
        public Employer UpdateEmployer(Employer employer);
        public bool DeleteEmployer(string email);
    }
}
