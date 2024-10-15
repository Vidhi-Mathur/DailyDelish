import { Link } from 'react-router-dom'
import { Search, ShoppingCart, Tag, Clock, Truck, Plus, Minus } from 'lucide-react'
import { featuredCategories, featuredProducts  } from "../../data/data.json"
import { useContext, useState } from 'react'
import { AuthContext } from '../../store/auth-context';

const sectionFeatures = [
    {
      icon: <Tag className="w-12 h-12 text-green-500 mr-4" />,
      title: 'Best Prices',
      description: 'We offer competitive prices on our 100,000+ product range',
    },
    {
      icon: <Clock className="w-12 h-12 text-green-500 mr-4" />,
      title: 'Same-day Delivery',
      description: 'Order before 3 PM for same-day delivery',
    },
    {
      icon: <Truck className="w-12 h-12 text-green-500 mr-4" />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on orders over &#8377;50',
    },
];

export const HomePage = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [cart, setCart] = useState({})
    const addToCartHandler = (product) => {
      setCart((prevCart) => {
        const existingProduct = prevCart[product.name]
        const newQuantity = existingProduct ? existingProduct.quantity + 1 : 1
        return { 
            ...prevCart, 
            [product.name]: { ...product, quantity: newQuantity } 
        }
      })
    }
    const increaseQuantityHandler = (product) => {
      setCart((prevCart) => ({
        ...prevCart,
        [product.name]: { ...product, quantity: prevCart[product.name].quantity + 1 },
      }))
    }

    const decreaseQuantityHandler = (product) => {
      setCart((prevCart) => {
        const currentQuantity = prevCart[product.name].quantity
        if (currentQuantity === 1) {
          const newCart = { ...prevCart }
          delete newCart[product.name]
          return newCart
        } 
        else {
          return {
            ...prevCart,
            [product.name]: { ...product, quantity: currentQuantity - 1 },
          }
        }
      })
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-96 pt-24">
            <section className="mb-12">
                <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-xl p-8 text-white">
                    <p className="text-xl mb-6">Fresh groceries delivered to your doorstep</p>
                    <div className="flex">
                        <input type="text" placeholder="Search for groceries..." className="flex-grow p-3 rounded-l-lg text-gray-800 focus:outline-none" />
                        <button className="bg-green-800 p-3 rounded-r-lg hover:bg-green-900 transition-colors duration-200">
                          <Search className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {featuredCategories.map((category, index) => (
                        <Link key={index} to={`/category/${category.name.toLowerCase().replace(' ', '-')}`} className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-200">
                            <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-md mb-2" />
                            <h3 className="text-center font-medium">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => {
                        const existingItem = cart[product.name]
                        return (
                            <div key={index} className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-200">
                                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                                <h3 className="font-medium mb-1">{product.name}</h3>
                                <p className="text-green-600 font-bold">&#8377;{product.price.toFixed(2)}</p>
                                {isAuthenticated ? (
                                    existingItem ? (
                                        <div className="mt-2 flex items-center justify-center font-bold">
                                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200" onClick={() => decreaseQuantityHandler(product)}><Minus /></button>
                                            <span className="mx-4">{existingItem.quantity}</span>
                                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200" onClick={() => increaseQuantityHandler(product)}><Plus /></button>
                                        </div>
                                    ) : (
                                        <button className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center" onClick={() => addToCartHandler(product)}>
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            Add to Cart
                                        </button>
                                    )
                                ) : (
                                    <p className="text-gray-500 mt-2">Please log in to add to cart</p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sectionFeatures.map((feature, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        {feature.icon}
                        <div>
                            <h3 className="font-semibold mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    ) 
}   