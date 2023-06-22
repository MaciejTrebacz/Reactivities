using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

// because we are using our Identity framework in API we can make simple data validation with annotations no need to use fluent assertions
public class RegisterDto
{
    [Required]
    public string DisplayName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{7,40}",ErrorMessage = "Stronger passport please")]
    public string Password { get; set; }
    [Required]
    public string Username { get; set; }
}