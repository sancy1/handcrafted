
// // src/components/products/ProductDetail.tsx

// 'use client';

// import Image from 'next/image';
// import { Product } from '@/lib/definitions';
// import { StarIcon } from '@heroicons/react/24/solid';
// import { useState } from 'react';
// import { Button } from '../ui/button';

// interface ProductDetailProps {
//   product: Product;
// }

// export default function ProductDetail({ product }: ProductDetailProps) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
//   const averageRating = product.reviews?.length 
//     ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
//     : 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC]">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
//         {/* Product Images */}
//         <div>
//           <div className="aspect-square bg-[#F9F4EF] relative rounded-lg overflow-hidden mb-4">
//             {product.images?.length > 0 ? (
//               <Image
//                 src={product.images[selectedImage].imageUrl}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
//                 No Image
//               </div>
//             )}
//           </div>
          
//           {product.images?.length > 1 && (
//             <div className="grid grid-cols-4 gap-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={image.imageId}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square bg-[#F9F4EF] relative rounded-md overflow-hidden border ${
//                     selectedImage === index ? 'border-[#B55B3D]' : 'border-transparent'
//                   }`}
//                 >
//                   <Image
//                     src={image.imageUrl}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-2">
//             {product.name}
//           </h1>
          
//           {/* Rating */}
//           <div className="flex items-center mb-4">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <StarIcon
//                   key={star}
//                   className={`h-5 w-5 ${
//                     star <= Math.round(averageRating)
//                       ? 'text-yellow-400'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-[#6C6C6C] ml-2">
//               {averageRating.toFixed(1)} ({product.reviews?.length || 0} reviews)
//             </span>
//           </div>

//           {/* Price */}
//           <p className="text-2xl font-semibold text-[#B55B3D] mb-6">
//             ${product.price.toFixed(2)}
//           </p>

//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Description</h2>
//             <p className="text-[#6C6C6C] whitespace-pre-line">{product.description}</p>
//           </div>

//           {/* Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {product.materialsUsed && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Materials</h3>
//                 <p className="text-[#3E3E3E]">{product.materialsUsed}</p>
//               </div>
//             )}
//             {product.dimensions && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Dimensions</h3>
//                 <p className="text-[#3E3E3E]">{product.dimensions}</p>
//               </div>
//             )}
//             {product.weight && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Weight</h3>
//                 <p className="text-[#3E3E3E]">{product.weight} lbs</p>
//               </div>
//             )}
//             {product.careInstructions && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Care Instructions</h3>
//                 <p className="text-[#3E3E3E] whitespace-pre-line">{product.careInstructions}</p>
//               </div>
//             )}
//           </div>

//           {/* Seller */}
//           {product.seller && (
//             <div className="mb-6">
//               <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Artisan</h2>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-[#F9F4EF] flex items-center justify-center">
//                   <span className="text-[#B55B3D] text-sm font-medium">
//                     {product.seller?.user?.name?.charAt(0).toUpperCase() || 'A'}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-[#3E3E3E] font-medium">{product.seller.shopName}</p>
//                   <p className="text-sm text-[#6C6C6C]">
//                     {product.seller?.user?.name || 'Artisan'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add to Cart */}
//           <div className="flex gap-3">
//             <div className="flex items-center border border-[#E6E1DC] rounded-md">
//               <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">-</button>
//               <span className="px-4 py-2">1</span>
//               <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">+</button>
//             </div>
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex-1">
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews */}
//       {product.reviews && product.reviews.length > 0 && (
//         <div className="border-t border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Customer Reviews</h2>
//           <div className="space-y-6">
//             {product.reviews.map((review) => (
//               <div key={review.reviewId} className="border-b border-[#E6E1DC] pb-6 last:border-0 last:pb-0">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-[#F9F4EF] flex items-center justify-center">
//                     <span className="text-[#B55B3D] text-xs font-medium">
//                       {review.user?.name?.charAt(0).toUpperCase() || 'U'}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[#3E3E3E] font-medium">
//                       {review.user?.name || 'Anonymous'}
//                     </p>
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <StarIcon
//                           key={star}
//                           className={`h-4 w-4 ${
//                             star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-lg font-medium text-[#3E3E3E] mb-1">{review.title}</h3>
//                 <p className="text-[#6C6C6C] whitespace-pre-line">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




























