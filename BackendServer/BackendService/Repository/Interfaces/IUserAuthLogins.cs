namespace BackendService.Repository.Interfaces
{
    public interface IUserAuthLogins
    {
        public Task<string> AdminLoginAsync(string email, string password);
        public Task<string> ApplicantLoginAsync(string email, string password);
        public Task<bool> ForgottenPasswordLoginAsync(string email);
    }
}
