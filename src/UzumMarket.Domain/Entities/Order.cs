using UzumMarket.Domain.Enums;

namespace UzumMarket.Domain.Entities;

public class Order : BaseEntity
{
    public int UserId { get; set; }
    public User? User { get; set; }

    public decimal TotalPrice { get; set; }
    public OrderStatus Status { get; set; }

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
