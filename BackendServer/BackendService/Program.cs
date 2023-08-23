using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Graphql;
using BackendService.Repository;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using VacanciesService.Repository;

var builder = WebApplication.CreateBuilder(args);

// add db connections 
var dbConnectionString = builder.Configuration.GetConnectionString("mysql");
builder.Services.AddDbContextPool<LandSeaDbContext>(options => options.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString)));

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IApplicantsRepository, ApplicantsRepository>();
builder.Services.AddScoped<IEmployerRepository, EmployerRepository>();
builder.Services.AddScoped<IAppliedJobsRepository, AppliedJobsRepository>();
builder.Services.AddScoped<IVacanciesRepository, VacanciesRepository>();
builder.Services
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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapGraphQL(path: "/graphql");

app.Run();
