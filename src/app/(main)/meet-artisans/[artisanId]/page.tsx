
// src/app/(main)/artisans/[artisanId]/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// // CORRECTED: Using fetchSellerAverageRating as per error
// import { fetchProductsBySeller, fetchSellerAverageRating } from '@/lib/data/products'; 
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import HomeProductCard from '@/components/products/HomeProductCard'; // For displaying products
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// // Icons
// // CORRECTED: Added MapPinIcon to the import list
// import { StarIcon, FolderOpenIcon, PlusIcon, PencilIcon, TrashIcon, UserCircleIcon, MapPinIcon } from '@heroicons/react/24/outline'; 

// export default function PublicArtisanProfilePage() {
//   const { artisanId } = useParams(); // Get the artisanId from the URL
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [profile, setProfile] = useState<any>(null); // Personal User Profile (e.g., name, email, profileImageUrl)
//   const [artisanProfile, setArtisanProfile] = useState<any>(null); // Artisan Specific Profile (shopName, bio, etc.)
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]); // Products by this artisan
//   const [averageArtisanRating, setAverageArtisanRating] = useState<number | null>(null); // Overall rating for artisan's products
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Determine if the current user is the owner of this profile
//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId || typeof artisanId !== 'string') {
//         setError('Invalid Artisan ID.');
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Fetch personal user profile
//         const userProfile = await fetchProfileByUserId(artisanId);
//         setProfile(userProfile);

//         // Fetch artisan specific profile
//         const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//         setArtisanProfile(fetchedArtisanProfile);

//         // Fetch all products by this artisan
//         const fetchedProducts = await fetchProductsBySeller(artisanId);
//         setArtisanProducts(fetchedProducts);

//         // Fetch overall average rating for this artisan's products
//         const avgRating = await fetchSellerAverageRating(artisanId); 
//         setAverageArtisanRating(avgRating.averageRating);

//       } catch (err) {
//         console.error('Failed to load artisan profile and products:', err);
//         setError('Failed to load artisan profile. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); // Re-fetch if artisanId or session changes

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
//           <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
//           <div className="space-y-4">
//             <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         <p>{error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State (if artisanProfile doesn't exist)
//   if (!artisanProfile) {
//     return (
//       <div className="p-6 text-center text-gray-700">
//         <h2 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-4">Artisan Not Found</h2>
//         <p className="mb-6">The artisan profile you are looking for does not exist.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left">
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//           {/* Profile Image */}
//           <div className="flex-shrink-0">
//             {profile?.profileImageUrl ? (
//               <Image
//                 src={profile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 width={120}
//                 height={120}
//                 className="rounded-full object-cover border-4 border-[#B55B3D] shadow-md"
//               />
//             ) : (
//               <UserCircleIcon className="h-24 w-24 text-[#6C6C6C] border-2 border-[#B55B3D] rounded-full p-1" />
//             )}
//           </div>

//           {/* Artisan Details and Public Actions */}
//           <div className="flex-grow">
//             <h1 className="text-3xl font-serif font-bold text-[#3E3E3E] mb-2">
//               {artisanProfile.shopName}
//             </h1>
//             {profile?.name && (
//               <p className="text-lg text-[#6C6C6C] mb-2">By: {profile.name}</p>
//             )}
//             {artisanProfile.location && (
//               <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//                 <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//                 {artisanProfile.location}
//               </p>
//             )}

//             {/* Average Rating Display */}
//             {averageArtisanRating !== null && averageArtisanRating > 0 ? (
//               <div className="flex items-center justify-center md:justify-start mt-2">
//                 <div className="flex mr-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <StarIcon
//                       key={star}
//                       className={`h-5 w-5 ${
//                         star <= Math.round(averageArtisanRating) ? 'text-yellow-400' : 'text-gray-300'
//                       }`}
//                       fill={star <= Math.round(averageArtisanRating) ? 'currentColor' : 'none'}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xl font-bold text-[#3E3E3E]">
//                   {averageArtisanRating.toFixed(1)}
//                 </span>
//                 <span className="text-sm text-[#6C6C6C] ml-2">
//                   ({artisanProfile?.totalSales || 0} reviews) 
//                 </span>
//               </div>
//             ) : (
//               <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//             )}
//           </div>

//           {/* Owner-specific actions (Edit/Delete Profile) */}
//           {isProfileOwner && (
//             <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
//               <Button
//                 onClick={() => router.push(`/artisans/${artisanId}/edit`)} 
//                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2"
//               >
//                 <PencilIcon className="h-4 w-4" /> Edit Profile
//               </Button>
//               {/* CORRECTED: Changed variant="destructive" to variant="outline" but kept red styling */}
//               <Button
//                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')} 
//                 variant="outline" 
//                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2"
//               >
//                 <TrashIcon className="h-4 w-4" /> Delete Profile
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Public Artisan Bio & Policies */}
//         <div className="mt-6 border-t pt-6 border-[#F3ECE5] text-center md:text-left">
//           {artisanProfile.shopDescription && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//             </div>
//           )}
//           {artisanProfile.bio && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//             </div>
//           )}
//           {artisanProfile.website && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//               <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//                 {artisanProfile.website}
//               </a>
//             </div>
//           )}
//           {artisanProfile.policies && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//             </div>
//           )}
//           {artisanProfile.shippingInfo && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//             </div>
//           )}
//           {artisanProfile.returnPolicy && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) */}
//       {isProfileOwner && (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//             Your Product Management
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <Link href="/artisans/products" className="block">
//               <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage All Products
//               </Button>
//             </Link>
//             <Link href="/products/create" className="block">
//               <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                 <PlusIcon className="h-5 w-5" />
//                 Add New Product
//               </Button>
//             </Link>
//             <Link href="/products/categories" className="block">
//               <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage Categories
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Artisan's Products Display Section (Visible to everyone) */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           Products by {artisanProfile.shopName}
//         </h2>
//         {artisanProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {artisanProducts.map((product) => (
//               <HomeProductCard key={product.productId} product={product} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-[#6C6C6C] text-center py-8">No products found from this artisan yet.</p>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }





















// // src/app/(main)/artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySeller, fetchSellerAverageRating } from '@/lib/data/products'; 
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import HomeProductCard from '@/components/products/HomeProductCard'; // For displaying products
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// // Icons
// import { StarIcon, FolderOpenIcon, PlusIcon, PencilIcon, TrashIcon, UserCircleIcon, MapPinIcon } from '@heroicons/react/24/outline'; 

// export default function PublicArtisanProfilePage() {
//   const { artisanId } = useParams(); // Get the artisanId from the URL
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [profile, setProfile] = useState<any>(null); // Personal User Profile (e.g., name, email, profileImageUrl)
//   const [artisanProfile, setArtisanProfile] = useState<any>(null); // Artisan Specific Profile (shopName, bio, etc.)
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]); // Products by this artisan
//   const [averageArtisanRating, setAverageArtisanRating] = useState<number | null>(null); // Overall rating for artisan's products
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Determine if the current user is the owner of this profile
//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId || typeof artisanId !== 'string') {
//         setError('Invalid Artisan ID.');
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Fetch personal user profile
//         const userProfile = await fetchProfileByUserId(artisanId);
//         setProfile(userProfile);

//         // Fetch artisan specific profile
//         const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//         setArtisanProfile(fetchedArtisanProfile);

//         // Fetch all products by this artisan
//         const fetchedProducts = await fetchProductsBySeller(artisanId);
//         setArtisanProducts(fetchedProducts);

//         // Fetch overall average rating for this artisan's products
//         const avgRating = await fetchSellerAverageRating(artisanId); 
//         setAverageArtisanRating(avgRating.averageRating); // No .averageRating as per previous correction, it directly returns number or null

//       } catch (err) {
//         console.error('Failed to load artisan profile and products:', err);
//         setError('Failed to load artisan profile. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); // Re-fetch if artisanId or session changes

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
//           <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
//           <div className="space-y-4">
//             <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         <p>{error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State (if artisanProfile doesn't exist)
//   if (!artisanProfile) {
//     return (
//       <div className="p-6 text-center text-gray-700">
//         <h2 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-4">Artisan Not Found</h2>
//         <p className="mb-6">The artisan profile you are looking for does not exist.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left">
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//           {/* Profile Image */}
//           <div className="flex-shrink-0">
//             {profile?.profileImageUrl ? (
//               <Image
//                 src={profile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 width={120}
//                 height={120}
//                 className="rounded-full object-cover border-4 border-[#B55B3D] shadow-md"
//               />
//             ) : (
//               <UserCircleIcon className="h-24 w-24 text-[#6C6C6C] border-2 border-[#B55B3D] rounded-full p-1" />
//             )}
//           </div>

//           {/* Artisan Details and Public Actions */}
//           <div className="flex-grow">
//             <h1 className="text-3xl font-serif font-bold text-[#3E3E3E] mb-2">
//               {artisanProfile.shopName}
//             </h1>
//             {/* Added Artisan Name (from personal profile) */}
//             {profile?.name && (
//               <p className="text-lg text-[#6C6C6C] mb-2">By: {profile.name}</p>
//             )}
//             {/* Added Artisan Email (from personal profile) */}
//             {profile?.email && (
//               <p className="text-md text-[#6C6C6C] mb-2">{profile.email}</p>
//             )}
//             {/* Added Artisan Phone Number (from personal profile) */}
//             {profile?.phoneNumber && (
//               <p className="text-md text-[#6C6C6C] mb-2">{profile.phoneNumber}</p>
//             )}

//             {artisanProfile.location && (
//               <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//                 <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//                 {artisanProfile.location}
//               </p>
//             )}

//             {/* Average Rating Display */}
//             {averageArtisanRating !== null && averageArtisanRating > 0 ? (
//               <div className="flex items-center justify-center md:justify-start mt-2">
//                 <div className="flex mr-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <StarIcon
//                       key={star}
//                       className={`h-5 w-5 ${
//                         star <= Math.round(averageArtisanRating) ? 'text-yellow-400' : 'text-gray-300'
//                       }`}
//                       fill={star <= Math.round(averageArtisanRating) ? 'currentColor' : 'none'}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xl font-bold text-[#3E3E3E]">
//                   {averageArtisanRating.toFixed(1)}
//                 </span>
//                 <span className="text-sm text-[#6C6C6C] ml-2">
//                   ({artisanProfile?.totalSales || 0} reviews) 
//                 </span>
//               </div>
//             ) : (
//               <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//             )}
//           </div>

//           {/* Owner-specific actions (Edit/Delete Profile) */}
//           {isProfileOwner && (
//             <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
//               <Button
//                 onClick={() => router.push(`/artisans/${artisanId}/edit`)} 
//                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2"
//               >
//                 <PencilIcon className="h-4 w-4" /> Edit Profile
//               </Button>
//               <Button
//                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')} 
//                 variant="outline" 
//                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2"
//               >
//                 <TrashIcon className="h-4 w-4" /> Delete Profile
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Public Artisan Bio & Policies */}
//         <div className="mt-6 border-t pt-6 border-[#F3ECE5] text-center md:text-left">
//           {artisanProfile.shopDescription && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//             </div>
//           )}
//           {artisanProfile.bio && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//             </div>
//           )}
//           {artisanProfile.website && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//               <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//                 {artisanProfile.website}
//               </a>
//             </div>
//           )}
//           {artisanProfile.policies && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//             </div>
//           )}
//           {artisanProfile.shippingInfo && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//             </div>
//           )}
//           {artisanProfile.returnPolicy && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) */}
//       {isProfileOwner && (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//             Your Product Management
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <Link href="/artisans/products" className="block">
//               <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage All Products
//               </Button>
//             </Link>
//             <Link href="/products/create" className="block">
//               <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                 <PlusIcon className="h-5 w-5" />
//                 Add New Product
//               </Button>
//             </Link>
//             <Link href="/products/categories" className="block">
//               <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage Categories
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Artisan's Products Display Section (Visible to everyone) */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           Products by {artisanProfile.shopName}
//         </h2>
//         {artisanProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {artisanProducts.map((product) => (
//               <HomeProductCard key={product.productId} product={product} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-[#6C6C6C] text-center py-8">No products found from this artisan yet.</p>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }























