interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: string;
  inStock: number;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="mx-auto p-8 px-8 border border-gray-200 rounded-lg">
      <img className=" object-contain h-48 w-96" src={product.image} alt="" />
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl">{product.title}</h1>
          <p className="text-lg">{product.price} Kr</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
