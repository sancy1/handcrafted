

// // src/app/(main)/products/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { fetchAllProducts } from '@/lib/data/products';
// import { fetchCategories } from '@/lib/data/categories';
// import ProductCard from '@/components/products/ProductCard';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { PlusIcon } from '@heroicons/react/24/outline';

// export default function ProductsPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { data: session } = useSession();

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [productsData, categoriesData] = await Promise.all([
//           fetchAllProducts(),
//           fetchCategories(),
//         ]);
//         setProducts(productsData);
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>

//         {/* {session?.user?.role === 'artisan' && (
//           <Link href="/products/create">
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
//               <PlusIcon className="h-4 w-4" />
//               Add Product
//             </Button>
//           </Link>
//         )} */}
        
//       </div>

//       {/* Search and Filter (Placeholder) */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//             />
//           </div>
//           <div>
//             <select className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white">
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category.categoryId} value={category.categoryId}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <select className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white">
//               <option value="">Sort By</option>
//               <option value="newest">Newest</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       {products.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-[#6C6C6C]">No products found.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.productId} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Pagination (Placeholder) */}
//       <div className="mt-8 flex justify-center">
//         <nav className="flex items-center gap-2">
//           <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
//             Previous
//           </button>
//           <button className="px-3 py-1 rounded border border-[#B55B3D] bg-[#B55B3D] text-white">
//             1
//           </button>
//           <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
//             2
//           </button>
//           <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
//             3
//           </button>
//           <button className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E]">
//             Next
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// }












// =================================================================================================









// // src/app/(main)/products/page.tsx

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import { fetchAllProducts } from '@/lib/data/products'; // Will be updated to accept params
// import { fetchCategories } from '@/lib/data/categories';
// import ProductCard from '@/components/products/ProductCard';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { PlusIcon } from '@heroicons/react/24/outline';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation'; // Import Next.js hooks for URL management
// import { debounce } from 'lodash'; // You might need to install lodash: npm install lodash

// // Define an interface for the fetch result to ensure type safety
// interface ProductsFetchResult {
//   products: any[]; // Replace 'any[]' with your actual Product type if available
//   totalPages: number;
//   totalProducts: number;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1); // New state for total pages
//   const { data: session } = useSession();

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   // Get current query parameters from URL
//   const searchQuery = searchParams.get('query') || '';
//   const categoryFilter = searchParams.get('category') || '';
//   const sortOrder = (searchParams.get('sort') || 'newest') as 'newest' | 'price-asc' | 'price-desc' | 'rating';
//   const pageParam = parseInt(searchParams.get('page') || '1');

//   // --- Effect to fetch data based on URL parameters ---
//   useEffect(() => {
//     // Ensure currentPage state matches URL param
//     if (pageParam !== currentPage) {
//       setCurrentPage(pageParam);
//     }

//     async function loadData() {
//       setLoading(true);
//       try {
//         const [productsResult, categoriesData] = await Promise.all([
//           fetchAllProducts(pageParam, 12, searchQuery, categoryFilter, sortOrder), // Pass params to fetchAllProducts
//           fetchCategories(),
//         ]);
//         setProducts(productsResult.products);
//         setTotalPages(productsResult.totalPages); // Update total pages
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, [pageParam, searchQuery, categoryFilter, sortOrder]); // Re-run effect when URL params change

//   // --- Handlers for Search, Filter, and Pagination ---

//   // Update URL for search query (debounced for better performance)
//   const handleSearch = useCallback(
//     debounce((term: string) => {
//       const params = new URLSearchParams(searchParams);
//       if (term) {
//         params.set('query', term);
//       } else {
//         params.delete('query');
//       }
//       params.set('page', '1'); // Reset to first page on new search
//       router.replace(`${pathname}?${params.toString()}`);
//     }, 300), // Debounce by 300ms
//     [searchParams, router, pathname]
//   );

//   // Update URL for category filter
//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams);
//     if (e.target.value) {
//       params.set('category', e.target.value);
//     } else {
//       params.delete('category');
//     }
//     params.set('page', '1'); // Reset to first page on new filter
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   // Update URL for sort order
//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams);
//     if (e.target.value) {
//       params.set('sort', e.target.value);
//     } else {
//       params.delete('sort');
//     }
//     params.set('page', '1'); // Reset to first page on new sort
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   // Update URL for pagination
//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', page.toString());
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   // --- Render Loading Skeleton ---
//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(12)].map((_, i) => ( // Adjust skeleton count to match items per page
//             <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>