// // src/app/(main)/artisans/[artisanId]/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySeller, fetchSellerAverageRating } from '@/lib/data/products'; 
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import HomeProductCard from '@/components/products/HomeProductCard'; // For displaying products
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// // Icons
// import { StarIcon, FolderOpenIcon, PlusIcon, PencilIcon, TrashIcon, UserCircleIcon, MapPinIcon } from '@heroicons/react/24/outline'; 

// export default function PublicArtisanProfilePage() {
//   const { artisanId } = useParams(); // Get the artisanId from the URL
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [profile, setProfile] = useState<any>(null); // Personal User Profile (e.g., bio, profileImageUrl, address)
//   const [artisanProfile, setArtisanProfile] = useState<any>(null); // Artisan Specific Profile (shopName, bio, etc.)
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]); // Products by this artisan
//   const [averageArtisanRating, setAverageArtisanRating] = useState<number | null>(null); // Overall rating for artisan's products
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Determine if the current user is the owner of this profile
//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId || typeof artisanId !== 'string') {
//         setError('Invalid Artisan ID.');
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Fetch personal user profile
//         // We still fetch the personal profile for other details like profileImageUrl, bio, address, phoneNumber
//         const userProfile = await fetchProfileByUserId(artisanId);
//         setProfile(userProfile);

//         // Fetch artisan specific profile
//         const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//         setArtisanProfile(fetchedArtisanProfile);

//         // Fetch all products by this artisan
//         const fetchedProducts = await fetchProductsBySeller(artisanId);
//         setArtisanProducts(fetchedProducts);

//         // Fetch overall average rating for this artisan's products
//         const avgRating = await fetchSellerAverageRating(artisanId); 
//         setAverageArtisanRating(avgRating.averageRating);

//       } catch (err) {
//         console.error('Failed to load artisan profile and products:', err);
//         setError('Failed to load artisan profile. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); // Re-fetch if artisanId or session changes

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
//           <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
//           <div className="space-y-4">
//             <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         <p>{error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State (if artisanProfile doesn't exist)
//   if (!artisanProfile) {
//     return (
//       <div className="p-6 text-center text-gray-700">
//         <h2 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-4">Artisan Not Found</h2>
//         <p className="mb-6">The artisan profile you are looking for does not exist.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left">
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//           {/* Profile Image */}
//           <div className="flex-shrink-0">
//             {profile?.profileImageUrl ? (
//               <Image
//                 src={profile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 width={120}
//                 height={120}
//                 className="rounded-full object-cover border-4 border-[#B55B3D] shadow-md"
//               />
//             ) : (
//               <UserCircleIcon className="h-24 w-24 text-[#6C6C6C] border-2 border-[#B55B3D] rounded-full p-1" />
//             )}
//           </div>

//           {/* Artisan Details and Public Actions */}
//           <div className="flex-grow">
//             <h1 className="text-3xl font-serif font-bold text-[#3E3E3E] mb-2">
//               {artisanProfile.shopName}
//             </h1>
//             {/* Display Artisan Name from the session user if available, otherwise from the profile */}
//             {session?.user?.name ? (
//               <p className="text-lg text-[#6C6C6C] mb-2">By: {session.user.name}</p>
//             ) : (
//               profile?.name && <p className="text-lg text-[#6C6C6C] mb-2">By: {profile.name}</p>
//             )}
            
//             {/* Display Artisan Email from the session user if available, otherwise from the profile */}
//             {session?.user?.email ? (
//               <p className="text-md text-[#6C6C6C] mb-2">{session.user.email}</p>
//             ) : (
//               profile?.email && <p className="text-md text-[#6C6C6C] mb-2">{profile.email}</p>
//             )}
            
//             {/* Added Artisan Phone Number (from personal profile) */}
//             {profile?.phoneNumber && (
//               <p className="text-md text-[#6C6C6C] mb-2">{profile.phoneNumber}</p>
//             )}

//             {artisanProfile.location && (
//               <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//                 <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//                 {artisanProfile.location}
//               </p>
//             )}

//             {/* Average Rating Display */}
//             {averageArtisanRating !== null && averageArtisanRating > 0 ? (
//               <div className="flex items-center justify-center md:justify-start mt-2">
//                 <div className="flex mr-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <StarIcon
//                       key={star}
//                       className={`h-5 w-5 ${
//                         star <= Math.round(averageArtisanRating) ? 'text-yellow-400' : 'text-gray-300'
//                       }`}
//                       fill={star <= Math.round(averageArtisanRating) ? 'currentColor' : 'none'}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xl font-bold text-[#3E3E3E]">
//                   {averageArtisanRating.toFixed(1)}
//                 </span>
//                 <span className="text-sm text-[#6C6C6C] ml-2">
//                   ({artisanProfile?.totalSales || 0} reviews) 
//                 </span>
//               </div>
//             ) : (
//               <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//             )}
//           </div>

//           {/* Owner-specific actions (Edit/Delete Profile) */}
//           {isProfileOwner && (
//             <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
//               <Button
//                 onClick={() => router.push(`/artisans/${artisanId}/edit`)} 
//                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2"
//               >
//                 <PencilIcon className="h-4 w-4" /> Edit Profile
//               </Button>
//               <Button
//                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')} 
//                 variant="outline" 
//                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2"
//               >
//                 <TrashIcon className="h-4 w-4" /> Delete Profile
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Public Artisan Bio & Policies */}
//         <div className="mt-6 border-t pt-6 border-[#F3ECE5] text-center md:text-left">
//           {artisanProfile.shopDescription && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//             </div>
//           )}
//           {artisanProfile.bio && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//             </div>
//           )}
//           {artisanProfile.website && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//               <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//                 {artisanProfile.website}
//               </a>
//             </div>
//           )}
//           {artisanProfile.policies && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//             </div>
//           )}
//           {artisanProfile.shippingInfo && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//             </div>
//           )}
//           {artisanProfile.returnPolicy && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) */}
//       {isProfileOwner && (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//             Your Product Management
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <Link href="/artisans/products" className="block">
//               <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage All Products
//               </Button>
//             </Link>
//             <Link href="/products/create" className="block">
//               <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                 <PlusIcon className="h-5 w-5" />
//                 Add New Product
//               </Button>
//             </Link>
//             <Link href="/products/categories" className="block">
//               <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage Categories
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Artisan's Products Display Section (Visible to everyone) */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           Products by {artisanProfile.shopName}
//         </h2>
//         {artisanProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {artisanProducts.map((product) => (
//               <HomeProductCard key={product.productId} product={product} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-[#6C6C6C] text-center py-8">No products found from this artisan yet.</p>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }

















// // src/app/(main)/artisans/[artisanId]/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySeller, fetchSellerAverageRating } from '@/lib/data/products'; 
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// // Icons
// import { StarIcon, FolderOpenIcon, PlusIcon, PencilIcon, TrashIcon, UserCircleIcon, MapPinIcon } from '@heroicons/react/24/outline'; 

// export default function PublicArtisanProfilePage() {
//   const { artisanId } = useParams(); // Get the artisanId from the URL
//   const router = useRouter();
//   const { data: session } = useSession(); // Access session for user details

//   const [profile, setProfile] = useState<any>(null); // Personal User Profile (e.g., name, email, profileImageUrl)
//   const [artisanProfile, setArtisanProfile] = useState<any>(null); // Artisan Specific Profile (shopName, bio, etc.)
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]); // Products by this artisan
//   const [averageArtisanRating, setAverageArtisanRating] = useState<number | null>(null); // Overall rating for artisan's products
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Determine if the current user is the owner of this profile
//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId || typeof artisanId !== 'string') {
//         setError('Invalid Artisan ID.');
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Fetch personal user profile using artisanId
//         const userProfile = await fetchProfileByUserId(artisanId);
//         setProfile(userProfile);

//         // Fetch artisan specific profile using artisanId
//         const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//         setArtisanProfile(fetchedArtisanProfile);

//         if (!fetchedArtisanProfile) {
//           setError("Artisan profile not found.");
//         }

//         // Fetch all products by this artisan
//         const fetchedProducts = await fetchProductsBySeller(artisanId);
//         setArtisanProducts(fetchedProducts);

//         // Fetch overall average rating for this artisan's products
//         const avgRating = await fetchSellerAverageRating(artisanId); 
//         setAverageArtisanRating(avgRating.averageRating); 

//       } catch (err) {
//         console.error('Failed to load artisan profile and products:', err);
//         setError('Failed to load artisan profile. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); 

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
//           <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
//           <div className="space-y-4">
//             <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         <p>{error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State (if artisanProfile doesn't exist)
//   if (!artisanProfile) {
//     return (
//       <div className="p-6 text-center text-gray-700">
//         <h2 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-4">Artisan Not Found</h2>
//         <p className="mb-6">The artisan profile you are looking for does not exist.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left">
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//           {/* Profile Image */}
//           <div className="flex-shrink-0">
//             {profile?.profileImageUrl ? (
//               <Image
//                 src={profile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 width={120}
//                 height={120}
//                 className="rounded-full object-cover border-4 border-[#B55B3D] shadow-md"
//               />
//             ) : (
//               <UserCircleIcon className="h-24 w-24 text-[#6C6C6C] border-2 border-[#B55B3D] rounded-full p-1" />
//             )}
//           </div>

//           {/* Artisan Details and Public Actions */}
//           <div className="flex-grow">
//             <h1 className="text-3xl font-serif font-bold text-[#3E3E3E] mb-2">
//               {artisanProfile.shopName}
//             </h1>
//             {/* Displaying Name from session.user */}
//             {session?.user?.name && (
//               <p className="text-lg text-[#6C6C6C] mb-2">By: {session.user.name}</p>
//             )}
//             {/* Displaying Email from session.user */}
//             {session?.user?.email && (
//               <p className="text-md text-[#6C6C6C] mb-2">{session.user.email}</p>
//             )}
//             {/* Added Artisan Phone Number (from personal profile) */}
//             {profile?.phoneNumber && (
//               <p className="text-md text-[#6C6C6C] mb-2">{profile.phoneNumber}</p>
//             )}

//             {artisanProfile.location && (
//               <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//                 <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//                 {artisanProfile.location}
//               </p>
//             )}

//             {/* Average Rating Display */}
//             {averageArtisanRating !== null && averageArtisanRating > 0 ? (
//               <div className="flex items-center justify-center md:justify-start mt-2">
//                 <div className="flex mr-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <StarIcon
//                       key={star}
//                       className={`h-5 w-5 ${
//                         star <= Math.round(averageArtisanRating) ? 'text-yellow-400' : 'text-gray-300'
//                       }`}
//                       fill={star <= Math.round(averageArtisanRating) ? 'currentColor' : 'none'}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xl font-bold text-[#3E3E3E]">
//                   {averageArtisanRating.toFixed(1)}
//                 </span>
//                 <span className="text-sm text-[#6C6C6C] ml-2">
//                   ({artisanProfile?.totalSales || 0} reviews) 
//                 </span>
//               </div>
//             ) : (
//               <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//             )}
//           </div>

