using AdminService.Data;
using BackendService.Authentication;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class UserAuthLogins : IUserAuthLogins
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public UserAuthLogins(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<string> AdminLoginAsync(string email, string password)
        {
            var result = await _dbContext.Admins.Where(x => x.Email.Equals(email) && x.Password.Equals(password)).ToListAsync();
            if (result.Count > 0)
            {
                return _tokenMethods.GenerateAccessToken(email);
            }
            else
            {
                return _tokenMethods.JsonTokenMessageFormat("Not Found");
            }
        }

        public async Task<string> ApplicantLoginAsync(string email, string password)
        {
            var result = await _dbContext.Applicants.Where(x => x.Email.Equals(email) && x.Password.Equals(password)).ToListAsync();
            if (result.Count > 0)
            {
                return _tokenMethods.GenerateAccessToken(email);
            }
            else
            {
                return _tokenMethods.JsonTokenMessageFormat("Not Found");
            }
        }

        public Task<bool> ForgottenPasswordLoginAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
