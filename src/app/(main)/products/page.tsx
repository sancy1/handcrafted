

// src/app/(main)/products/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchAllProducts } from '@/lib/data/products';
import { fetchCategories } from '@/lib/data/categories';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>

        {/* {session?.user?.role === 'artisan' && (
          <Link href="/products/create">
            <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
              <PlusIcon className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        )} */}
        
      </div>

      {/* Search and Filter (Placeholder) */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            />
          </div>
          <div>
            <select className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white">
              <option value="">Sort By</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#6C6C6C]">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {/* Pagination (Placeholder) */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
            Previous
          </button>
          <button className="px-3 py-1 rounded border border-[#B55B3D] bg-[#B55B3D] text-white">
            1
          </button>
          <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
            2
          </button>
          <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
            3
          </button>
          <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}