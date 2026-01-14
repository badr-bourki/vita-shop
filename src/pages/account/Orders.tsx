export default function Orders() {
  return (
    <div className="container-custom py-12">
      <h1 className="font-serif text-3xl font-bold mb-2">Orders</h1>
      <p className="text-muted-foreground mb-6">
        View your order history and status
      </p>

      <div className="p-6 bg-card border border-border rounded-xl">
        <p className="text-muted-foreground">No orders yet.</p>
      </div>
    </div>
  );
}
