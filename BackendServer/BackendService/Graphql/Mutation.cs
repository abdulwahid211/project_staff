using BackendService.Model;
using BackendService.Repository.Interfaces;

namespace BackendService.Graphql
{
    public sealed class Mutation
    {
        public Admin CreateAdmin([Service] IAdminRepository context, Admin admin) => context.CreateAdmin(admin);
        public bool DeleteAdmin([Service] IAdminRepository context, string email) => context.DeleteAdmin(email);
        public Admin UpdateAdmin([Service] IAdminRepository context, Admin admin) => context.UpdateAdmin(admin);
    }
}
