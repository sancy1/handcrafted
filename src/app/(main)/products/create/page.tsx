
// src/app/dashboard/products/create/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { createProduct } from '@/lib/data/products';
import { fetchCategories } from '@/lib/data/categories';
import ProductForm from '@/components/products/ProductForm';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    if (!session?.user?.id) return;
    
    try {
      await createProduct(session.user.id, formData);
      router.push('/products');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse h-96"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">Create New Product</h1>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
        <ProductForm 
          sellerId={session?.user?.id || ''}
          onSubmit={handleSubmit}
          categories={categories}
        />
      </div>
    </div>
  );
}