//           {/* Owner-specific actions (Edit/Delete Profile) */}
//           {isProfileOwner && (
//             <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
//               <Button
//                 onClick={() => router.push(`/artisans/${artisanId}/edit`)} 
//                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2"
//               >
//                 <PencilIcon className="h-4 w-4" /> Edit Profile
//               </Button>
//               <Button
//                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')} 
//                 variant="outline" 
//                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2"
//               >
//                 <TrashIcon className="h-4 w-4" /> Delete Profile
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Public Artisan Bio & Policies */}
//         <div className="mt-6 border-t pt-6 border-[#F3ECE5] text-center md:text-left">
//           {artisanProfile.shopDescription && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//             </div>
//           )}
//           {artisanProfile.bio && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//             </div>
//           )}
//           {artisanProfile.website && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//               <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//                 {artisanProfile.website}
//               </a>
//             </div>
//           )}
//           {artisanProfile.policies && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//             </div>
//           )}
//           {artisanProfile.shippingInfo && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//             </div>
//           )}
//           {artisanProfile.returnPolicy && (
//             <div className="mb-4">
//               <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//               <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) */}
//       {isProfileOwner && (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//             Your Product Management
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <Link href="/artisans/products" className="block">
//               <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage All Products
//               </Button>
//             </Link>
//             <Link href="/products/create" className="block">
//               <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                 <PlusIcon className="h-5 w-5" />
//                 Add New Product
//               </Button>
//             </Link>
//             <Link href="/products/categories" className="block">
//               <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
//                 <FolderOpenIcon className="h-5 w-5" />
//                 Manage Categories
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}

      

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }


















// // src/app/(main)/artisans/[artisanId]/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Re-importing StarIcon from heroicons and keeping Radix icons for other purposes
// import { StarIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// import { PlusIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'; // Keeping Radix icons for edit/delete/add

// export default function PublicArtisanProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//   const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//   const [userProfile, setUserProfile] = useState<any | null>(null); // This holds the 'profile' data from fetchProfileByUserId
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//   const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId) {
//         setError("Artisan ID is missing.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//           fetchArtisanProfileByUserId(artisanId),
//           fetchProductsBySellerWithShopInfo(artisanId),
//           fetchSellerAverageRating(artisanId),
//         ]);

//         setArtisanProfile(fetchedArtisanProfile);
//         setArtisanProducts(fetchedProducts);
//         setAverageArtisanRating(fetchedRating);

//         if (fetchedArtisanProfile) {
//           const user = await fetchProfileByUserId(artisanId); // Fetch the user associated with this artisanId
//           setUserProfile(user);
//         } else {
//           setError("Artisan profile not found.");
//         }

//       } catch (err: any) {
//         console.error("Failed to load artisan data:", err);
//         setError(err.message || "An unexpected error occurred while loading artisan data.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl text-[#B55B3D]">Loading artisan profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <p className="text-xl text-red-500 mb-4">Error: {error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   if (!artisanProfile) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <p className="text-xl text-gray-700 mb-4">Artisan not found.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center">
//         <div className="flex-shrink-0">
//           <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-4 border-[#B55B3D]">
//             {userProfile?.profileImageUrl ? (
//               <Image
//                 src={userProfile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 fill
//                 sizes="128px"
//                 style={{ objectFit: 'cover' }}
//               />
//             ) : (
//               <UserCircleIcon className="h-full w-full text-[#6C6C6C] p-1" />
//             )}
//           </div>
//         </div>
//         <div className="text-center md:text-left flex-grow">
//           <h1 className="text-4xl font-serif font-bold text-[#3E3E3E]">{artisanProfile.shopName || 'Unknown Artisan Shop'}</h1>
          
//           {/* Display Artisan Name from the session user if available, otherwise from the userProfile */}
//           {session?.user?.name ? (
//             <p className="text-lg text-[#6C6C6C] mb-2">By: {session.user.name}</p>
//           ) : (
//             userProfile?.name && <p className="text-lg text-[#6C6C6C] mb-2">By: {userProfile.name}</p>
//           )}
          
//           {/* Display Artisan Email from the session user if available, otherwise from the userProfile */}
//           {session?.user?.email ? (
//             <p className="text-md text-[#6C6C6C] mb-2">{session.user.email}</p>
//           ) : (
//             userProfile?.email && <p className="text-md text-[#6C6C6C] mb-2">{userProfile.email}</p>
//           )}
          
//           {/* Added Artisan Phone Number (from personal userProfile) */}
//           {userProfile?.phoneNumber && (
//             <p className="text-md text-[#6C6C6C] mb-2">{userProfile.phoneNumber}</p>
//           )}

//           {artisanProfile.location && (
//             <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//               <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//               {artisanProfile.location}
//             </p>
//           )}

//           {/* Average Rating Display */}
//           {averageArtisanRating.averageRating > 0 ? (
//             <div className="flex items-center justify-center md:justify-start mt-2">
//               <div className="flex mr-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <StarIcon
//                     key={star}
//                     className={`h-5 w-5 ${
//                       star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                     }`}
//                     fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                   />
//                 ))}
//               </div>
//               <span className="text-xl font-bold text-[#3E3E3E]">
//                 {averageArtisanRating.averageRating.toFixed(1)}
//               </span>
//               <span className="text-sm text-[#6C6C6C] ml-2">
//                 ({artisanProfile?.totalSales || 0} reviews) 
//               </span>
//             </div>
//           ) : (
//             <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//           )}
//         </div>

//         {/* Owner-specific actions (Edit/Delete Profile) */}
//         {isProfileOwner && (
//           <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
//             {/* <Button
//               onClick={() => router.push(`/dashboard/artisan-profile/edit`)}
//               className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2 text-white"
//             >
//               <Pencil2Icon className="h-4 w-4" /> Edit Profile
//             </Button>
//             <Button
//               onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')}
//               variant="outline"
//               className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2"
//             >
//               <TrashIcon className="h-4 w-4" /> Delete Profile
//             </Button> */}
//           </div>
//         )}
//       </div>

//       {/* Public Artisan Bio & Policies */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left mb-8">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           About {artisanProfile.shopName}
//         </h2>
//         {artisanProfile.shopDescription && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//           </div>
//         )}
//         {artisanProfile.bio && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//           </div>
//         )}
//         {artisanProfile.website && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//             <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//               {artisanProfile.website}
//             </a>
//           </div>
//         )}
//         {artisanProfile.policies && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//           </div>
//         )}
//         {artisanProfile.shippingInfo && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//           </div>
//         )}
//         {artisanProfile.returnPolicy && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//           </div>
//         )}
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) */}
//       {isProfileOwner && (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//             Your Product Management
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* <Link href="/dashboard/products" className="block">
//               <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                 <Pencil2Icon className="h-5 w-5" /> Manage All Products
//               </Button>
//             </Link>
//             <Link href="/dashboard/products/create" className="block">
//               <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                 <PlusIcon className="h-5 w-5" /> Add New Product
//               </Button>
//             </Link> */}
//             {/* Link to manage categories (if applicable) */}
//           </div>
//         </div>
//       )}

//       {/* Artisan's Products Display Section (Visible to everyone) */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           Products by {artisanProfile.shopName}
//         </h2>
//         {artisanProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {artisanProducts.map((product) => (
//               <ArtisanProductCard key={product.productId} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-lg text-gray-600 mb-4">No products found from this artisan yet.</p>
//             {isProfileOwner && (
//               <Link
//                 href="/dashboard/products/create"
//                 className="inline-block bg-[#B55B3D] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#9E4F37] transition-colors"
//               >
//                 Add Your First Product
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }













// // src/app/(main)/artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Re-importing StarIcon from heroicons and keeping Radix icons for other purposes
// import { StarIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// import { PlusIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'; // Keeping Radix icons for edit/delete/add

// export default function PublicArtisanProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//   const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//   const [userProfile, setUserProfile] = useState<any | null>(null); // This holds the 'profile' data from fetchProfileByUserId
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//   const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId) {
//         setError("Artisan ID is missing.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       // --- Caching Logic Start ---
//       const cacheKey = `artisanProfileData_${artisanId}`;
//       let cachedData = null;
//       if (typeof window !== 'undefined') { // Ensure sessionStorage is available (client-side only)
//         cachedData = sessionStorage.getItem(cacheKey);
//       }

//       if (cachedData) {
//         try {
//           const parsedData = JSON.parse(cachedData);
//           setArtisanProfile(parsedData.artisanProfile);
//           setUserProfile(parsedData.userProfile);
//           setArtisanProducts(parsedData.artisanProducts);
//           setAverageArtisanRating(parsedData.averageArtisanRating);
//           setIsLoading(false);
//           console.log("Loaded artisan data from cache.");
//           return; // Exit early if data loaded from cache
//         } catch (e) {
//           console.error("Failed to parse cached data, fetching new data.", e);
//           if (typeof window !== 'undefined') {
//             sessionStorage.removeItem(cacheKey); // Clear corrupted cache
//           }
//         }
//       }
//       // --- Caching Logic End ---

//       try {
//         const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//           fetchArtisanProfileByUserId(artisanId),
//           fetchProductsBySellerWithShopInfo(artisanId),
//           fetchSellerAverageRating(artisanId),
//         ]);

//         // Fetch user profile only if artisanProfile is found
//         const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//         setArtisanProfile(fetchedArtisanProfile);
//         setArtisanProducts(fetchedProducts);
//         setAverageArtisanRating(fetchedRating);
//         setUserProfile(user);

//         // Store data in sessionStorage after successful fetch
//         if (typeof window !== 'undefined') {
//           sessionStorage.setItem(cacheKey, JSON.stringify({
//             artisanProfile: fetchedArtisanProfile,
//             userProfile: user,
//             artisanProducts: fetchedProducts,
//             averageArtisanRating: fetchedRating,
//           }));
//         }

//         if (!fetchedArtisanProfile) {
//           setError("Artisan profile not found.");
//         }

