import useCart from "../../../core/hooks/use-cart"


const Cart = () => {
  const {total, cartItems, emptyCart, removeItem} = useCart()
  return (
    <div className={`container mx-auto`}>
      <h1 className="text-3xl font-bold h1">Panier</h1>

    </div>
  )
}

export default Cart