// // src/components/products/ProductDetail.tsx

// 'use client';

// import Image from 'next/image';
// // Import Product and Review directly from your definitions file
// import { Product, Review } from '@/lib/definitions';
// import { StarIcon } from '@heroicons/react/24/solid';
// import { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import { fetchProductReviews } from '@/lib/data/reviews';
// import ReviewForm from '../reviews/ReviewForm';

// // ProductDetailProps relies on the Product type imported above
// interface ProductDetailProps {
//   product: Product;
// }

// export default function ProductDetail({ product }: ProductDetailProps) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   // Initialize reviews state with existing product reviews, ensuring type consistency
//   // Reviews are cast as 'Review[]' from product.reviews
//   const [reviews, setReviews] = useState<Review[]>(product.reviews as Review[] || []);
//   const [showReviewForm, setShowReviewForm] = useState(false);

//   // Derive primary image or first available image
//   const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

//   // Function to refresh reviews from the backend
//   const refreshReviews = async () => {
//     try {
//       // Ensure fetchProductReviews returns an array of your Review type
//       const updatedReviews: Review[] = await fetchProductReviews(product.productId);
//       setReviews(updatedReviews);
//     } catch (error) {
//       console.error('Failed to refresh reviews:', error);
//     }
//   };

//   // Fetch reviews initially and when product.productId changes
//   // This ensures the reviews displayed are always up-to-date
//   useEffect(() => {
//     refreshReviews();
//   }, [product.productId]);

//   // Calculate average rating based on the `reviews` state to reflect newly submitted reviews
//   const averageRating = reviews.length > 0
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//     : 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC]">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
//         {/* Product Images */}
//         <div>
//           <div className="aspect-square bg-[#F9F4EF] relative rounded-lg overflow-hidden mb-4">
//             {product.images?.length > 0 ? (
//               <Image
//                 src={product.images[selectedImage].imageUrl}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
//                 No Image
//               </div>
//             )}
//           </div>

//           {product.images?.length > 1 && (
//             <div className="grid grid-cols-4 gap-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={image.imageId}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square bg-[#F9F4EF] relative rounded-md overflow-hidden border ${
//                     selectedImage === index ? 'border-[#B55B3D]' : 'border-transparent'
//                   }`}
//                 >
//                   <Image
//                     src={image.imageUrl}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-2">
//             {product.name}
//           </h1>

//           {/* Rating Display */}
//           <div className="flex items-center mb-4">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <StarIcon
//                   key={star}
//                   className={`h-5 w-5 ${
//                     star <= Math.round(averageRating)
//                       ? 'text-yellow-400'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-[#6C6C6C] ml-2">
//               {averageRating.toFixed(1)} ({reviews.length} reviews)
//             </span>
//           </div>

//           {/* Price */}
//           <p className="text-2xl font-semibold text-[#B55B3D] mb-6">
//             ${product.price.toFixed(2)}
//           </p>

//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Description</h2>
//             <p className="text-[#6C6C6C] whitespace-pre-line">{product.description}</p>
//           </div>

//           {/* Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {product.materialsUsed && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Materials</h3>
//                 <p className="text-[#3E3E3E]">{product.materialsUsed}</p>
//               </div>
//             )}
//             {product.dimensions && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Dimensions</h3>
//                 <p className="text-[#3E3E3E]">{product.dimensions}</p>
//               </div>
//             )}
//             {product.weight && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Weight</h3>
//                 <p className="text-[#3E3E3E]">{product.weight} lbs</p>
//               </div>
//             )}
//             {product.careInstructions && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Care Instructions</h3>
//                 <p className="text-[#3E3E3E] whitespace-pre-line">{product.careInstructions}</p>
//               </div>
//             )}
//           </div>

