
// // src/app/page.tsx

// 'use client'; // Add this line if you use client-side hooks like useRouter
// import { useRouter } from 'next/navigation'; // Import useRouter

// export default function Home() {
//   const router = useRouter(); // Initialize useRouter

//   return (
//     <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">
//       {/* Hero Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-16 bg-[#F3ECE5]">
//         <div>
//           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
//             Discover Unique <br /> Handcrafted Creations
//           </h1>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <button className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37]"
//             onClick={() => router.push('/products')}
//             >
//               Explore Products
//             </button>

//             <button 
//               className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8]"
//               onClick={() => router.push('/meet-artisans')}
//             >
//               Meet Artisans
//             </button>
//           </div>

//         </div>
//         <div>
//           <div className="w-full h-64 bg-[#E6E1DC] rounded-xl shadow" />
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="p-8 md:p-16">
//         <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="text-center">
//               <div className="w-full h-40 bg-[#E6E1DC] rounded-lg mb-4" />
//               <div className="h-4 w-3/4 bg-[#D0CBC6] rounded mx-auto mb-2" />
//               <div className="h-3 w-1/2 bg-[#D0CBC6] rounded mx-auto mb-1" />
//               <div className="h-4 w-1/4 bg-[#D0CBC6] rounded mx-auto mb-1" />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Top Artisans */}
      // <section className="p-8 md:p-16 bg-[#FFF]">
      //   <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
      //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      //     {[1, 2, 3].map((i) => (
      //       <div key={i} className="text-center">
      //         <div className="w-full h-48 bg-[#E6E1DC] rounded-lg mb-4" />
      //         <div className="h-4 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-2" />
      //         <div className="h-3 w-3/4 bg-[#D0CBC6] rounded mx-auto mb-1" />
      //         <div className="h-3 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-1" />
      //       </div>
      //     ))}
      //   </div>
      // </section>
//     </main>
//   );
// }















// // src/app/page.tsx

// // REMOVE 'use client'; // This file will now be a Server Component
// // REMOVE import { useRouter } from 'next/navigation'; // Not needed for a Server Component

// // Import the new fetch function and Product interface
// import { fetchFeaturedProducts } from '@/lib/data/products';
// import { Product } from '@/lib/definitions';
// import Image from 'next/image'; // Assuming you have Next.js Image component for images
// import Link from 'next/link';   // For linking to product details

// // --- Placeholder for a Product Card Component (if you don't have one) ---
// // You would ideally create this in src/components/products/ProductCard.tsx
// function HomeProductCard({ product }: { product: Product }) {
//   const primaryImage = product.images?.[0]?.imageUrl || '/placeholder-image.jpg'; // Fallback image

//   return (
//     <Link href={`/products/${product.productId}`} className="block group">
//       <div className="relative w-full h-40 bg-[#E6E1DC] rounded-lg mb-4 overflow-hidden shadow-md">
//         <Image 
//           src={primaryImage} 
//           alt={product.name} 
//           fill 
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           style={{ objectFit: 'cover' }}
//           className="transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>
//       <div className="text-center">
//         <h3 className="text-lg font-semibold text-[#3E3E3E] group-hover:text-[#B55B3D] transition-colors">
//           {product.name}
//         </h3>
//         <p className="text-[#6C6C6C] text-sm">
//           {product.seller?.shopName || 'Unknown Seller'}
//         </p>
//         <p className="text-lg font-bold text-[#B55B3D] mt-1">${product.price.toFixed(2)}</p>
//       </div>
//     </Link>
//   );
// }
// // --- End Product Card Placeholder ---


// export default async function Home() { // Make it an async function to fetch data
//   // Fetch featured products directly on the server
//   const featuredProducts = await fetchFeaturedProducts();

//   return (
//     <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">
//       {/* Hero Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-16 bg-[#F3ECE5]">
//         <div>
//           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
//             Discover Unique <br /> Handcrafted Creations
//           </h1>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link href="/products" className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37] text-center">
//               Explore Products
//             </Link>

//             <Link href="/meet-artisans" className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8] text-center">
//               Meet Artisans
//             </Link>
//           </div>

