import products from '../assets/products.json';
import Filter from './Filter';

export const Header = () => {
    return (
        <header>
            <nav className="bg-slate-200 opacity-60 text-black rounded-md p-10 w-full h-24 flex items-center justify-between">

                <div className="flex items-center space-x-4">
                    <img className="w-1/6" src="src/assets/ligmav2.png" alt="Logo" />
                    <div className="font-bold ml-2">Giga Ligma E-shop</div>

                    <Filter products={products} />
                </div>

            </nav>
        </header>
    )
}

export default Header