//         {/* {session?.user?.role === 'artisan' && (
//           <Link href="/products/create">
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
//               <PlusIcon className="h-4 w-4" />
//               Add Product
//             </Button>
//           </Link>
//         )} */}
//       </div>

//       {/* Search and Filter Controls */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               defaultValue={searchQuery} // Set initial value from URL
//               onChange={(e) => handleSearch(e.target.value)} // Use debounced handler
//             />
//           </div>
//           <div>
//             <select
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={categoryFilter} // Control value from URL
//               onChange={handleCategoryChange}
//             >
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category.categoryId} value={category.categoryId}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <select
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={sortOrder} // Control value from URL
//               onChange={handleSortChange}
//             >
//               <option value="newest">Newest</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       {products.length === 0 && !loading ? ( // Ensure not loading before showing no products
//         <div className="text-center py-12">
//           <p className="text-[#6C6C6C]">No products found matching your criteria.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.productId} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && ( // Only show pagination if there's more than 1 page
//         <div className="mt-8 flex justify-center">
//           <nav className="flex items-center gap-2">
//             <button
//               className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage <= 1}
//             >
//               Previous
//             </button>

//             {/* Render page numbers */}
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 className={`px-3 py-1 rounded border ${
//                   page === currentPage ? 'border-[#B55B3D] bg-[#B55B3D] text-white' : 'border-[#E6E1DC] bg-white text-[#3E3E3E]'
//                 }`}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages}
//             >
//               Next
//             </button>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }























// // src/app/(main)/products/page.tsx

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import { fetchAllProducts } from '@/lib/data/products'; // Will be updated to accept params
// import { fetchCategories } from '@/lib/data/categories';
// import ProductCard from '@/components/products/ProductCard';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { PlusIcon } from '@heroicons/react/24/outline';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation'; // Import Next.js hooks for URL management
// // import { debounce } from 'lodash'; // No longer needed for this explicit search method

// // Define an interface for the fetch result to ensure type safety
// interface ProductsFetchResult {
//   products: any[]; // Replace 'any[]' with your actual Product type if available
//   totalPages: number;
//   totalProducts: number;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1); // New state for total pages
//   const { data: session } = useSession();

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   // Get current query parameters from URL
//   const searchQuery = searchParams.get('query') || '';
//   const categoryFilter = searchParams.get('category') || '';
//   const sortOrder = (searchParams.get('sort') || 'newest') as 'newest' | 'price-asc' | 'price-desc' | 'rating';
//   const pageParam = parseInt(searchParams.get('page') || '1');

//   // NEW STATE: Local state for the search input value
//   const [localSearchInput, setLocalSearchInput] = useState(searchQuery);

//   // Effect to keep local search input in sync with URL changes (e.g., if user navigates back/forward)
//   useEffect(() => {
//     setLocalSearchInput(searchQuery);
//   }, [searchQuery]);


//   // --- Effect to fetch data based on URL parameters ---
//   useEffect(() => {
//     // Ensure currentPage state matches URL param
//     if (pageParam !== currentPage) {
//       setCurrentPage(pageParam);
//     }

//     async function loadData() {
//       setLoading(true);
//       try {
//         const [productsResult, categoriesData] = await Promise.all([
//           // Pass params to fetchAllProducts - `searchQuery` comes from URL, not local state
//           fetchAllProducts(pageParam, 12, searchQuery, categoryFilter, sortOrder),
//           fetchCategories(),
//         ]);
//         setProducts(productsResult.products);
//         setTotalPages(productsResult.totalPages); // Update total pages
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, [pageParam, searchQuery, categoryFilter, sortOrder]); // Re-run effect when URL params change


//   // --- Handlers for Search, Filter, and Pagination ---

//   // NEW: Function to trigger the actual search (updates URL)
//   const triggerSearch = useCallback(() => {
//     const params = new URLSearchParams(searchParams);
//     if (localSearchInput) {
//       params.set('query', localSearchInput);
//     } else {
//       params.delete('query');
//     }
//     params.set('page', '1'); // Reset to first page on new search
//     router.replace(`${pathname}?${params.toString()}`);
//   }, [localSearchInput, searchParams, router, pathname]); // Depend on localSearchInput

//   // NEW: Handle Enter key press in the search input
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       triggerSearch();
//     }
//   };