//       } catch (err: any) {
//         console.error("Failed to load artisan data:", err);
//         setError(err.message || "An unexpected error occurred while loading artisan data.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); // Dependencies are important for re-fetching when artisanId or session changes

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl text-[#B55B3D]">Loading artisan profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <p className="text-xl text-red-500 mb-4">Error: {error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   if (!artisanProfile) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <p className="text-xl text-gray-700 mb-4">Artisan not found.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center">
//         <div className="flex-shrink-0">
//           <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-4 border-[#B55B3D]">
//             {userProfile?.profileImageUrl ? (
//               <Image
//                 src={userProfile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 fill
//                 sizes="128px"
//                 style={{ objectFit: 'cover' }}
//               />
//             ) : (
//               <UserCircleIcon className="h-full w-full text-[#6C6C6C] p-1" />
//             )}
//           </div>
//         </div>
//         <div className="text-center md:text-left flex-grow">
//           <h1 className="text-4xl font-serif font-bold text-[#3E3E3E]">{artisanProfile.shopName || 'Unknown Artisan Shop'}</h1>
          
//           {/* Display Artisan Name from the session user if available, otherwise from the userProfile */}
//           {session?.user?.name ? (
//             <p className="text-lg text-[#6C6C6C] mb-2">By: {session.user.name}</p>
//           ) : (
//             userProfile?.name && <p className="text-lg text-[#6C6C6C] mb-2">By: {userProfile.name}</p>
//           )}
          
//           {/* Display Artisan Email from the session user if available, otherwise from the userProfile */}
//           {session?.user?.email ? (
//             <p className="text-md text-[#6C6C6C] mb-2">{session.user.email}</p>
//           ) : (
//             userProfile?.email && <p className="text-md text-[#6C6C6C] mb-2">{userProfile.email}</p>
//           )}
          
//           {/* Added Artisan Phone Number (from personal userProfile) */}
//           {userProfile?.phoneNumber && (
//             <p className="text-md text-[#6C6C6C] mb-2">{userProfile.phoneNumber}</p>
//           )}

//           {artisanProfile.location && (
//             <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//               <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//               {artisanProfile.location}
//             </p>
//           )}

//           {/* Average Rating Display */}
//           {averageArtisanRating.averageRating > 0 ? (
//             <div className="flex items-center justify-center md:justify-start mt-2">
//               <div className="flex mr-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <StarIcon
//                     key={star}
//                     className={`h-5 w-5 ${
//                       star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                     }`}
//                     fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                   />
//                 ))}
//               </div>
//               <span className="text-xl font-bold text-[#3E3E3E]">
//                 {averageArtisanRating.averageRating.toFixed(1)}
//               </span>
//               <span className="text-sm text-[#6C6C6C] ml-2">
//                 ({artisanProfile?.totalSales || 0} reviews) 
//               </span>
//             </div>
//           ) : (
//             <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//           )}
//         </div>

//         {/* Owner-specific actions (Edit/Delete Profile) */}
//         {isProfileOwner && (
//           <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
//             <Button
//               onClick={() => router.push(`/dashboard/artisan-profile/edit`)}
//               className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2 text-white"
//             >
//               <Pencil2Icon className="h-4 w-4" /> Edit Profile
//             </Button>
//             <Button
//               onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')}
//               variant="outline"
//               className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2"
//             >
//               <TrashIcon className="h-4 w-4" /> Delete Profile
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Public Artisan Bio & Policies */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left mb-8">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           About {artisanProfile.shopName}
//         </h2>
//         {artisanProfile.shopDescription && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//           </div>
//         )}
//         {artisanProfile.bio && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//           </div>
//         )}
//         {artisanProfile.website && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//             <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//               {artisanProfile.website}
//             </a>
//           </div>
//         )}
//         {artisanProfile.policies && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//           </div>
//         )}
//         {artisanProfile.shippingInfo && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//           </div>
//         )}
//         {artisanProfile.returnPolicy && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//           </div>
//         )}
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) */}
//       {isProfileOwner && (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//             Your Product Management
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <Link href="/dashboard/products" className="block">
//               <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                 <Pencil2Icon className="h-5 w-5" /> Manage All Products
//               </Button>
//             </Link>
//             <Link href="/dashboard/products/create" className="block">
//               <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                 <PlusIcon className="h-5 w-5" /> Add New Product
//               </Button>
//             </Link>
//             {/* Link to manage categories (if applicable) */}
//           </div>
//         </div>
//       )}

//       {/* Artisan's Products Display Section (Visible to everyone) */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           Products by {artisanProfile.shopName}
//         </h2>
//         {artisanProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {artisanProducts.map((product) => (
//               <ArtisanProductCard key={product.productId} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-lg text-gray-600 mb-4">No products found from this artisan yet.</p>
//             {isProfileOwner && (
//               <Link
//                 href="/dashboard/products/create"
//                 className="inline-block bg-[#B55B3D] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#9E4F37] transition-colors"
//               >
//                 Add Your First Product
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }














// =-------------------------------=---------------------------------------=----------------------------
// ][[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]






// // src/app/(main)/artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Re-importing StarIcon from heroicons and keeping Radix icons for other purposes
// import { StarIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// // Removed unused imports: PlusIcon, Pencil2Icon, TrashIcon from '@radix-ui/react-icons';

// export default function PublicArtisanProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//   const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//   const [userProfile, setUserProfile] = useState<any | null>(null); // This holds the 'profile' data from fetchProfileByUserId
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//   const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // isProfileOwner is now only used for the "Add Your First Product" button
//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId) {
//         setError("Artisan ID is missing.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       // --- Caching Logic Start ---
//       const cacheKey = `artisanProfileData_${artisanId}`;
//       let cachedData = null;
//       if (typeof window !== 'undefined') { // Ensure sessionStorage is available (client-side only)
//         cachedData = sessionStorage.getItem(cacheKey);
//       }

//       if (cachedData) {
//         try {
//           const parsedData = JSON.parse(cachedData);
//           setArtisanProfile(parsedData.artisanProfile);
//           setUserProfile(parsedData.userProfile);
//           setArtisanProducts(parsedData.artisanProducts);
//           setAverageArtisanRating(parsedData.averageArtisanRating);
//           setIsLoading(false);
//           console.log("Loaded artisan data from cache.");
//           return; // Exit early if data loaded from cache
//         } catch (e) {
//           console.error("Failed to parse cached data, fetching new data.", e);
//           if (typeof window !== 'undefined') {
//             sessionStorage.removeItem(cacheKey); // Clear corrupted cache
//           }
//         }
//       }
//       // --- Caching Logic End ---

//       try {
//         const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//           fetchArtisanProfileByUserId(artisanId),
//           fetchProductsBySellerWithShopInfo(artisanId),
//           fetchSellerAverageRating(artisanId),
//         ]);

//         // Fetch user profile only if artisanProfile is found
//         const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//         setArtisanProfile(fetchedArtisanProfile);
//         setArtisanProducts(fetchedProducts);
//         setAverageArtisanRating(fetchedRating);
//         setUserProfile(user);

//         // Store data in sessionStorage after successful fetch
//         if (typeof window !== 'undefined') {
//           sessionStorage.setItem(cacheKey, JSON.stringify({
//             artisanProfile: fetchedArtisanProfile,
//             userProfile: user,
//             artisanProducts: fetchedProducts,
//             averageArtisanRating: fetchedRating,
//           }));
//         }

//         if (!fetchedArtisanProfile) {
//           setError("Artisan profile not found.");
//         }

//       } catch (err: any) {
//         console.error("Failed to load artisan data:", err);
//         setError(err.message || "An unexpected error occurred while loading artisan data.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); // Dependencies are important for re-fetching when artisanId or session changes

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl text-[#B55B3D]">Loading artisan profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <p className="text-xl text-red-500 mb-4">Error: {error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   if (!artisanProfile) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <p className="text-xl text-gray-700 mb-4">Artisan not found.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Artisan Profile Header Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center">
//         <div className="flex-shrink-0">
//           <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-4 border-[#B55B3D]">
//             {userProfile?.profileImageUrl ? (
//               <Image
//                 src={userProfile.profileImageUrl}
//                 alt={`${artisanProfile.shopName} profile`}
//                 fill
//                 sizes="128px"
//                 style={{ objectFit: 'cover' }}
//               />
//             ) : (
//               <UserCircleIcon className="h-full w-full text-[#6C6C6C] p-1" />
//             )}
//           </div>
//         </div>
//         <div className="text-center md:text-left flex-grow">
//           <h1 className="text-4xl font-serif font-bold text-[#3E3E3E]">{artisanProfile.shopName || 'Unknown Artisan Shop'}</h1>
          
//           {/* Display Artisan Name from the session user if available, otherwise from the userProfile */}
//           {session?.user?.name ? (
//             <p className="text-lg text-[#6C6C6C] mb-2">By: {session.user.name}</p>
//           ) : (
//             userProfile?.name && <p className="text-lg text-[#6C6C6C] mb-2">By: {userProfile.name}</p>
//           )}
          
//           {/* Display Artisan Email from the session user if available, otherwise from the userProfile */}
//           {session?.user?.email ? (
//             <p className="text-md text-[#6C6C6C] mb-2">{session.user.email}</p>
//           ) : (
//             userProfile?.email && <p className="text-md text-[#6C6C6C] mb-2">{userProfile.email}</p>
//           )}
          
//           {/* Added Artisan Phone Number (from personal userProfile) */}
//           {userProfile?.phoneNumber && (
//             <p className="text-md text-[#6C6C6C] mb-2">{userProfile.phoneNumber}</p>
//           )}

//           {artisanProfile.location && (
//             <p className="text-md text-[#6C6C6C] flex items-center justify-center md:justify-start mb-2">
//               <MapPinIcon className="h-5 w-5 mr-1 text-[#6C6C6C]" />
//               {artisanProfile.location}
//             </p>
//           )}

//           {/* Average Rating Display */}
//           {averageArtisanRating.averageRating > 0 ? (
//             <div className="flex items-center justify-center md:justify-start mt-2">
//               <div className="flex mr-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <StarIcon
//                     key={star}
//                     className={`h-5 w-5 ${
//                       star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                     }`}
//                     fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                   />
//                 ))}
//               </div>
//               <span className="text-xl font-bold text-[#3E3E3E]">
//                 {averageArtisanRating.averageRating.toFixed(1)}
//               </span>
//               <span className="text-sm text-[#6C6C6C] ml-2">
//                 ({artisanProfile?.totalSales || 0} reviews) 
//               </span>
//             </div>
//           ) : (
//             <p className="text-[#6C6C6C] mt-2">No product reviews yet.</p>
//           )}
//         </div>

//         {/* Owner-specific actions (Edit/Delete Profile) - REMOVED */}
//       </div>

//       {/* Public Artisan Bio & Policies */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center md:text-left mb-8">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           About {artisanProfile.shopName}
//         </h2>
//         {artisanProfile.shopDescription && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About Our Shop</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.shopDescription}</p>
//           </div>
//         )}
//         {artisanProfile.bio && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">About The Artisan</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.bio}</p>
//           </div>
//         )}
//         {artisanProfile.website && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Website</h3>
//             <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline">
//               {artisanProfile.website}
//             </a>
//           </div>
//         )}
//         {artisanProfile.policies && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shop Policies</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.policies}</p>
//           </div>
//         )}
//         {artisanProfile.shippingInfo && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Shipping Information</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.shippingInfo}</p>
//           </div>
//         )}
//         {artisanProfile.returnPolicy && (
//           <div className="mb-4">
//             <h3 className="text-md font-semibold text-[#3E3E3E] mb-2">Return Policy</h3>
//             <p className="text-[#6C6C6C]">{artisanProfile.returnPolicy}</p>
//           </div>
//         )}
//       </div>

//       {/* Product Management Section (Visible ONLY to profile owner) - REMOVED */}

//       {/* Artisan's Products Display Section (Visible to everyone) */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//           Products by {artisanProfile.shopName}
//         </h2>
//         {artisanProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {artisanProducts.map((product) => (
//               <ArtisanProductCard key={product.productId} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-lg text-gray-600 mb-4">No products found from this artisan yet.</p>
//             {isProfileOwner && (
//               <Link
//                 href="/dashboard/products/create"
//                 className="inline-block bg-[#B55B3D] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#9E4F37] transition-colors"
//               >
//                 Add Your First Product
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-sm">
//           ← Back to All Artisans
//         </Link>
//       </div>
//     </div>
//   );
// }























// // src/app/(main)/artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Re-importing StarIcon from heroicons and keeping Radix icons for other purposes
// import { StarIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// // Removed unused imports: PlusIcon, Pencil2Icon, TrashIcon from '@radix-ui/react-icons';

// export default function PublicArtisanProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//   const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//   const [userProfile, setUserProfile] = useState<any | null>(null); // This holds the 'profile' data from fetchProfileByUserId
//   const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//   const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // isProfileOwner is now only used for the "Add Your First Product" button
//   const isProfileOwner = session?.user?.id === artisanId;

//   useEffect(() => {
//     async function loadArtisanData() {
//       if (!artisanId) {
//         setError("Artisan ID is missing.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       // --- Caching Logic Start ---
//       const cacheKey = `artisanProfileData_${artisanId}`;
//       let cachedData = null;
//       if (typeof window !== 'undefined') { // Ensure sessionStorage is available (client-side only)
//         cachedData = sessionStorage.getItem(cacheKey);
//       }

//       if (cachedData) {
//         try {
//           const parsedData = JSON.parse(cachedData);
//           setArtisanProfile(parsedData.artisanProfile);
//           setUserProfile(parsedData.userProfile);
//           setArtisanProducts(parsedData.artisanProducts);
//           setAverageArtisanRating(parsedData.averageArtisanRating);
//           setIsLoading(false);
//           console.log("Loaded artisan data from cache.");
//           return; // Exit early if data loaded from cache
//         } catch (e) {
//           console.error("Failed to parse cached data, fetching new data.", e);
//           if (typeof window !== 'undefined') {
//             sessionStorage.removeItem(cacheKey); // Clear corrupted cache
//           }
//         }
//       }
//       // --- Caching Logic End ---

//       try {
//         const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//           fetchArtisanProfileByUserId(artisanId),
//           fetchProductsBySellerWithShopInfo(artisanId),
//           fetchSellerAverageRating(artisanId),
//         ]);

//         // Fetch user profile only if artisanProfile is found
//         const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//         setArtisanProfile(fetchedArtisanProfile);
//         setArtisanProducts(fetchedProducts);
//         setAverageArtisanRating(fetchedRating);
//         setUserProfile(user);

//         // Store data in sessionStorage after successful fetch
//         if (typeof window !== 'undefined') {
//           sessionStorage.setItem(cacheKey, JSON.stringify({
//             artisanProfile: fetchedArtisanProfile,
//             userProfile: user,
//             artisanProducts: fetchedProducts,
//             averageArtisanRating: fetchedRating,
//           }));
//         }

//         if (!fetchedArtisanProfile) {
//           setError("Artisan profile not found.");
//         }

//       } catch (err: any) {
//         console.error("Failed to load artisan data:", err);
//         setError(err.message || "An unexpected error occurred while loading artisan data.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadArtisanData();
//   }, [artisanId, session]); // Dependencies are important for re-fetching when artisanId or session changes

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#FDF9F6]">
//         <p className="text-xl text-[#B55B3D] font-medium">Loading artisan profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//         <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//         <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   if (!artisanProfile) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//         <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//         <Button onClick={() => router.push('/artisans/list')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//           Browse All Artisans
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Artisan Profile Header Section */}
//         <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20"> {/* Changed md:gap-x-12 to md:gap-x-20 */}
//           {/* Decorative background circle */}
//           <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//           <div className="flex-shrink-0 relative z-10">
//             {/* Removed md:mr-16 as gap-x on parent is now controlling spacing */}
//             <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100"> 
//               {userProfile?.profileImageUrl ? (
//                 <Image
//                   src={userProfile.profileImageUrl}
//                   alt={`${artisanProfile.shopName} profile`}
//                   fill
//                   sizes="160px"
//                   style={{ objectFit: 'cover' }}
//                   className="transition-transform duration-300 hover:scale-105"
//                 />
//               ) : (
//                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//               )}
//             </div>
//           </div>
          
