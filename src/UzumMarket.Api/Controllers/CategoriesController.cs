using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UzumMarket.Application.Interfaces;
using UzumMarket.Application.DTOs.Products;

namespace UzumMarket.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _categoryService.GetAllAsync());
    }

    [HttpPost]
    [Authorize] // Admin only usually
    public async Task<IActionResult> Create([FromBody] CategoryDto dto)
    {
        var category = await _categoryService.CreateAsync(dto.Name);
        return Ok(category);
    }
}
