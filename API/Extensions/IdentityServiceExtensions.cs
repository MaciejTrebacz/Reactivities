using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{

    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentity<AppUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>();

        return services;
    }
}