using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface ICVRepository
    {
        public Task<string> DownloadCV(IHttpContextAccessor http);
        public Task<bool> DeleteCV(string email, IHttpContextAccessor http);
        public Task<bool> UploadCV(CV file, IHttpContextAccessor http);
    }
}
