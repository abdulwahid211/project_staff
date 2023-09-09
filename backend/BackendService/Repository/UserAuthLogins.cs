using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
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

        public async Task<AuthPayLoad> AdminLoginAsync(string email, string password)
        {
            var hashedPassword = PasswordUtil.HashPassword(password);
            var validPassword = PasswordUtil.VerifyHashPassword(password, hashedPassword);
            var admin = await _dbContext.Admins.SingleOrDefaultAsync(x => x.Email.Equals(email) && validPassword);
            var payload = new AuthPayLoad
            {
                Token = "",
                Id = 0
            };
            if (admin is not null)
            {
                payload.Id = (int)admin.AdminID;
                payload.Token = _tokenMethods.GenerateAccessToken(email);
                return payload;
            }
            else
            {
                payload.Token = "Not Found";
                return payload;
            }
        }

        public async Task<AuthPayLoad> ApplicantLoginAsync(string email, string password)
        {
            var hashedPassword = PasswordUtil.HashPassword(password);
            var validPassword = PasswordUtil.VerifyHashPassword(password, hashedPassword);
            var applicant = await _dbContext.Applicants.SingleOrDefaultAsync(x => x.Email.Equals(email) && validPassword);
            var payload = new AuthPayLoad
            {
                Token = "",
                Id = 0
            };
            if (applicant is not null)
            {
                payload.Token = _tokenMethods.GenerateAccessToken(email);
                payload.Id = (int)applicant.ApplicantID;
                return payload;
            }
            else
            {
                payload.Token = "Not Found";
                return payload;
            }
        }

        public Task<bool> ForgottenPasswordLoginAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
