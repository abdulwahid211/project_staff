using BackendService.Model;

namespace VacanciesService.Repository
{
    public interface IVacanciesRepository
    {
        public Task<IEnumerable<Vacancies>> GetAllVacanciesAsync();
        public Task<Vacancies> GetVacancyAsync(int vacancyID);
        public Task<bool> CreateVacanciesAsync(Vacancies employer);
        public Task<Vacancies> UpdateVacanciesAsync(Vacancies employer);
        public Task<bool> DeleteVacanciesAsync(int vacancyID);
    }
}