//           {/* Seller */}
//           {product.seller && (
//             <div className="mb-6">
//               <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Artisan</h2>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-[#F9F4EF] flex items-center justify-center">
//                   <span className="text-[#B55B3D] text-sm font-medium">
//                     {product.seller?.user?.name?.charAt(0).toUpperCase() || 'A'}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-[#3E3E3E] font-medium">{product.seller.shopName}</p>
//                   <p className="text-sm text-[#6C6C6C]">
//                     {product.seller?.user?.name || 'Artisan'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add to Cart */}
//           <div className="flex gap-3">
//             <div className="flex items-center border border-[#E6E1DC] rounded-md">
//               <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">-</button>
//               <span className="px-4 py-2">1</span>
//               <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">+</button>
//             </div>
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex-1">
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section - Updated with dynamic review handling */}
//       <div className="border-t border-[#E6E1DC] p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">
//             Customer Reviews ({reviews.length})
//           </h2>
//           <Button
//             onClick={() => setShowReviewForm(!showReviewForm)}
//             className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//           >
//             {showReviewForm ? 'Cancel' : 'Write a Review'}
//           </Button>
//         </div>

//         {showReviewForm && (
//           <ReviewForm
//             productId={product.productId}
//             onReviewSubmit={() => {
//               refreshReviews(); // Refresh reviews after submission
//               setShowReviewForm(false); // Hide the form
//             }}
//           />
//         )}

//         {reviews.length === 0 ? (
//           <p className="text-[#6C6C6C] text-center py-4">No reviews yet. Be the first to review!</p>
//         ) : (
//           <div className="space-y-6">
//             {reviews.map((review) => (
//               <div key={review.reviewId} className="border-b border-[#E6E1DC] pb-6 last:border-0 last:pb-0">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-[#F9F4EF] flex items-center justify-center">
//                     <span className="text-[#B55B3D] text-xs font-medium">
//                       {review.user?.name?.charAt(0).toUpperCase() || 'U'}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[#3E3E3E] font-medium">
//                       {review.user?.name || 'Anonymous'}
//                     </p>
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <StarIcon
//                           key={star}
//                           className={`h-4 w-4 ${
//                             star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-[#6C6C6C] ml-2">
//                         {new Date(review.reviewDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-lg font-medium text-[#3E3E3E] mb-1">{review.title}</h3>
//                 <p className="text-[#6C6C6C] whitespace-pre-line">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



















// // src/components/products/ProductDetail.tsx

// 'use client';

// import Image from 'next/image';
// import { Product, Review } from '@/lib/definitions'; // Ensure Review is imported here
// import { StarIcon } from '@heroicons/react/24/solid';
// import { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import { fetchProductReviews } from '@/lib/data/reviews';
// import ReviewForm from '../reviews/ReviewForm';
// import { useSession } from 'next-auth/react'; // Import useSession
// import Link from 'next/link'; // Import Link for navigation

// // Assuming ProductDetailProps is defined similarly to:
// interface ProductDetailProps {
//   product: Product;
// }

// export default function ProductDetail({ product }: ProductDetailProps) {
//   const { data: session, status } = useSession(); // Get session data
//   const currentUserId = session?.user?.id; // Assuming user.id is available in session
//   const currentUserRole = session?.user?.role; // Assuming user.role is available (e.g., 'buyer', 'artisan', 'admin')

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [reviews, setReviews] = useState<Review[]>(product.reviews as Review[] || []);
//   const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle form visibility

//   const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

//   const refreshReviews = async () => {
//     try {
//       const updatedReviews: Review[] = await fetchProductReviews(product.productId);
//       setReviews(updatedReviews);
//     } catch (error) {
//       console.error('Failed to refresh reviews:', error);
//     }
//   };

//   useEffect(() => {
//     refreshReviews();
//   }, [product.productId]);

//   const averageRating = reviews.length > 0
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//     : 0;

//   // --- RBAC Logic for Review Submission ---
//   const isLoggedIn = status === 'authenticated';
//   const isBuyer = currentUserRole === 'buyer';
//   const isArtisan = currentUserRole === 'artisan';
//   const isProductOwner = product.seller?.userId === currentUserId; // Check if the logged-in user owns this product

//   let canWriteReview = false;
//   let reviewSubmissionMessage = '';

