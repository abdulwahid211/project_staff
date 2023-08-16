using AdminService.Repository;
using BackendService.Model;

namespace BackendService.Graphql
{
    public sealed class Mutation
    {
        public Admin AddAdmin([Service] IAdminRepository context, Admin admin) => context.CreateAdmin(admin);
    }
}