//           <div className="text-center md:text-left flex-grow relative z-10">
//             <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//               {artisanProfile.shopName || 'Untitled Shop'}
//             </h1>
            
            // {/* Display Artisan Name */}
            // {session?.user?.name ? (
            //   <p className="text-xl text-[#6C6C6C] font-semibold mb-1">By: {session.user.name}</p>
            // ) : (
            //   userProfile?.name && <p className="text-xl text-[#6C6C6C] font-semibold mb-1">By: {userProfile.name}</p>
            // )}
            
            // {/* Display Artisan Email */}
            // {session?.user?.email ? (
            //   <p className="text-lg text-[#6C6C6C] mb-1">{session.user.email}</p>
            // ) : (
            //   userProfile?.email && <p className="text-lg text-[#6C6C6C] mb-1">{userProfile.email}</p>
            // )}
            
//             {/* Added Artisan Phone Number (from personal userProfile) */}
//             {userProfile?.phoneNumber && (
//               <p className="text-lg text-[#6C6C6C] mb-4">{userProfile.phoneNumber}</p>
//             )}

//             {artisanProfile.location && (
//               <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                 {artisanProfile.location}
//               </p>
//             )}

//             {/* Average Rating Display */}
//             {averageArtisanRating.averageRating > 0 ? (
//               <div className="flex items-center justify-center md:justify-start mt-4">
//                 <div className="flex mr-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <StarIcon
//                       key={star}
//                       className={`h-6 w-6 ${
//                         star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                       } transition-colors duration-200`}
//                       fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                   {averageArtisanRating.averageRating.toFixed(1)}
//                 </span>
//                 {/* <span className="text-md text-[#6C6C6C] ml-2">
//                   ({artisanProfile?.totalSales || 0}) 
//                 </span> */}
//               </div>
//             ) : (
//               <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//             )}
//           </div>

//           {/* Owner-specific actions (Edit/Delete Profile) - Kept commented out */}
//           {/*
//           {isProfileOwner && (
//             <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-4 relative z-10">
//               <Button
//                 onClick={() => router.push(`/dashboard/artisan-profile/edit`)}
//                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//               >
//                 <Pencil2Icon className="h-5 w-5" /> Edit Profile
//               </Button>
//               <Button
//                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')}
//                 variant="outline"
//                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//               >
//                 <TrashIcon className="h-5 w-5" /> Delete Profile
//               </Button>
//             </div>
//           )}
//           */}
//         </section>

//         {/* Public Artisan Bio & Policies */}
//         <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//           <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//             About {artisanProfile.shopName}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//             {artisanProfile.shopDescription && (
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Our Story / Shop Description</h3>
//                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//               </div>
//             )}
//             {artisanProfile.bio && (
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">About The Artisan</h3>
//                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//               </div>
//             )}
//             {artisanProfile.website && (
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Website</h3>
//                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                   {artisanProfile.website}
//                 </a>
//               </div>
//             )}
//             {artisanProfile.policies && (
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shop Policies</h3>
//                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//               </div>
//             )}
//             {artisanProfile.shippingInfo && (
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shipping Information</h3>
//                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//               </div>
//             )}
//             {artisanProfile.returnPolicy && (
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Return Policy</h3>
//                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Product Management Section (Visible ONLY to profile owner) - Kept commented out */}
//         {/*
//         {isProfileOwner && (
//           <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//             <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//               Your Product Management
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <Link href="/dashboard/products" className="block">
//                 <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                   <Pencil2Icon className="h-5 w-5" /> Manage All Products
//                 </Button>
//               </Link>
//               <Link href="/dashboard/products/create" className="block">
//                 <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                   <PlusIcon className="h-5 w-5" /> Add New Product
//                 </Button>
//               </Link>
//               {/* Link to manage categories (if applicable) }
//             </div>
//           </div>
//         )}
//         */}

//         {/* Artisan's Products Display Section (Visible to everyone) */}
//         <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//           <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//             Products by {artisanProfile.shopName}
//           </h2>
//           {artisanProducts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {artisanProducts.map((product) => (
//                 <ArtisanProductCard key={product.productId} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//               {isProfileOwner && (
//                 <Link
//                   href="/dashboard/products/create"
//                   className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                 >
//                   Add Your First Product
//                 </Link>
//               )}
//             </div>
//           )}
//         </section>

//         <div className="mt-10 text-center">
//           <Link href="/artisans/list" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//             ← Back to All Artisans
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }





























// // src/app/(main)/meet-artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Import all necessary icons from heroicons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,      // Added for Artisan Name
//     EnvelopeIcon,  // Added for Artisan Email
//     PhoneIcon      // Added for Artisan Phone Number
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null); // This holds the 'profile' data from fetchProfileByUserId
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // isProfileOwner is now only used for the "Add Your First Product" button
//     const isProfileOwner = session?.user?.id === artisanId;

//     useEffect(() => {
//         async function loadArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoading(false);
//                 return;
//             }

//             setIsLoading(true);
//             setError(null);

//             // --- Caching Logic Start ---
//             const cacheKey = `artisanProfileData_${artisanId}`;
//             let cachedData = null;
//             if (typeof window !== 'undefined') { // Ensure sessionStorage is available (client-side only)
//                 cachedData = sessionStorage.getItem(cacheKey);
//             }

//             if (cachedData) {
//                 try {
//                     const parsedData = JSON.parse(cachedData);
//                     setArtisanProfile(parsedData.artisanProfile);
//                     setUserProfile(parsedData.userProfile);
//                     setArtisanProducts(parsedData.artisanProducts);
//                     setAverageArtisanRating(parsedData.averageArtisanRating);
//                     setIsLoading(false);
//                     console.log("Loaded artisan data from cache.");
//                     return; // Exit early if data loaded from cache
//                 } catch (e) {
//                     console.error("Failed to parse cached data, fetching new data.", e);
//                     if (typeof window !== 'undefined') {
//                         sessionStorage.removeItem(cacheKey); // Clear corrupted cache
//                     }
//                 }
//             }
//             // --- Caching Logic End ---

//             try {
//                 const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchArtisanProfileByUserId(artisanId),
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 // Fetch user profile only if artisanProfile is found
//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);
//                 setUserProfile(user);

//                 // Store data in sessionStorage after successful fetch
//                 if (typeof window !== 'undefined') {
//                     sessionStorage.setItem(cacheKey, JSON.stringify({
//                         artisanProfile: fetchedArtisanProfile,
//                         userProfile: user,
//                         artisanProducts: fetchedProducts,
//                         averageArtisanRating: fetchedRating,
//                     }));
//                 }

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//         loadArtisanData();
//     }, [artisanId, session]); // Dependencies are important for re-fetching when artisanId or session changes

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20"> {/* Changed md:gap-x-12 to md:gap-x-20 */}
//                     {/* Decorative background circle */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         {/* Removed md:mr-16 as gap-x on parent is now controlling spacing */}
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Display Artisan Name */}
//                         {(session?.user?.name || userProfile?.name) && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {session?.user?.name || userProfile?.name}
//                             </p>
//                         )}

//                         {/* Display Artisan Email */}
//                         {(session?.user?.email || userProfile?.email) && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {session?.user?.email || userProfile?.email}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 {/* <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({artisanProfile?.totalSales || 0})
//                                 </span> */}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>

//                     {/* Owner-specific actions (Edit/Delete Profile) - Kept commented out */}
//                     {/*
//                     {isProfileOwner && (
//                         <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-4 relative z-10">
//                             <Button
//                                 onClick={() => router.push(`/dashboard/artisan-profile/edit`)}
//                                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <Pencil2Icon className="h-5 w-5" /> Edit Profile
//                             </Button>
//                             <Button
//                                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')}
//                                 variant="outline"
//                                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <TrashIcon className="h-5 w-5" /> Delete Profile
//                             </Button>
//                         </div>
//                     )}
//                     */}
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Our Story / Shop Description</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">About The Artisan</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Website</h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shop Policies</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shipping Information</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Return Policy</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Product Management Section (Visible ONLY to profile owner) - Kept commented out */}
//                 {/*
//                 {isProfileOwner && (
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//                         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//                             Your Product Management
//                         </h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             <Link href="/dashboard/products" className="block">
//                                 <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                                     <Pencil2Icon className="h-5 w-5" /> Manage All Products
//                                 </Button>
//                             </Link>
//                             <Link href="/dashboard/products/create" className="block">
//                                 <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                                     <PlusIcon className="h-5 w-5" /> Add New Product
//                                 </Button>
//                             </Link>
//                             {/* Link to manage categories (if applicable) }
//                         </div>
//                     </div>
//                 )}
//                 */}

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }


































