using BackendService.Model;

namespace VacanciesService.Repository
{
    public interface IVacanciesRepository
    {
        public IEnumerable<Vacancies> GetAllVacancies();
        public Vacancies GetVacancy(int vacancyID);
        public void CreateVacancies(Vacancies employer);
        public Vacancies UpdateVacancies(Vacancies employer);
        public bool DeleteVacancies(int vacancyID);
    }
}
