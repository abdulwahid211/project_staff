using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendService.Authentication
{
    public class TokenUtil : ITokenUtil
    {
        private IConfiguration _config;
        public TokenUtil(IConfiguration config)
        {
            _config = config;
        }

        public string ValidateUser(IHttpContextAccessor http)
        {
            var keyValue = _config.GetValue<string>("Jwt:SecretKey");
            var token = http.HttpContext.Request.Headers.Authorization;
            var tokenHandler = new JwtSecurityTokenHandler();

            if (token.IsNullOrEmpty())
                return string.Empty;

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var username = jwtToken.Claims.First(x => x.Type == "username").Value;

                // return username from JWT token if validation successful
                return username.ToString();
            }
            catch
            {
                return string.Empty;
            }
        }

        public void CheckValidateUser(IHttpContextAccessor http)
        {
            if (ValidateUser(http).IsNullOrEmpty())
            {
                throw new ArgumentException("Valid Token is required to access resource");
            }
        }

        public string GenerateAccessToken(string username)
        {
            var keyValue = _config.GetValue<string>("Jwt:SecretKey");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("username", username) }),
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var generatedToken = tokenHandler.WriteToken(token);

            return JsonTokenMessageFormat(generatedToken);
        }

        public string JsonTokenMessageFormat(string message)
        {
            var tokenFormat = new
            {
                token = message
            };

            return JsonConvert.SerializeObject(tokenFormat).ToString();
        }



    }
}
