
// // src/components/products/ProductCard.tsx

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Product } from '@/lib/definitions';
// import { StarIcon } from '@heroicons/react/24/solid';

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
//   const averageRating = product.reviews?.length 
//     ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
//     : 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC] hover:shadow-lg transition-shadow">
//       <Link href={`/products/${product.productId}`} className="block">
//         {/* Product Image */}
//         <div className="aspect-square bg-[#F9F4EF] relative">
//           {primaryImage ? (
//             <Image
//               src={primaryImage.imageUrl}
//               alt={product.name}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="p-4">
//           <h3 className="text-lg font-medium text-[#3E3E3E] mb-1 line-clamp-2">
//             {product.name}
//           </h3>
          
//           {/* Rating */}
//           <div className="flex items-center mb-2">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <StarIcon
//                   key={star}
//                   className={`h-4 w-4 ${
//                     star <= Math.round(averageRating)
//                       ? 'text-yellow-400'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-[#6C6C6C] ml-1">
//               ({product.reviews?.length || 0})
//             </span>
//           </div>

//           {/* Price */}
//           <p className="text-lg font-semibold text-[#B55B3D]">
//             ${product.price.toFixed(2)}
//           </p>

//           {/* Seller */}
//           {product.seller && (
//             <p className="text-sm text-[#6C6C6C] mt-1">
//               By {product.seller.shopName}
//             </p>
//           )}
//         </div>
//       </Link>
//     </div>
//   );
// }























// src/components/products/ProductCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/definitions'; // Assuming Product is defined here
import { StarIcon } from '@heroicons/react/24/solid';
import { calculateAverageRating } from '@/lib/utils'; // Import the new utility function

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

  // Use the utility function for average rating
  const averageRating = calculateAverageRating(product.reviews);
  const reviewCount = product.reviews?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC] hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.productId}`} className="block">
        {/* Product Image */}
        <div className="aspect-square bg-[#F9F4EF] relative">
          {primaryImage ? (
            <Image
              src={primaryImage.imageUrl}
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

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-[#3E3E3E] mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {/* Displaying only the review count */}
            <span className="text-xs text-[#6C6C6C] ml-1">
              ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-[#B55B3D]">
            ${product.price.toFixed(2)}
          </p>

          {/* Seller */}
          {product.seller && (
            <p className="text-sm text-[#6C6C6C] mt-1">
              By {product.seller.shopName}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}