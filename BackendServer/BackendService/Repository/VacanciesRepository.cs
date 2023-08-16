using AdminService.Data;
using BackendService.Model;
using VacanciesService.Repository;

namespace BackendService.Repository
{
    public class VacanciesRepository : IVacanciesRepository
    {
        private readonly LandSeaDbContext _dbContext;
        public VacanciesRepository(LandSeaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateVacancies(Vacancies admin)
        {
            _dbContext.Vacancies.Add(admin);
            Save();
        }

        public bool DeleteVacancies(int vacancyID)
        {
            var filteredData = _dbContext.Vacancies.Where(x => x.VacancyID == vacancyID).ToList();
            var result = _dbContext.Remove(filteredData);
            Save();
            return result != null ? true : false;
        }

        public IEnumerable<Vacancies> GetAllVacancies() => _dbContext.Vacancies.ToList();

        public Vacancies UpdateVacancies(Vacancies admin)
        {
            var result = _dbContext.Vacancies.Update(admin);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public void Save() => _dbContext.SaveChanges();

        public Vacancies GetVacancy(int vacancyID) => _dbContext.Vacancies.Where(x => x.VacancyID == vacancyID).FirstOrDefault();
    }
}
