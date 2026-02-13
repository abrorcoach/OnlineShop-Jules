using UzumMarket.Domain.Enums;

namespace UzumMarket.Application.DTOs.Orders;

public class OrderDto
{
    public int Id { get; set; }
    public decimal TotalPrice { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}
