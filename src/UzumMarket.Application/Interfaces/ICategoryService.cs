using UzumMarket.Application.DTOs.Products;

namespace UzumMarket.Application.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
    Task<CategoryDto> CreateAsync(string name);
}