// // src/app/(main)/meet-artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,
//     EnvelopeIcon,
//     PhoneIcon
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null);
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     useEffect(() => {
//         async function loadArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoading(false);
//                 return;
//             }

//             setIsLoading(true);
//             setError(null);

//             // --- REMOVE Caching Logic for dynamic data like ratings and products ---
//             // If you need caching for overall profile, implement it with proper invalidation
//             // but for dynamic rating and product listings, fetching fresh is better for accuracy.

//             try {
//                 const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchArtisanProfileByUserId(artisanId),
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 // Fetch user profile only if artisanProfile is found
//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user); // Set the user profile for general info
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating); // This will now always be the latest

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//         loadArtisanData();
//     }, [artisanId, session]); // Dependencies are important for re-fetching when artisanId or session changes

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
//                     {/* Decorative background circle */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Display Artisan Name */}
//                         {(session?.user?.name || userProfile?.name) && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {session?.user?.name || userProfile?.name}
//                             </p>
//                         )}

//                         {/* Display Artisan Email */}
//                         {(session?.user?.email || userProfile?.email) && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {session?.user?.email || userProfile?.email}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Our Story / Shop Description</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">About The Artisan</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Website</h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shop Policies</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shipping Information</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Return Policy</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Product Management Section (Visible ONLY to profile owner) - Kept commented out for public page */}
//                 {/*
//                 {isProfileOwner && (
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//                         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//                             Your Product Management
//                         </h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             <Link href="/dashboard/products" className="block">
//                                 <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                                     <Pencil2Icon className="h-5 w-5" /> Manage All Products
//                                 </Button>
//                             </Link>
//                             <Link href="/dashboard/products/create" className="block">
//                                 <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                                     <PlusIcon className="h-5 w-5" /> Add New Product
//                                 </Button>
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//                 */}

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

























// 'use client';

// import { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,
//     EnvelopeIcon,
//     PhoneIcon
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null);
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // Renamed for clarity
//     const [isUpdatingRatings, setIsUpdatingRatings] = useState(false); // New state for silent updates
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     // --- New: Function to fetch only dynamic data (ratings, products) ---
//     const fetchDynamicData = useCallback(async () => {
//         if (!artisanId) return; // Ensure artisanId exists

//         setIsUpdatingRatings(true); // Indicate that dynamic data is being updated
//         try {
//             const [fetchedProducts, fetchedRating] = await Promise.all([
//                 fetchProductsBySellerWithShopInfo(artisanId),
//                 fetchSellerAverageRating(artisanId),
//             ]);
//             setArtisanProducts(fetchedProducts);
//             setAverageArtisanRating(fetchedRating);
//         } catch (err: any) {
//             console.error("Failed to update dynamic artisan data:", err);
//             // Optionally set a more granular error state for dynamic data updates
//         } finally {
//             setIsUpdatingRatings(false); // Reset update state
//         }
//     }, [artisanId]);

//     // --- Effect for initial data load (profile, user profile, products, ratings) ---
//     useEffect(() => {
//         async function loadInitialArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoadingInitialData(false);
//                 return;
//             }

//             setIsLoadingInitialData(true);
//             setError(null);

//             try {
//                 const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchArtisanProfileByUserId(artisanId),
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user);
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load initial artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoadingInitialData(false);
//             }
//         }
//         loadInitialArtisanData();

//         // --- Set up an interval to refresh dynamic data (e.g., every 30 seconds) ---
//         // You can adjust the interval based on how frequently you expect ratings/reviews to change
//         const intervalId = setInterval(fetchDynamicData, 30000); // Refresh every 30 seconds

//         // --- Cleanup function for the interval ---
//         return () => clearInterval(intervalId);

//     }, [artisanId, fetchDynamicData]); // Add fetchDynamicData to dependencies

//     // --- OPTIONAL: Re-fetch dynamic data when session changes (e.g., user logs in/out) ---
//     useEffect(() => {
//         if (session) {
//             fetchDynamicData();
//         }
//     }, [session, fetchDynamicData]);


//     if (isLoadingInitialData) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
//                     {/* Decorative background circle */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Display Artisan Name */}
//                         {(session?.user?.name || userProfile?.name) && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {session?.user?.name || userProfile?.name}
//                             </p>
//                         )}

//                         {/* Display Artisan Email */}
//                         {(session?.user?.email || userProfile?.email) && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {session?.user?.email || userProfile?.email}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                                 {isUpdatingRatings && (
//                                     <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
//                                         (Updating...)
//                                     </span>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Our Story / Shop Description</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">About The Artisan</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Website</h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shop Policies</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Shipping Information</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">Return Policy</h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }




































// // src/app/(main)/meet-artisans/[artisanId]/page.tsx

// 'use client';

// import { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Import all necessary icons from heroicons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,       // Added for Artisan Name
//     EnvelopeIcon,   // Added for Artisan Email
//     PhoneIcon,      // Added for Artisan Phone Number
//     // NEW ICONS FOR BIO & POLICIES SECTION
//     BuildingStorefrontIcon, // For Shop Description / Our Story
//     IdentificationIcon,     // For About The Artisan
//     GlobeAltIcon,           // For Website
//     ScaleIcon,              // For Shop Policies
//     TruckIcon,              // For Shipping Information
//     ArrowUturnLeftIcon      // For Return Policy
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null);
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // Renamed for clarity
//     const [isUpdatingRatings, setIsUpdatingRatings] = useState(false); // New state for silent updates
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     // --- New: Function to fetch only dynamic data (ratings, products) ---
//     const fetchDynamicData = useCallback(async () => {
//         if (!artisanId) return; // Ensure artisanId exists

//         setIsUpdatingRatings(true); // Indicate that dynamic data is being updated
//         try {
//             const [fetchedProducts, fetchedRating] = await Promise.all([
//                 fetchProductsBySellerWithShopInfo(artisanId),
//                 fetchSellerAverageRating(artisanId),
//             ]);
//             setArtisanProducts(fetchedProducts);
//             setAverageArtisanRating(fetchedRating);
//         } catch (err: any) {
//             console.error("Failed to update dynamic artisan data:", err);
//             // Optionally set a more granular error state for dynamic data updates
//         } finally {
//             setIsUpdatingRatings(false); // Reset update state
//         }
//     }, [artisanId]);

//     // --- Effect for initial data load (profile, user profile, products, ratings) ---
//     useEffect(() => {
//         async function loadInitialArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoadingInitialData(false);
//                 return;
//             }

//             setIsLoadingInitialData(true);
//             setError(null);

//             try {
//                 const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchArtisanProfileByUserId(artisanId),
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user);
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load initial artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoadingInitialData(false);
//             }
//         }
//         loadInitialArtisanData();

//         // --- Set up an interval to refresh dynamic data (e.g., every 30 seconds) ---
//         // You can adjust the interval based on how frequently you expect ratings/reviews to change
//         const intervalId = setInterval(fetchDynamicData, 30000); // Refresh every 30 seconds

//         // --- Cleanup function for the interval ---
//         return () => clearInterval(intervalId);

//     }, [artisanId, fetchDynamicData]); // Add fetchDynamicData to dependencies

//     // --- OPTIONAL: Re-fetch dynamic data when session changes (e.g., user logs in/out) ---
//     useEffect(() => {
//         if (session) {
//             fetchDynamicData();
//         }
//     }, [session, fetchDynamicData]);


//     if (isLoadingInitialData) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20"> {/* Changed md:gap-x-12 to md:gap-x-20 */}
//                     {/* Decorative background circle */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         {/* Removed md:mr-16 as gap-x on parent is now controlling spacing */}
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Display Artisan Name */}
//                         {(session?.user?.name || userProfile?.name) && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {session?.user?.name || userProfile?.name}
//                             </p>
//                         )}

//                         {/* Display Artisan Email */}
//                         {(session?.user?.email || userProfile?.email) && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {session?.user?.email || userProfile?.email}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                                 {isUpdatingRatings && (
//                                     <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
//                                         (Updating...)
//                                     </span>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>

//                     {/* Owner-specific actions (Edit/Delete Profile) - Kept commented out */}
//                     {/*
//                     {isProfileOwner && (
//                         <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-4 relative z-10">
//                             <Button
//                                 onClick={() => router.push(`/dashboard/artisan-profile/edit`)}
//                                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <Pencil2Icon className="h-5 w-5" /> Edit Profile
//                             </Button>
//                             <Button
//                                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')}
//                                 variant="outline"
//                                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <TrashIcon className="h-5 w-5" /> Delete Profile
//                             </Button>
//                         </div>
//                     )}
//                     */}
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Our Story / Shop Description
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     About The Artisan
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Website
//                                 </h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shop Policies
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shipping Information
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Return Policy
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Product Management Section (Visible ONLY to profile owner) - Kept commented out */}
//                 {/*
//                 {isProfileOwner && (
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//                         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//                             Your Product Management
//                         </h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             <Link href="/dashboard/products" className="block">
//                                 <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                                     <Pencil2Icon className="h-5 w-5" /> Manage All Products
//                                 </Button>
//                             </Link>
//                             <Link href="/dashboard/products/create" className="block">
//                                 <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                                     <PlusIcon className="h-5 w-5" /> Add New Product
//                                 </Button>
//                             </Link>
//                             {/* Link to manage categories (if applicable) }
//                         </div>
//                     </div>
//                 )}
//                 */}

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }




















// .,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,



// // src/app/(main)/meet-artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Import all necessary icons from heroicons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,       // Added for Artisan Name
//     EnvelopeIcon,   // Added for Artisan Email
//     PhoneIcon,      // Added for Artisan Phone Number
//     // NEW ICONS FOR BIO & POLICIES SECTION
//     BuildingStorefrontIcon, // For Shop Description / Our Story
//     IdentificationIcon,     // For About The Artisan
//     GlobeAltIcon,           // For Website
//     ScaleIcon,              // For Shop Policies
//     TruckIcon,              // For Shipping Information
//     ArrowUturnLeftIcon      // For Return Policy
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null);
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // Renamed for clarity
//     const [isUpdatingRatings, setIsUpdatingRatings] = useState(false); // New state for silent updates
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     // --- New: Function to fetch only dynamic data (ratings, products) ---
//     const fetchDynamicData = useCallback(async () => {
//         if (!artisanId) return; // Ensure artisanId exists

//         setIsUpdatingRatings(true); // Indicate that dynamic data is being updated
//         try {
//             const [fetchedProducts, fetchedRating] = await Promise.all([
//                 fetchProductsBySellerWithShopInfo(artisanId),
//                 fetchSellerAverageRating(artisanId),
//             ]);
//             setArtisanProducts(fetchedProducts);
//             setAverageArtisanRating(fetchedRating);
//         } catch (err: any) {
//             console.error("Failed to update dynamic artisan data:", err);
//             // Optionally set a more granular error state for dynamic data updates
//         } finally {
//             setIsUpdatingRatings(false); // Reset update state
//         }
//     }, [artisanId]);

//     // --- Effect for initial data load (profile, user profile, products, ratings) ---
//     useEffect(() => {
//         async function loadInitialArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoadingInitialData(false);
//                 return;
//             }

//             setIsLoadingInitialData(true);
//             setError(null);

//             try {
//                 const [fetchedArtisanProfile, fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchArtisanProfileByUserId(artisanId),
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 // User profile for the artisan whose page is being viewed
//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user); // This holds the artisan's user data
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load initial artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoadingInitialData(false);
//             }
//         }
//         loadInitialArtisanData();

//         // --- Set up an interval to refresh dynamic data (e.g., every 30 seconds) ---
//         // You can adjust the interval based on how frequently you expect ratings/reviews to change
//         const intervalId = setInterval(fetchDynamicData, 30000); // Refresh every 30 seconds

//         // --- Cleanup function for the interval ---
//         return () => clearInterval(intervalId);

//     }, [artisanId, fetchDynamicData]); // Add fetchDynamicData to dependencies

//     // --- OPTIONAL: Re-fetch dynamic data when session changes (e.g., user logs in/out) ---
//     useEffect(() => {
//         // This useEffect is less critical for the public profile and could potentially be removed
//         // if its only purpose was to re-fetch on session changes for the *display* of the artisan's data.
//         // The interval already handles freshness. Keeping it for now if there are other implicit needs.
//         if (session) {
//             fetchDynamicData();
//         }
//     }, [session, fetchDynamicData]);