//         </div>
//         <div>
//           {/* You might want to replace this with an actual image or dynamic content */}
//           <div className="w-full h-64 bg-[#E6E1DC] rounded-xl shadow" />
//         </div>
//       </section>


//       {/* Featured Products */}
//       <section className="p-8 md:p-16">
//         <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {featuredProducts.length > 0 ? (
//             featuredProducts.map((product) => (
//               <HomeProductCard key={product.productId} product={product} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-[#6C6C6C]">No featured products available at the moment.</p>
//           )}
//         </div>
//       </section>

//       {/* Top Artisans */}
//       <section className="p-8 md:p-16 bg-[#FFF]">
//         <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="text-center">
//               <div className="w-full h-48 bg-[#E6E1DC] rounded-lg mb-4" />
//               <div className="h-4 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-2" />
//               <div className="h-3 w-3/4 bg-[#D0CBC6] rounded mx-auto mb-1" />
//               <div className="h-3 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-1" />
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }














// // src/app/page.tsx

// import { fetchFeaturedProducts } from '@/lib/data/products';
// import HomeProductCard from '@/components/products/HomeProductCard'; // Import the new component
// import Link from 'next/link';
// import Image from 'next/image'; // Make sure this is imported if you're using Image component in Hero section

// export default async function Home() {
//   const featuredProducts = await fetchFeaturedProducts();

//   return (
//     <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">
//       {/* Hero Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-16 bg-[#F3ECE5]">
//         <div>
//           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
//             Discover Unique <br /> Handcrafted Creations
//           </h1>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link href="/products" className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37] text-center">
//               Explore Products
//             </Link>
//             <Link href="/meet-artisans" className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8] text-center">
//               Meet Artisans
//             </Link>
//           </div>
//         </div>
//         <div>
//           {/* Example: Replace with an actual hero image or component */}
//           <div className="w-full h-64 bg-[#E6E1DC] rounded-xl shadow">
//              {/* <Image src="/path-to-your-hero-image.jpg" alt="Hero Image" fill style={{objectFit: 'cover'}} /> */}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="p-8 md:p-16">
//         <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {featuredProducts.length > 0 ? (
//             featuredProducts.map((product) => (
//               <HomeProductCard key={product.productId} product={product} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-[#6C6C6C]">No featured products available at the moment.</p>
//           )}
//         </div>
//       </section>

//       {/* Top Artisans */}
//       <section className="p-8 md:p-16 bg-[#FFF]">
//         <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="text-center">
//               <div className="w-full h-48 bg-[#E6E1DC] rounded-lg mb-4" />
//               <div className="h-4 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-2" />
//               <div className="h-3 w-3/4 bg-[#D0CBC6] rounded mx-auto mb-1" />
//               <div className="h-3 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-1" />
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

















// src/app/page.tsx

// import { fetchFeaturedProducts } from '@/lib/data/products';
// import { fetchTopArtisansForHomepage } from '@/lib/data/artisans'; // Import the new artisan fetch function
// import HomeProductCard from '@/components/products/HomeProductCard';
// import TopArtisanCard from '@/components/artisans/TopArtisanCard'; // Import the new artisan card component
// import Link from 'next/link';
// import Image from 'next/image';
// import HeroSlider from '@/components/ui/HeroSlider'; 

// export default async function Home() {
//   const featuredProducts = await fetchFeaturedProducts();
//   const topArtisans = await fetchTopArtisansForHomepage(); 

//   // Define your slider images here
//   const heroSlides = [
//     { src: '/images/slider/slide1.jpg', alt: 'Handcrafted jewelry on display', link: '/products?category=jewelry' },
//     { src: '/images/slider/slide2.jpg', alt: 'Pottery in a rustic setting', link: '/products?category=pottery' },
//     { src: '/images/slider/slide3.jpg', alt: 'Knitted textiles with natural dyes', link: '/products?category=textiles' },
//     { src: '/images/slider/slide4.jpg', alt: 'Wooden carvings and sculptures', link: '/products?category=woodwork' },
//     { src: '/images/slider/slide5.jpg', alt: 'Wooden carvings and sculptures', link: '/products?category=woodwork' },
//   ];