//   // Update URL for category filter
//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams);
//     if (e.target.value) {
//       params.set('category', e.target.value);
//     } else {
//       params.delete('category');
//     }
//     params.set('page', '1'); // Reset to first page on new filter
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   // Update URL for sort order
//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams);
//     if (e.target.value) {
//       params.set('sort', e.target.value);
//     } else {
//       params.delete('sort');
//     }
//     params.set('page', '1'); // Reset to first page on new sort
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   // Update URL for pagination
//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', page.toString());
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   // --- Render Loading Skeleton ---
//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(12)].map((_, i) => ( // Adjust skeleton count to match items per page
//             <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>

//         {/* {session?.user?.role === 'artisan' && (
//           <Link href="/products/create">
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
//               <PlusIcon className="h-4 w-4" />
//               Add Product
//             </Button>
//           </Link>
//         )} */}
//       </div>

//       {/* Search and Filter Controls */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* MODIFIED: Search Input and Button Section */}
//           <div className="flex flex-col sm:flex-row gap-2"> {/* This creates the responsive row/column layout */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="flex-grow rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={localSearchInput}
//               onChange={(e) => setLocalSearchInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             {/* NEW: Smaller, inline Search Button */}
//             <button
//               className="bg-[#B55B3D] text-white px-4 py-2 rounded font-semibold hover:bg-[#9E4F37] text-center whitespace-nowrap"
//               onClick={triggerSearch}
//             >
//               Search
//             </button>
//           </div>
//           <div>
//             <select
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={categoryFilter} // Control value from URL
//               onChange={handleCategoryChange}
//             >
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category.categoryId} value={category.categoryId}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <select
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={sortOrder} // Control value from URL
//               onChange={handleSortChange}
//             >
//               <option value="newest">Newest</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       {products.length === 0 && !loading ? ( // Ensure not loading before showing no products
//         <div className="text-center py-12">
//           <p className="text-[#6C6C6C]">No products found matching your criteria.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.productId} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && ( // Only show pagination if there's more than 1 page
//         <div className="mt-8 flex justify-center">
//           <nav className="flex items-center gap-2">
//             <button
//               className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage <= 1}
//             >
//               Previous
//             </button>

//             {/* Render page numbers */}
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 className={`px-3 py-1 rounded border ${
//                   page === currentPage ? 'border-[#B55B3D] bg-[#B55B3D] text-white' : 'border-[#E6E1DC] bg-white text-[#3E3E3E]'
//                 }`}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages}
//             >
//               Next
//             </button>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }


















// // src/app/(main)/products/page.tsx

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import { fetchAllProducts } from '@/lib/data/products';
// import { fetchCategories } from '@/lib/data/categories';
// import ProductCard from '@/components/products/ProductCard';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // IMPORT MagnifyingGlassIcon
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// interface ProductsFetchResult {
//   products: any[];
//   totalPages: number;
//   totalProducts: number;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const { data: session } = useSession();

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const searchQuery = searchParams.get('query') || '';
//   const categoryFilter = searchParams.get('category') || '';
//   const sortOrder = (searchParams.get('sort') || 'newest') as 'newest' | 'price-asc' | 'price-desc' | 'rating';
//   const pageParam = parseInt(searchParams.get('page') || '1');

//   const [localSearchInput, setLocalSearchInput] = useState(searchQuery);

//   useEffect(() => {
//     setLocalSearchInput(searchQuery);
//   }, [searchQuery]);

//   useEffect(() => {
//     if (pageParam !== currentPage) {
//       setCurrentPage(pageParam);
//     }

//     async function loadData() {
//       setLoading(true);
//       try {
//         const [productsResult, categoriesData] = await Promise.all([
//           fetchAllProducts(pageParam, 12, searchQuery, categoryFilter, sortOrder),
//           fetchCategories(),
//         ]);
//         setProducts(productsResult.products);
//         setTotalPages(productsResult.totalPages);
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, [pageParam, searchQuery, categoryFilter, sortOrder]);

//   const triggerSearch = useCallback(() => {
//     const params = new URLSearchParams(searchParams);
//     if (localSearchInput) {
//       params.set('query', localSearchInput);
//     } else {
//       params.delete('query');
//     }
//     params.set('page', '1');
//     router.replace(`${pathname}?${params.toString()}`);
//   }, [localSearchInput, searchParams, router, pathname]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       triggerSearch();
//     }
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams);
//     if (e.target.value) {
//       params.set('category', e.target.value);
//     } else {
//       params.delete('category');
//     }
//     params.set('page', '1');
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const params = new URLSearchParams(searchParams);
//     if (e.target.value) {
//       params.set('sort', e.target.value);
//     } else {
//       params.delete('sort');
//     }
//     params.set('page', '1');
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', page.toString());
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(12)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>

