using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{

    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentity<AppUser, IdentityRole>(options => {
             options.SignIn.RequireConfirmedAccount = true;
             options.User.RequireUniqueEmail = true;
         })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>();

        // we need same key as we using for signing after succesfull login
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            config["TokenKey"]!));

        // adding authentication
        // we need to validate our jwt tokens 
        services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                // how we wanna validate our tokens 
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    // accepting only signed tokens
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,

                };
            });
        services.AddScoped<TokenService>();

        return services;
    }
}