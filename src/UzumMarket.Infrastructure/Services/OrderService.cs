using Microsoft.EntityFrameworkCore;
using UzumMarket.Application.DTOs.Orders;
using UzumMarket.Application.Interfaces;
using UzumMarket.Domain.Entities;
using UzumMarket.Domain.Enums;
using UzumMarket.Infrastructure.Data;

namespace UzumMarket.Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, int userId)
    {
        var order = new Order
        {
            UserId = userId,
            Status = OrderStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        decimal totalPrice = 0;

        foreach (var itemDto in dto.Items)
        {
            var product = await _context.Products.FindAsync(itemDto.ProductId);
            if (product == null) throw new Exception($"Product {itemDto.ProductId} not found");

            if (product.Stock < itemDto.Quantity)
                throw new Exception($"Insufficient stock for {product.Name}");

            var price = product.DiscountPrice ?? product.Price;
            totalPrice += price * itemDto.Quantity;

            product.Stock -= itemDto.Quantity; // Update stock

            order.Items.Add(new OrderItem
            {
                ProductId = product.Id,
                Quantity = itemDto.Quantity,
                UnitPrice = price
            });
        }

        order.TotalPrice = totalPrice;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Refetch to include product names for DTO if needed, or just map manually
        return MapToDto(order);
    }

    public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId)
    {
        var orders = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return orders.Select(MapToDto);
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int id, int userId)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

        return order == null ? null : MapToDto(order);
    }

    private static OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            TotalPrice = order.TotalPrice,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            Items = order.Items.Select(i => new OrderItemDto
            {
                ProductId = i.ProductId,
                ProductName = i.Product?.Name,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList()
        };
    }
}
