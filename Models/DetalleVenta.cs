namespace VentaProductos.Models;

public class DetalleVenta
{
    public int Id { get; set; }

    public int IdProducto { get; set; }
    public virtual Producto? Producto { get; set; } = null!;
    
    public int IdVenta { get; set; }
    public virtual Venta? Venta { get; set; } = null!;
}
