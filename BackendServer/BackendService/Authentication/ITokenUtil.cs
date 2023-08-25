namespace BackendService.Authentication
{
    public interface ITokenUtil
    {
        public string ValidateUser(IHttpContextAccessor http);
        public string GenerateAccessToken(string username);
        public string JsonTokenMessageFormat(string message);
        public void CheckValidateUser(IHttpContextAccessor http);
    }
}
