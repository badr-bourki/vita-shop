export default function Wishlist() {
  return (
    <div className="container-custom py-12">
      <h1 className="font-serif text-3xl font-bold mb-2">Wishlist</h1>
      <p className="text-muted-foreground mb-6">
        Products you’ve saved for later
      </p>

      <div className="p-6 bg-card border border-border rounded-xl">
        <p className="text-muted-foreground">Your wishlist is empty.</p>
      </div>
    </div>
  );
}
