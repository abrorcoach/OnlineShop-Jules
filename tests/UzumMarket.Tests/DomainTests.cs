using UzumMarket.Domain.Entities;
using Xunit;

namespace UzumMarket.Tests;

public class DomainTests
{
    [Fact]
    public void User_Should_Have_Correct_Properties()
    {
        var user = new User
        {
            FullName = "Test User",
            Email = "test@example.com",
            PasswordHash = "hashed_password",
            Role = UzumMarket.Domain.Enums.Role.Customer
        };

        Assert.Equal("Test User", user.FullName);
        Assert.Equal("test@example.com", user.Email);
        Assert.Equal(UzumMarket.Domain.Enums.Role.Customer, user.Role);
    }
}