//   return (
//     <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">
      
//       {/* Hero Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-16 bg-[#F3ECE5]">
//         <div>
//           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
//             Discover Unique <br /> Handcrafted Creations
//           </h1>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link href="/products" className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37] text-center">
//               Explore Products
//             </Link>
//             <Link href="/meet-artisans" className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8] text-center">
//               Meet Artisans
//             </Link>
//           </div>
//         </div>
//         <div className="relative w-full min-h-[300px] md:min-h-[450px] lg:min-h-[50px]">
//           {/* Replaced placeholder with the HeroSlider component */}
//           <HeroSlider slides={heroSlides} autoplay={true} interval={5000} />
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="p-8 md:p-16">
//         <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {featuredProducts.length > 0 ? (
//             featuredProducts.map((product) => (
//               <HomeProductCard key={product.productId} product={product} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-[#6C6C6C]">No featured products available at the moment.</p>
//           )}
//         </div>
//       </section>

//       {/* Top Artisans */}
//       <section className="p-8 md:p-16 bg-[#FFF]">
//         <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {topArtisans.length > 0 ? (
//             topArtisans.map((artisan) => (
//               <TopArtisanCard key={artisan.id} artisan={artisan} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-[#6C6C6C]">No top artisans available at the moment.</p>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }


















// src/app/page.tsx

// src/app/page.tsx

import { fetchFeaturedProducts } from '@/lib/data/products';
import { fetchTopArtisansForHomepage } from '@/lib/data/artisans'; // Import the new artisan fetch function
import HomeProductCard from '@/components/products/HomeProductCard';
import TopArtisanCard from '@/components/artisans/TopArtisanCard'; // Import the new artisan card component
import Link from 'next/link';
// import Image from 'next/image'; // Not directly used in page.tsx for slider anymore
import HeroSlider from '@/components/ui/HeroSlider';

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts();
  const topArtisans = await fetchTopArtisansForHomepage();

  // Define your slider images here
  const heroSlides = [
    { src: '/images/slider/slide1.jpg', alt: 'Handcrafted jewelry on display', link: '/products?category=jewelry' },
    { src: '/images/slider/slide2.jpg', alt: 'Pottery in a rustic setting', link: '/products?category=pottery' },
    { src: '/images/slider/slide3.jpg', alt: 'Knitted textiles with natural dyes', link: '/products?category=textiles' },
    { src: '/images/slider/slide4.jpg', alt: 'Wooden carvings and sculptures', link: '/products?category=woodwork' },
    { src: '/images/slider/slide5.jpg', alt: 'Unique handmade accessories', link: '/products?category=accessories' },
  ];

  return (
    <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">

      {/* Hero Section */}
      {/* Changed to md:grid-cols-3 for a 1/3 (text) and 2/3 (slider) split */}
      <section className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 p-8 md:p-8 bg-[#F3ECE5]">
        {/* Text and buttons - now takes 1 column on medium screens */}
        <div className="md:col-span-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Discover Unique <br /> Handcrafted Creations
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37] text-center">
              Explore Products
            </Link>
            <Link href="/meet-artisans" className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8] text-center">
              Meet Artisans
            </Link>
          </div>
        </div>
        {/* Slider - now takes 2 columns on medium screens */}
        <div className="relative w-full min-h-[300px] md:min-h-[450px] lg:min-h-[50px] md:col-span-2">
          {/* Replaced placeholder with the HeroSlider component */}
          <HeroSlider slides={heroSlides} autoplay={true} interval={5000} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="p-8 md:p-16">
        <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <HomeProductCard key={product.productId} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-[#6C6C6C]">No featured products available at the moment.</p>
          )}
        </div>
      </section>

      {/* Top Artisans */}
      <section className="p-8 md:p-16 bg-[#FFF]">
        <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topArtisans.length > 0 ? (
            topArtisans.map((artisan) => (
              <TopArtisanCard key={artisan.id} artisan={artisan} />
            ))
          ) : (
            <p className="col-span-full text-center text-[#6C6C6C]">No top artisans available at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}