//   if (!isLoggedIn) {
//     reviewSubmissionMessage = "Please sign in to write a review.";
//   } else if (isArtisan) {
//     // If the user has the 'artisan' role, they are generally not allowed to review.
//     // A more specific message is shown if it's their own product.
//     reviewSubmissionMessage = "Artisans are not allowed to submit reviews.";
//     if (isProductOwner) {
//       reviewSubmissionMessage = "Artisans cannot review their own products.";
//     }
//   } else if (!isBuyer) {
//     // This catches 'admin' or any other non-buyer role if they are logged in.
//     reviewSubmissionMessage = "Only users with the buyer role can submit reviews.";
//   } else {
//     // All checks passed: logged in, is a buyer, and not an artisan trying to review (since artisan check is above)
//     canWriteReview = true;
//   }
//   // --- End RBAC Logic ---

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC]">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
//         {/* Product Images */}
//         <div>
//           <div className="aspect-square bg-[#F9F4EF] relative rounded-lg overflow-hidden mb-4">
//             {product.images?.length > 0 ? (
//               <Image
//                 src={primaryImage?.imageUrl || ''} // Provide fallback for src
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
//                 No Image
//               </div>
//             )}
//           </div>

//           {product.images?.length > 1 && (
//             <div className="grid grid-cols-4 gap-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={image.imageId}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square bg-[#F9F4EF] relative rounded-md overflow-hidden border ${
//                     selectedImage === index ? 'border-[#B55B3D]' : 'border-transparent'
//                   }`}
//                 >
//                   <Image
//                     src={image.imageUrl}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-2">
//             {product.name}
//           </h1>

//           {/* Rating Display */}
//           <div className="flex items-center mb-4">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <StarIcon
//                   key={star}
//                   className={`h-5 w-5 ${
//                     star <= Math.round(averageRating)
//                       ? 'text-yellow-400'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-[#6C6C6C] ml-2">
//               {averageRating.toFixed(1)} ({reviews.length} reviews)
//             </span>
//           </div>

//           {/* Price */}
//           <p className="text-2xl font-semibold text-[#B55B3D] mb-6">
//             ${product.price.toFixed(2)}
//           </p>

//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Description</h2>
//             <p className="text-[#6C6C6C] whitespace-pre-line">{product.description}</p>
//           </div>

//           {/* Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {product.materialsUsed && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Materials</h3>
//                 <p className="text-[#3E3E3E]">{product.materialsUsed}</p>
//               </div>
//             )}
//             {product.dimensions && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Dimensions</h3>
//                 <p className="text-[#3E3E3E]">{product.dimensions}</p>
//               </div>
//             )}
//             {product.weight && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Weight</h3>
//                 <p className="text-[#3E3E3E]">{product.weight} lbs</p>
//               </div>
//             )}
//             {product.careInstructions && (
//               <div>
//                 <h3 className="text-sm font-medium text-[#6C6C6C]">Care Instructions</h3>
//                 <p className="text-[#3E3E3E] whitespace-pre-line">{product.careInstructions}</p>
//               </div>
//             )}
//           </div>

//           {/* Seller */}
//           {product.seller && (
//             <div className="mb-6">
//               <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Artisan</h2>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-[#F9F4EF] flex items-center justify-center">
//                   <span className="text-[#B55B3D] text-sm font-medium">
//                     {product.seller?.user?.name?.charAt(0).toUpperCase() || 'A'}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-[#3E3E3E] font-medium">{product.seller.shopName}</p>
//                   <p className="text-sm text-[#6C6C6C]">
//                     {product.seller?.user?.name || 'Artisan'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add to Cart */}
//           <div className="flex gap-3">
//             <div className="flex items-center border border-[#E6E1DC] rounded-md">
//               <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">-</button>
//               <span className="px-4 py-2">1</span>
//               <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">+</button>
//             </div>
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex-1">
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="border-t border-[#E6E1DC] p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">
//             Customer Reviews ({reviews.length})
//           </h2>
//           {/* Conditionally render the "Write a Review" button */}
//           {canWriteReview && (
//             <Button
//               onClick={() => setShowReviewForm(!showReviewForm)}
//               className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//             >
//               {showReviewForm ? 'Cancel' : 'Write a Review'}
//             </Button>
//           )}
//         </div>

