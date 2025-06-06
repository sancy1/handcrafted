
// src/components/products/ProductDetail.tsx

'use client';

import Image from 'next/image';
import { Product } from '@/lib/definitions';
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from '../ui/button';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const averageRating = product.reviews?.length 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-[#F9F4EF] relative rounded-lg overflow-hidden mb-4">
            {product.images?.length > 0 ? (
              <Image
                src={product.images[selectedImage].imageUrl}
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
          
          {/* Rating */}
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
              {averageRating.toFixed(1)} ({product.reviews?.length || 0} reviews)
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

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="border-t border-[#E6E1DC] p-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
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
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-[#3E3E3E] mb-1">{review.title}</h3>
                <p className="text-[#6C6C6C] whitespace-pre-line">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}