//     if (isLoadingInitialData) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20"> {/* Changed md:gap-x-12 to md:gap-x-20 */}
//                     {/* Decorative background circle */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         {/* Removed md:mr-16 as gap-x on parent is now controlling spacing */}
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Display Artisan Name - CORRECTED TO USE userProfile directly */}
//                         {userProfile?.name && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" fill="none" />
//                                 By: {userProfile.name}
//                             </p>
//                         )}

//                         {/* Display Artisan Email - CORRECTED TO USE userProfile directly */}
//                         {userProfile?.email && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" fill="none" />
//                                 {userProfile.email}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" fill="none" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                                 {isUpdatingRatings && (
//                                     <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
//                                         (Updating...)
//                                     </span>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>

//                     {/* Owner-specific actions (Edit/Delete Profile) - Kept commented out */}
//                     {/*
//                     {isProfileOwner && (
//                         <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-4 relative z-10">
//                             <Button
//                                 onClick={() => router.push(`/dashboard/artisan-profile/edit`)}
//                                 className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <Pencil2Icon className="h-5 w-5" /> Edit Profile
//                             </Button>
//                             <Button
//                                 onClick={() => alert('Delete Profile functionality needs to be implemented with confirmation.')}
//                                 variant="outline"
//                                 className="bg-red-600 hover:bg-red-700 text-white border-red-600 flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <TrashIcon className="h-5 w-5" /> Delete Profile
//                             </Button>
//                         </div>
//                     )}
//                     */}
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Our Story / Shop Description
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     About The Artisan
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Website
//                                 </h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shop Policies
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shipping Information
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Return Policy
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Product Management Section (Visible ONLY to profile owner) - Kept commented out */}
//                 {/*
//                 {isProfileOwner && (
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 mb-8">
//                         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
//                             Your Product Management
//                         </h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             <Link href="/dashboard/products" className="block">
//                                 <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
//                                     <Pencil2Icon className="h-5 w-5" /> Manage All Products
//                                 </Button>
//                             </Link>
//                             <Link href="/dashboard/products/create" className="block">
//                                 <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
//                                     <PlusIcon className="h-5 w-5" /> Add New Product
//                                 </Button>
//                             </Link>
//                             {/* Link to manage categories (if applicable) }
//                         </div>
//                     </div>
//                 )}
//                 */}

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }
























// // src/app/(main)/meet-artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons - Import all necessary icons from heroicons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,        // Added for Artisan Name
//     EnvelopeIcon,    // Added for Artisan Email
//     PhoneIcon,       // Added for Artisan Phone Number
//     // NEW ICONS FOR BIO & POLICIES SECTION
//     BuildingStorefrontIcon, // For Shop Description / Our Story
//     IdentificationIcon,      // For About The Artisan
//     GlobeAltIcon,            // For Website
//     ScaleIcon,               // For Shop Policies
//     TruckIcon,               // For Shipping Information
//     ArrowUturnLeftIcon      // For Return Policy
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null); // This userProfile should hold the artisan's personal user data
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
//     const [isUpdatingRatings, setIsUpdatingRatings] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     // --- New: Function to fetch only dynamic data (ratings, products) ---
//     const fetchDynamicData = useCallback(async () => {
//         if (!artisanId) return;

//         setIsUpdatingRatings(true);
//         try {
//             const [fetchedProducts, fetchedRating] = await Promise.all([
//                 fetchProductsBySellerWithShopInfo(artisanId),
//                 fetchSellerAverageRating(artisanId),
//             ]);
//             setArtisanProducts(fetchedProducts);
//             setAverageArtisanRating(fetchedRating);
//         } catch (err: any) {
//             console.error("Failed to update dynamic artisan data:", err);
//         } finally {
//             setIsUpdatingRatings(false);
//         }
//     }, [artisanId]);

//     // --- Effect for initial data load (profile, user profile, products, ratings) ---
//     useEffect(() => {
//         async function loadInitialArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoadingInitialData(false);
//                 return;
//             }

//             setIsLoadingInitialData(true);
//             setError(null);

//             try {
//                 // Fetch artisan profile and then the associated user profile
//                 const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 const [fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);


//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user); // Set the artisan's user profile here
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load initial artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoadingInitialData(false);
//             }
//         }
//         loadInitialArtisanData();

//         const intervalId = setInterval(fetchDynamicData, 30000);
//         return () => clearInterval(intervalId);

//     }, [artisanId, fetchDynamicData]);

//     // OPTIONAL: Re-fetch dynamic data when session changes (e.g., user logs in/out)
//     // This is generally fine, as it triggers a refresh of products and ratings which are dynamic.
//     useEffect(() => {
//         if (session) {
//             fetchDynamicData();
//         }
//     }, [session, fetchDynamicData]);


//     if (isLoadingInitialData) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
//                     {/* Decorative background circle */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* CORRECTED: Display Artisan Name (using userProfile only) */}
//                         {userProfile?.name && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {userProfile.name}
//                             </p>
//                         )}

//                         {/* CORRECTED: Display Artisan Email (using userProfile only) */}
//                         {userProfile?.email && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.email}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) - This was already correct */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                                 {isUpdatingRatings && (
//                                     <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
//                                         (Updating...)
//                                     </span>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Our Story / Shop Description
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     About The Artisan
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Website
//                                 </h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shop Policies
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shipping Information
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Return Policy
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

























// // src/app/(main)/meet-artisans/[artisanId]/page.tsx
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile'; // Keep this for profile image, phone, etc.
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,
//     EnvelopeIcon,
//     PhoneIcon,
//     BuildingStorefrontIcon,
//     IdentificationIcon,
//     GlobeAltIcon,
//     ScaleIcon,
//     TruckIcon,
//     ArrowUturnLeftIcon
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null); // This userProfile should hold the artisan's personal user data
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
//     const [isUpdatingRatings, setIsUpdatingRatings] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     const fetchDynamicData = useCallback(async () => {
//         if (!artisanId) return;

//         setIsUpdatingRatings(true);
//         try {
//             const [fetchedProducts, fetchedRating] = await Promise.all([
//                 fetchProductsBySellerWithShopInfo(artisanId),
//                 fetchSellerAverageRating(artisanId),
//             ]);
//             setArtisanProducts(fetchedProducts);
//             setAverageArtisanRating(fetchedRating);
//         } catch (err: any) {
//             console.error("Failed to update dynamic artisan data:", err);
//         } finally {
//             setIsUpdatingRatings(false);
//         }
//     }, [artisanId]);

//     useEffect(() => {
//         async function loadInitialArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoadingInitialData(false);
//                 return;
//             }

//             setIsLoadingInitialData(true);
//             setError(null);

//             try {
//                 // Fetch artisan profile. This should ideally contain user's name and email.
//                 const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//                 // Separately fetch the general user profile which might have more details like phone, and a fallback for name/email if not on artisanProfile
//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 const [fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user); // Set the artisan's associated user profile here
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load initial artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoadingInitialData(false);
//             }
//         }
//         loadInitialArtisanData();

//         const intervalId = setInterval(fetchDynamicData, 30000);
//         return () => clearInterval(intervalId);

//     }, [artisanId, fetchDynamicData]);

//     useEffect(() => {
//         if (session) {
//             fetchDynamicData();
//         }
//     }, [session, fetchDynamicData]);


//     if (isLoadingInitialData) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F9] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     // Determine the artisan's display name and email
//     // Prioritize `artisanProfile` if it contains these fields, otherwise fallback to `userProfile`
//     const artisanDisplayName = artisanProfile.userName || userProfile?.name;
//     const artisanDisplayEmail = artisanProfile.userEmail || userProfile?.email;

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Display Artisan Name using the determined `artisanDisplayName` */}
//                         {artisanDisplayName && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {artisanDisplayName}
//                             </p>
//                         )}

//                         {/* Display Artisan Email using the determined `artisanDisplayEmail` */}
//                         {artisanDisplayEmail && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {artisanDisplayEmail}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                                 {isUpdatingRatings && (
//                                     <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
//                                         (Updating...)
//                                     </span>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Our Story / Shop Description
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     About The Artisan
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Website
//                                 </h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shop Policies
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shipping Information
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Return Policy
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }































// // src/app/(main)/meet-artisans/[artisanId]/page.tsx

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Data fetching functions
// import { fetchArtisanProfileByUserId } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile'; // Keep this for profile image, phone, etc.
// import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// import { Product } from '@/lib/definitions'; // Import Product interface

// // Components
// import ArtisanProductCard from '@/components/products/ArtisanProductCard';
// import { Button } from '@/components/ui/button';

// // Icons
// import {
//     StarIcon,
//     MapPinIcon,
//     UserCircleIcon,
//     UserIcon,
//     EnvelopeIcon,
//     PhoneIcon,
//     BuildingStorefrontIcon,
//     IdentificationIcon,
//     GlobeAltIcon,
//     ScaleIcon,
//     TruckIcon,
//     ArrowUturnLeftIcon
// } from '@heroicons/react/24/outline';

// export default function PublicArtisanProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const { data: session } = useSession();

//     const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

//     const [artisanProfile, setArtisanProfile] = useState<any | null>(null);
//     const [userProfile, setUserProfile] = useState<any | null>(null); // This userProfile should hold the artisan's personal user data
//     const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
//     const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
//     const [isUpdatingRatings, setIsUpdatingRatings] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const isProfileOwner = session?.user?.id === artisanId;

//     const fetchDynamicData = useCallback(async () => {
//         if (!artisanId) return;

//         setIsUpdatingRatings(true);
//         try {
//             const [fetchedProducts, fetchedRating] = await Promise.all([
//                 fetchProductsBySellerWithShopInfo(artisanId),
//                 fetchSellerAverageRating(artisanId),
//             ]);
//             setArtisanProducts(fetchedProducts);
//             setAverageArtisanRating(fetchedRating);
//         } catch (err: any) {
//             console.error("Failed to update dynamic artisan data:", err);
//         } finally {
//             setIsUpdatingRatings(false);
//         }
//     }, [artisanId]);

//     useEffect(() => {
//         async function loadInitialArtisanData() {
//             if (!artisanId) {
//                 setError("Artisan ID is missing.");
//                 setIsLoadingInitialData(false);
//                 return;
//             }

//             setIsLoadingInitialData(true);
//             setError(null);

//             try {
//                 // Fetch artisan profile. This should ideally contain user's name and email.
//                 const fetchedArtisanProfile = await fetchArtisanProfileByUserId(artisanId);
//                 // Separately fetch the general user profile which might have more details like phone, and a fallback for name/email if not on artisanProfile
//                 const user = fetchedArtisanProfile ? await fetchProfileByUserId(artisanId) : null;

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user);
//                 console.log("Fetched Artisan Profile:", fetchedArtisanProfile);
//                 console.log("Fetched User Profile (Artisan's personal data):", user);

//                 const [fetchedProducts, fetchedRating] = await Promise.all([
//                     fetchProductsBySellerWithShopInfo(artisanId),
//                     fetchSellerAverageRating(artisanId),
//                 ]);

//                 setArtisanProfile(fetchedArtisanProfile);
//                 setUserProfile(user); // Set the artisan's associated user profile here
//                 setArtisanProducts(fetchedProducts);
//                 setAverageArtisanRating(fetchedRating);

//                 if (!fetchedArtisanProfile) {
//                     setError("Artisan profile not found.");
//                 }