//         {/* Display messages if review submission is restricted */}
//         {!canWriteReview && reviewSubmissionMessage && (
//           <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-4 text-center">
//             {reviewSubmissionMessage}
//             {!isLoggedIn && (
//               <>
//                 <Link href="/api/auth/signin" className="text-[#B55B3D] hover:underline ml-1">
//                   Sign In
//                 </Link>
//                 <span className="mx-1">or</span>
//                 <Link href="/register" className="text-[#B55B3D] hover:underline">
//                   Create an Account
//                 </Link>
//               </>
//             )}
//             {/* You might add more specific links here if your app has a way to change roles,
//                 e.g., if a user is an admin and wants to switch to a buyer profile. */}
//           </div>
//         )}

//         {/* Review Form (only show if canWriteReview is true and showReviewForm is toggled) */}
//         {showReviewForm && canWriteReview && (
//           <ReviewForm
//             productId={product.productId}
//             onReviewSubmit={() => {
//               refreshReviews();
//               setShowReviewForm(false);
//             }}
//           />
//         )}

//         {/* Existing reviews display */}
//         {reviews.length === 0 ? (
//           <p className="text-[#6C6C6C] text-center py-4">No reviews yet. Be the first to review!</p>
//         ) : (
//           <div className="space-y-6">
//             {reviews.map((review) => (
//               <div key={review.reviewId} className="border-b border-[#E6E1DC] pb-6 last:border-0 last:pb-0">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-[#F9F4EF] flex items-center justify-center">
//                     <span className="text-[#B55B3D] text-xs font-medium">
//                       {review.user?.name?.charAt(0).toUpperCase() || 'U'}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[#3E3E3E] font-medium">
//                       {review.user?.name || 'Anonymous'}
//                     </p>
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <StarIcon
//                           key={star}
//                           className={`h-4 w-4 ${
//                             star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-[#6C6C6C] ml-2">
//                         {new Date(review.reviewDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-lg font-medium text-[#3E3E3E] mb-1">{review.title}</h3>
//                 <p className="text-[#6C6C6C] whitespace-pre-line">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





















// src/components/products/ProductDetail.tsx

'use client';

