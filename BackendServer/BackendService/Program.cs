using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Authentication;
using BackendService.Graphql;
using BackendService.Repository;
using BackendService.Repository.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VacanciesService.Repository;

var builder = WebApplication.CreateBuilder(args);

// add db connections 
var dbConnectionString = builder.Configuration.GetConnectionString("mysql");

var secretKey = builder.Configuration.GetValue<string>("Jwt:SecretKey");
var signingKey = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(secretKey));

builder.Services.AddDbContextPool<LandSeaDbContext>(options => options.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString)));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
      options.TokenValidationParameters = new TokenValidationParameters
      {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = "localhost",
          ValidAudience = "localhost",
          IssuerSigningKey = signingKey
      };
  });

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITokenUtil, TokenUtil>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IApplicantsRepository, ApplicantsRepository>();
builder.Services.AddScoped<IEmployerRepository, EmployerRepository>();
builder.Services.AddScoped<IAppliedJobsRepository, AppliedJobsRepository>();
builder.Services.AddScoped<IVacanciesRepository, VacanciesRepository>();
builder.Services.AddScoped<IUserAuthLogins, UserAuthLogins>();

builder.Services
    .AddHttpContextAccessor()
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddFiltering();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapGraphQL(path: "/graphql");

app.Run();