//         {/* {session?.user?.role === 'artisan' && (
//           <Link href="/products/create">
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
//               <PlusIcon className="h-4 w-4" />
//               Add Product
//             </Button>
//           </Link>
//         )} */}
//       </div>

//       {/* Search and Filter Controls */}
//       <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* MODIFIED: Search Input with Integrated Button */}
//           <div className="relative"> {/* Added relative positioning */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full rounded-md border border-[#E6E1DC] py-2 pl-3 pr-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={localSearchInput}
//               onChange={(e) => setLocalSearchInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             {/* Search Icon Button */}
//             <button
//               type="button" // Important to set type="button" to prevent form submission if wrapped in a form
//               onClick={triggerSearch}
//               className="absolute inset-y-0 right-0 flex items-center pr-3" // Positioned absolutely to the right
//               aria-label="Search" // Added for accessibility
//             >
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             </button>
//           </div>

//           {/* Category Filter */}
//           <div>
//             <select
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={categoryFilter}
//               onChange={handleCategoryChange}
//             >
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category.categoryId} value={category.categoryId}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort Order */}
//           <div>
//             <select
//               className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//               value={sortOrder}
//               onChange={handleSortChange}
//             >
//               <option value="newest">Newest</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       {products.length === 0 && !loading ? (
//         <div className="text-center py-12">
//           <p className="text-[#6C6C6C]">No products found matching your criteria.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.productId} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center">
//           <nav className="flex items-center gap-2">
//             <button
//               className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage <= 1}
//             >
//               Previous
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 className={`px-3 py-1 rounded border ${
//                   page === currentPage ? 'border-[#B55B3D] bg-[#B55B3D] text-white' : 'border-[#E6E1DC] bg-white text-[#3E3E3E]'
//                 }`}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages}
//             >
//               Next
//             </button>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }










// src/app/(main)/products/page.tsx


import { Suspense } from 'react'; // Import Suspense from React
import { fetchAllProducts } from '@/lib/data/products'; // Server Action
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/products/ProductCard';
import ProductSearchAndFilter from '@/components/products/ProductSearchAndFilter'; // Import the new search/filter component
import ClientPagination from '@/components/products/ClientPagination'; // Import the new pagination component

// REVISED INTERFACE TO SATISFY NEXT.JS BUILD TYPE CHECKS
// For non-dynamic routes, Next.js's internal PageProps can sometimes expect 'params' or 'searchParams'
// to be a Promise<any> during the build phase (especially if generateMetadata is involved).
// Using 'any' as a workaround for these specific build-time type conflicts.
interface ProductsPageProps {
  params?: any; // Use 'any' to bypass strict build-time Promise<any> compatibility issues
  searchParams?: any; // Use 'any' to bypass strict build-time Promise<any> compatibility issues
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // We still treat searchParams as a plain object at runtime for safe access
  // Awaiting it ensures it's resolved if it were ever a Promise (though typically not for searchParams)
  const currentSearchParams = (await searchParams) || {};

  // Extract parameters, using type assertions for safety after the 'any' workaround
  const currentPage = parseInt((currentSearchParams.page as string) || '1');
  const searchQuery = (currentSearchParams.query as string) || '';
  const categoryFilter = (currentSearchParams.category as string) || '';
  const sortOrder = (currentSearchParams.sort as 'newest' | 'price-asc' | 'price-desc' | 'rating') || 'newest';

  // Fetch products on the server using the server action
  const { products, totalPages } = await fetchAllProducts(
    currentPage,
    12, // products per page
    searchQuery,
    categoryFilter,
    sortOrder
  );

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>
        <Link href="/products/create">
          <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div> */}

      {/* Wrap the search/filter/sort client component in Suspense */}
      <Suspense fallback={
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC] h-28 animate-pulse">
          {/* Skeleton for the search/filter UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-[#E6E1DC] rounded"></div>
            <div className="h-10 bg-[#E6E1DC] rounded"></div>
            <div className="h-10 bg-[#E6E1DC] rounded"></div>
          </div>
        </div>
      }>
        <ProductSearchAndFilter />
      </Suspense>

      {/* Products Grid (rendered on server with initial data) */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#6C6C6C]">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {/* Wrap the pagination client component in Suspense */}
      {totalPages > 1 && (
        <Suspense fallback={
          <div className="mt-8 flex justify-center h-10 w-full bg-white rounded-lg animate-pulse">
            {/* Skeleton for pagination */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-8 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-8 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-8 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-20 h-8 bg-[#E6E1DC] rounded"></div>
            </div>
          </div>
        }>
          <ClientPagination currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      )}
    </div>
  );
}