//             } catch (err: any) {
//                 console.error("Failed to load initial artisan data:", err);
//                 setError(err.message || "An unexpected error occurred while loading artisan data.");
//             } finally {
//                 setIsLoadingInitialData(false);
//             }
//         }
//         loadInitialArtisanData();

//         const intervalId = setInterval(fetchDynamicData, 30000);
//         return () => clearInterval(intervalId);

//     }, [artisanId, fetchDynamicData]);

//     useEffect(() => {
//         if (session) {
//             fetchDynamicData();
//         }
//     }, [session, fetchDynamicData]);

//     if (isLoadingInitialData) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
//                 <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
//                 <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
//                 <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Go Back
//                 </Button>
//             </div>
//         );
//     }

//     if (!artisanProfile) {
//         return (
//             <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F9] p-6">
//                 <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
//                 <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
//                     Browse All Artisans
//                 </Button>
//             </div>
//         );
//     }

//     // Determine the artisan's display name and email
//     // Prioritize `artisanProfile` if it contains these fields, otherwise fallback to `userProfile`
//     const artisanDisplayName = artisanProfile.userName || userProfile?.name;
//     const artisanDisplayEmail = artisanProfile.userEmail || userProfile?.email;

//     return (
//         <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Artisan Profile Header Section */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

//                     <div className="flex-shrink-0 relative z-10">
//                         <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
//                             {userProfile?.profileImageUrl ? (
//                                 <Image
//                                     src={userProfile.profileImageUrl}
//                                     alt={`${artisanProfile.shopName} profile`}
//                                     fill
//                                     sizes="160px"
//                                     style={{ objectFit: 'cover' }}
//                                     className="transition-transform duration-300 hover:scale-105"
//                                 />
//                             ) : (
//                                 <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-center md:text-left flex-grow relative z-10">
//                         <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
//                             {artisanProfile.shopName || 'Untitled Shop'}
//                         </h1>

//                         {/* Added the requested user name and email display */}
//                         {artisanProfile.userName && <p className="text-sm text-[#3E3E3E] mb-1">By: {artisanProfile.userName}</p>}
//                         {artisanProfile.userEmail && <p className="text-sm text-[#6C6C6C] mb-2">{artisanProfile.userEmail}</p>}

//                         {/* Display Artisan Name using the determined `artisanDisplayName` */}
//                         {artisanDisplayName && (
//                             <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
//                                 <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 By: {artisanDisplayName}
//                             </p>
//                         )}

//                         {/* Display Artisan Email using the determined `artisanDisplayEmail` */}
//                         {artisanDisplayEmail && (
//                             <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
//                                 <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {artisanDisplayEmail}
//                             </p>
//                         )}

//                         {/* Added Artisan Phone Number (from personal userProfile) */}
//                         {userProfile?.phoneNumber && (
//                             <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
//                                 <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
//                                 {userProfile.phoneNumber}
//                             </p>
//                         )}

//                         {artisanProfile.location && (
//                             <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
//                                 <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
//                                 {artisanProfile.location}
//                             </p>
//                         )}

//                         {/* Average Rating Display */}
//                         {averageArtisanRating.averageRating > 0 ? (
//                             <div className="flex items-center justify-center md:justify-start mt-4">
//                                 <div className="flex mr-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <StarIcon
//                                             key={star}
//                                             className={`h-6 w-6 ${
//                                                 star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
//                                             } transition-colors duration-200`}
//                                             fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
//                                         />
//                                     ))}
//                                 </div>
//                                 <span className="text-2xl font-bold text-[#3E3E3E]">
//                                     {averageArtisanRating.averageRating.toFixed(1)}
//                                 </span>
//                                 <span className="text-md text-[#6C6C6C] ml-2">
//                                     ({averageArtisanRating.reviewCount} reviews)
//                                 </span>
//                                 {isUpdatingRatings && (
//                                     <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
//                                         (Updating...)
//                                     </span>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
//                         )}
//                     </div>
//                 </section>

//                 {/* Public Artisan Bio & Policies */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         About {artisanProfile.shopName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                         {artisanProfile.shopDescription && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Our Story / Shop Description
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
//                             </div>
//                         )}
//                         {artisanProfile.bio && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     About The Artisan
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
//                             </div>
//                         )}
//                         {artisanProfile.website && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Website
//                                 </h3>
//                                 <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
//                                     {artisanProfile.website}
//                                 </a>
//                             </div>
//                         )}
//                         {artisanProfile.policies && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shop Policies
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
//                             </div>
//                         )}
//                         {artisanProfile.shippingInfo && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Shipping Information
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
//                             </div>
//                         )}
//                         {artisanProfile.returnPolicy && (
//                             <div>
//                                 <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
//                                     <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
//                                     Return Policy
//                                 </h3>
//                                 <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Artisan's Products Display Section (Visible to everyone) */}
//                 <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
//                     <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
//                         Products by {artisanProfile.shopName}
//                     </h2>
//                     {artisanProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {artisanProducts.map((product) => (
//                                 <ArtisanProductCard key={product.productId} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
//                             {isProfileOwner && (
//                                 <Link
//                                     href="/products/create"
//                                     className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 >
//                                     Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </section>

//                 <div className="mt-10 text-center">
//                     <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
//                         ← Back to All Artisans
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }





















// src/app/(main)/meet-artisans/[artisanId]/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

// Data fetching functions
import { fetchArtisanProfileAndUserDetails } from '@/lib/data/artisans';
import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// Corrected import: ArtisanProfileForDisplay should be imported from definitions.ts
import { Product, ArtisanProfileForDisplay } from '@/lib/definitions'; 

// Components
import ArtisanProductCard from '@/components/products/ArtisanProductCard';
import { Button } from '@/components/ui/button';

// Icons
import {
    StarIcon,
    MapPinIcon,
    UserCircleIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    BuildingStorefrontIcon,
    IdentificationIcon,
    GlobeAltIcon,
    ScaleIcon,
    TruckIcon,
    ArrowUturnLeftIcon
} from '@heroicons/react/24/outline';

export default function PublicArtisanProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

    const [artisanProfile, setArtisanProfile] = useState<ArtisanProfileForDisplay | null>(null);
    const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
    const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [isUpdatingRatings, setIsUpdatingRatings] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isProfileOwner = session?.user?.id === artisanId;

    const fetchDynamicData = useCallback(async () => {
        if (!artisanId) return;

        setIsUpdatingRatings(true);
        try {
            const [fetchedProducts, fetchedRating] = await Promise.all([
                fetchProductsBySellerWithShopInfo(artisanId),
                fetchSellerAverageRating(artisanId),
            ]);
            setArtisanProducts(fetchedProducts);
            setAverageArtisanRating(fetchedRating);
        } catch (err: any) {
            console.error("Failed to update dynamic artisan data:", err);
        } finally {
            setIsUpdatingRatings(false);
        }
    }, [artisanId]);

    useEffect(() => {
        async function loadInitialArtisanData() {
            if (!artisanId) {
                setError("Artisan ID is missing.");
                setIsLoadingInitialData(false);
                return;
            }

            setIsLoadingInitialData(true);
            setError(null);

            try {
                const fetchedCombinedArtisanData = await fetchArtisanProfileAndUserDetails(artisanId);
                
                // --- FIX FOR THE TYPE ERROR START ---
                // If fetchedCombinedArtisanData is undefined, set artisanProfile to null.
                // Otherwise, set it to the fetched data.
                if (fetchedCombinedArtisanData === undefined) {
                    setArtisanProfile(null);
                    setError("Artisan profile not found."); // Set an explicit error for not found
                } else {
                    setArtisanProfile(fetchedCombinedArtisanData);
                }
                // --- FIX FOR THE TYPE ERROR END ---
                
                const [fetchedProducts, fetchedRating] = await Promise.all([
                    fetchProductsBySellerWithShopInfo(artisanId),
                    fetchSellerAverageRating(artisanId),
                ]);

                setArtisanProducts(fetchedProducts);
                setAverageArtisanRating(fetchedRating);

            } catch (err: any) {
                console.error("Failed to load initial artisan data:", err);
                setError(err.message || "An unexpected error occurred while loading artisan data.");
            } finally {
                setIsLoadingInitialData(false);
            }
        }
        loadInitialArtisanData();

        const intervalId = setInterval(fetchDynamicData, 30000);
        return () => clearInterval(intervalId);

    }, [artisanId, fetchDynamicData]);

    useEffect(() => {
        if (session) {
            fetchDynamicData();
        }
    }, [session, fetchDynamicData]);

    if (isLoadingInitialData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
                <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
                <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
                <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
                    Go Back
                </Button>
            </div>
        );
    }

    if (!artisanProfile) {
        return (
            <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F9] p-6">
                <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
                <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
                    Browse All Artisans
                </Button>
            </div>
        );
    }

    const artisanDisplayName = artisanProfile.userName;
    const artisanDisplayEmail = artisanProfile.userEmail;

    return (
        <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Artisan Profile Header Section */}
                <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

                    <div className="flex-shrink-0 relative z-10">
                        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
                            {artisanProfile?.profileImageUrl ? (
                                <Image
                                    src={artisanProfile.profileImageUrl}
                                    alt={`${artisanProfile.shopName} profile`}
                                    fill
                                    sizes="160px"
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            ) : (
                                <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
                            )}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-grow relative z-10">
                        <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
                            {artisanProfile.shopName || 'Untitled Shop'}
                        </h1>

                        {artisanDisplayName && (
                            <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
                                <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
                                By: {artisanDisplayName}
                            </p>
                        )}

                        {artisanDisplayEmail && (
                            <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
                                {artisanDisplayEmail}
                            </p>
                        )}

                        {artisanProfile?.phoneNumber && (
                            <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
                                {artisanProfile.phoneNumber}
                            </p>
                        )}

                        {artisanProfile.location && (
                            <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
                                <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
                                {artisanProfile.location}
                            </p>
                        )}

                        {averageArtisanRating.averageRating > 0 ? (
                            <div className="flex items-center justify-center md:justify-start mt-4">
                                <div className="flex mr-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={`h-6 w-6 ${
                                                star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                                            } transition-colors duration-200`}
                                            fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
                                        />
                                    ))}
                                </div>
                                <span className="text-2xl font-bold text-[#3E3E3E]">
                                    {averageArtisanRating.averageRating.toFixed(1)}
                                </span>
                                <span className="text-md text-[#6C6C6C] ml-2">
                                    ({averageArtisanRating.reviewCount} reviews)
                                </span>
                                {isUpdatingRatings && (
                                    <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
                                        (Updating...)
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
                        )}
                    </div>
                </section>

                {/* Public Artisan Bio & Policies */}
                <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
                    <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
                        About {artisanProfile.shopName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {artisanProfile.shopDescription && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Our Story / Shop Description
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
                            </div>
                        )}
                        {artisanProfile.bio && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    About The Artisan
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
                            </div>
                        )}
                        {artisanProfile.website && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Website
                                </h3>
                                <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
                                    {artisanProfile.website}
                                </a>
                            </div>
                        )}
                        {artisanProfile.policies && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Shop Policies
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
                            </div>
                        )}
                        {artisanProfile.shippingInfo && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Shipping Information
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
                            </div>
                        )}
                        {artisanProfile.returnPolicy && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Return Policy
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Artisan's Products Display Section (Visible to everyone) */}
                <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
                    <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
                        Products by {artisanProfile.shopName}
                    </h2>
                    {artisanProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {artisanProducts.map((product) => (
                                <ArtisanProductCard key={product.productId} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
                            {isProfileOwner && (
                                <Link
                                    href="/products/create"
                                    className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    Add Your First Product
                                </Link>
                            )}
                        </div>
                    )}
                </section>

                <div className="mt-10 text-center">
                    <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
                        ← Back to All Artisans
                    </Link>
                </div>
            </div>
        </div>
    );
}