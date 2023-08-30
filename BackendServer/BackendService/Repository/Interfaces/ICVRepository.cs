using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface ICVRepository
    {
        public Task<CV> DownloadCVAsync(string email, IHttpContextAccessor http);
        public Task<bool> DeleteCVAsync(string email, IHttpContextAccessor http);
        public Task<bool> UploadCVAsync(CV file, IHttpContextAccessor http);
    }
}
