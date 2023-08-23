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

        public async Task<bool> CreateVacanciesAsync(Vacancies admin)
        {
            _dbContext.Vacancies.Add(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteVacanciesAsync(int id)
        {
            var filteredData = _dbContext.Vacancies.Where(x => x.VacancyID == id).ToList();
            var result = _dbContext.Remove(filteredData);
            await SaveAsync();
            return result != null;
        }

        public async Task<IEnumerable<Vacancies>> GetAllVacanciesAsync()
        {
            return _dbContext.Vacancies.ToList();
        }
        public async Task<Vacancies> UpdateVacanciesAsync(Vacancies admin)
        {
            var result = _dbContext.Vacancies.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Vacancies> GetVacancyAsync(int id) => _dbContext.Vacancies.Where(x => x.VacancyID == id).FirstOrDefault();
    }
}
