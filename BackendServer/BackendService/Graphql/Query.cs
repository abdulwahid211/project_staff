using BackendService.Model;
using BackendService.Repository.Interfaces;

namespace BackendService.Graphql
{
    public sealed class Query
    {
        [UseFiltering]
        public IEnumerable<Admin> Admins([Service] IAdminRepository context) => context.GetAllAdmins();
        public Admin Admin([Service] IAdminRepository context, string email) => context.GetAdmin(email);
    }
}
