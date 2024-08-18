using Microsoft.AspNetCore.Identity;

namespace LawApi.Models
{
    public class AppUser: IdentityUser
    {
        public string? FullName { get; set; }
    }
}