import Image from 'next/image';
import { Product, Review } from '@/lib/definitions'; // Ensure Review is imported here
import { StarIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { fetchProductReviews } from '@/lib/data/reviews';
import ReviewForm from '../reviews/ReviewForm';
import { useSession } from 'next-auth/react'; // Import useSession
import Link from 'next/link'; // Import Link for navigation

// Assuming ProductDetailProps is defined similarly to:
interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { data: session, status } = useSession(); // Get session data
  const currentUserId = session?.user?.id; // Assuming user.id is available in session
  const currentUserRole = session?.user?.role; // Assuming user.role is available (e.g., 'buyer', 'artisan', 'admin')

  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(product.reviews as Review[] || []);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle form visibility

  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

  const refreshReviews = async () => {
    try {
      const updatedReviews: Review[] = await fetchProductReviews(product.productId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Failed to refresh reviews:', error);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, [product.productId]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // --- RBAC Logic for Review Submission ---
  const isLoggedIn = status === 'authenticated';
  const isBuyer = currentUserRole === 'buyer';
  const isArtisan = currentUserRole === 'artisan';
  const isProductOwner = product.seller?.userId === currentUserId; // Check if the logged-in user owns this product

  let canWriteReview = false;
  let reviewSubmissionMessage = '';

  if (!isLoggedIn) {
    reviewSubmissionMessage = "Please sign in to write a review.";
  } else if (isArtisan) {
    // If the user has the 'artisan' role, they are generally not allowed to review.
    // A more specific message is shown if it's their own product.
    reviewSubmissionMessage = "Artisans are not allowed to submit reviews.";
    if (isProductOwner) {
      reviewSubmissionMessage = "Artisans cannot review their own products.";
    }
  } else if (!isBuyer) {
    // This catches 'admin' or any other non-buyer role if they are logged in.
    reviewSubmissionMessage = "Only users with the buyer role can submit reviews.";
  } else {
    // All checks passed: logged in, is a buyer, and not an artisan trying to review (since artisan check is above)
    canWriteReview = true;
  }
  // --- End RBAC Logic ---

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-[#F9F4EF] relative rounded-lg overflow-hidden mb-4">
            {product.images?.length > 0 ? (
              <Image
                src={primaryImage?.imageUrl || ''} // Provide fallback for src
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
                No Image
              </div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.imageId}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-[#F9F4EF] relative rounded-md overflow-hidden border ${
                    selectedImage === index ? 'border-[#B55B3D]' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#3E3E3E] mb-2">
            {product.name}
          </h1>

          {/* Featured and Active Status */}
          <div className="flex items-center gap-4 mb-4 text-sm font-medium">
            {product.isFeatured && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                Featured Product
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs ${
              product.isActive
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Rating Display */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#6C6C6C] ml-2">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold text-[#B55B3D] mb-6">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Description</h2>
            <p className="text-[#6C6C6C] whitespace-pre-line">{product.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {product.materialsUsed && (
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C]">Materials</h3>
                <p className="text-[#3E3E3E]">{product.materialsUsed}</p>
              </div>
            )}
            {product.dimensions && (
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C]">Dimensions</h3>
                <p className="text-[#3E3E3E]">{product.dimensions}</p>
              </div>
            )}
            {product.weight && (
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C]">Weight</h3>
                <p className="text-[#3E3E3E]">{product.weight} lbs</p>
              </div>
            )}
            {product.careInstructions && (
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C]">Care Instructions</h3>
                <p className="text-[#3E3E3E] whitespace-pre-line">{product.careInstructions}</p>
              </div>
            )}
          </div>

          {/* Seller */}
          {product.seller && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-[#3E3E3E] mb-2">Artisan</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F9F4EF] flex items-center justify-center">
                  <span className="text-[#B55B3D] text-sm font-medium">
                    {product.seller?.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-[#3E3E3E] font-medium">{product.seller.shopName}</p>
                  <p className="text-sm text-[#6C6C6C]">
                    {product.seller?.user?.name || 'Artisan'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex gap-3">
            <div className="flex items-center border border-[#E6E1DC] rounded-md">
              <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">-</button>
              <span className="px-4 py-2">1</span>
              <button className="px-3 py-2 text-[#6C6C6C] hover:bg-[#F9F4EF]">+</button>
            </div>
            <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-[#E6E1DC] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">
            Customer Reviews ({reviews.length})
          </h2>
          {/* Conditionally render the "Write a Review" button */}
          {canWriteReview && (
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-[#B55B3D] hover:bg-[#9E4F37]"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </Button>
          )}
        </div>

        {/* Display messages if review submission is restricted */}
        {!canWriteReview && reviewSubmissionMessage && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-4 text-center">
            {reviewSubmissionMessage}
            {!isLoggedIn && (
              <>
                <Link href="/api/auth/signin" className="text-[#B55B3D] hover:underline ml-1">
                  Sign In
                </Link>
                <span className="mx-1">or</span>
                <Link href="/register" className="text-[#B55B3D] hover:underline">
                  Create an Account
                </Link>
              </>
            )}
          </div>
        )}

        {/* Review Form (only show if canWriteReview is true and showReviewForm is toggled) */}
        {showReviewForm && canWriteReview && (
          <ReviewForm
            productId={product.productId}
            onReviewSubmit={() => {
              refreshReviews();
              setShowReviewForm(false);
            }}
          />
        )}

        {/* Existing reviews display */}
        {reviews.length === 0 ? (
          <p className="text-[#6C6C6C] text-center py-4">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.reviewId} className="border-b border-[#E6E1DC] pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F9F4EF] flex items-center justify-center">
                    <span className="text-[#B55B3D] text-xs font-medium">
                      {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#3E3E3E] font-medium">
                      {review.user?.name || 'Anonymous'}
                    </p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      {/* FIX START: Apply consistent date formatting */}
                      <span className="text-sm text-[#6C6C6C] ml-2">
                        {new Date(review.reviewDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                      {/* FIX END */}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-[#3E3E3E] mb-1">{review.title}</h3>
                <p className="text-[#6C6C6C] whitespace-pre-line">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}