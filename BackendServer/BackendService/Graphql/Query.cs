using AdminService.Repository;
using BackendService.Model;

namespace BackendService.Graphql
{
    public sealed class Query
    {
        [UseFiltering]
        public IEnumerable<Admin> admins([Service] IAdminRepository context) => context.GetAllAdmins();
    }
}
