

// // src/lib/data/products.ts

// 'use server';

// import { unstable_noStore as noStore } from 'next/cache';
// import prisma from '@/lib/prisma';
// // This is the correct way to get your definitions: import them from '@/lib/definitions'
// import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';
// import { z } from 'zod'; // You still need to import z from zod if ProductFormSchema is defined here or if you use it directly.
//                         // However, if ProductFormSchema is ALSO in definitions.ts, you should remove this 'z' import too.
//                         // Assuming for now ProductFormSchema is in definitions.ts with 'z' imported there.


// // Helper function to safely get values from FormData
// function getValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   return value as string;
// }

// // Helper function to transform Prisma Product type to your Product interface
// // This helper is crucial because Prisma's Decimal type needs to be converted to 'number'
// function transformProduct(prismaProduct: any): Product {
//   return {
//     ...prismaProduct,
//     price: prismaProduct.price.toNumber(), // Convert Decimal to number
//     // Ensure all nested objects match your Product interface
//     // Provide empty arrays if images/reviews are not found, aligning with your interface
//     images: prismaProduct.images || [],
//     reviews: prismaProduct.reviews || [],
//     // Handle optional seller and nested user objects
//     seller: prismaProduct.seller ? {
//       ...prismaProduct.seller,
//       user: prismaProduct.seller.user ? {
//         name: prismaProduct.seller.user.name || null,
//       } : undefined, // Ensure 'user' is undefined if not present, not null
//     } : undefined, // Ensure 'seller' is undefined if not present, not null
//   };
// }

// export async function createProduct(sellerId: string, formData: FormData) {
//   noStore();
//   try {
//     const productData: ProductFormData = {
//       name: getValue(formData, 'name') || '',
//       description: getValue(formData, 'description') || '',
//       price: parseFloat(getValue(formData, 'price') || '0'),
//       quantityAvailable: parseInt(getValue(formData, 'quantityAvailable') || '1'),
//       categoryId: getValue(formData, 'categoryId'),
//       materialsUsed: getValue(formData, 'materialsUsed'),
//       dimensions: getValue(formData, 'dimensions'),
//       weight: getValue(formData, 'weight') ? parseFloat(getValue(formData, 'weight')!) : null,
//       careInstructions: getValue(formData, 'careInstructions'),
//       tags: getValue(formData, 'tags'),
//     };

//     // Create product
//     const product = await prisma.product.create({
//       data: {
//         sellerId,
//         name: productData.name,
//         description: productData.description,
//         price: productData.price, // Prisma handles the conversion from number to Decimal on write
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId || null,
//         materialsUsed: productData.materialsUsed || null,
//         dimensions: productData.dimensions || null,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions || null,
//         tags: productData.tags ? JSON.parse(productData.tags) : null,
//       },
//     });

//     // Handle image uploads if provided
//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       await prisma.productImage.create({
//         data: {
//           productId: product.productId,
//           imageUrl: imageUrl,
//           isPrimary: true,
//         },
//       });
//     }

//     // Return the transformed product to match the Product interface
//     return transformProduct(product);
//   } catch (error) {
//     console.error('Database Error (createProduct):', error);
//     throw new Error('Failed to create product.');
//   }
// }

// export async function fetchProductsBySeller(sellerId: string): Promise<Product[]> {
//   noStore();
//   try {
//     const products = await prisma.product.findMany({
//       where: { sellerId },
//       include: {
//         images: true,
//         reviews: true,
//       },
//       orderBy: {
//         creationDate: 'desc',
//       },
//     });
//     // Map and transform each product to match the Product interface
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchProductsBySeller):', error);
//     throw new Error('Failed to fetch products.');
//   }
// }

// export async function fetchAllProducts(): Promise<Product[]> {
//   noStore();
//   try {
//     const products = await prisma.product.findMany({
//       where: { isActive: true },
//       include: {
//         images: {
//           where: { isPrimary: true },
//           take: 1,
//         },
//         seller: {
//           select: {
//             shopName: true,
//             userId: true,
//           },
//         },
//         reviews: true,
//       },
//       orderBy: {
//         creationDate: 'desc',
//       },
//     });
//     // Map and transform each product to match the Product interface
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchAllProducts):', error);
//     throw new Error('Failed to fetch products.');
//   }
// }

// export async function fetchProductById(productId: string): Promise<Product | null> {
//   noStore();
//   try {
//     const product = await prisma.product.findUnique({
//       where: { productId },
//       include: {
//         images: true,
//         seller: {
//           select: {
//             shopName: true,
//             userId: true,
//             user: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//         reviews: {
//           include: {
//             user: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     });
//     // Transform the single product if found, otherwise return null
//     return product ? transformProduct(product) : null;
//   } catch (error) {
//     console.error('Database Error (fetchProductById):', error);
//     throw new Error('Failed to fetch product.');
//   }
// }





// // UPDATE FORM

// export async function updateProduct(productId: string, formData: FormData) {
//   noStore();
//   try {
//     const productData: Partial<ProductFormData> = {
//       name: getValue(formData, 'name') || undefined,
//       description: getValue(formData, 'description') || undefined,
//       price: getValue(formData, 'price') ? parseFloat(getValue(formData, 'price')!) : undefined,
//       quantityAvailable: getValue(formData, 'quantityAvailable') ? parseInt(getValue(formData, 'quantityAvailable')!) : undefined,
//       categoryId: getValue(formData, 'categoryId') || undefined,
//       materialsUsed: getValue(formData, 'materialsUsed') || undefined,
//       dimensions: getValue(formData, 'dimensions') || undefined,
//       weight: getValue(formData, 'weight') ? parseFloat(getValue(formData, 'weight')!) : undefined,
//       careInstructions: getValue(formData, 'careInstructions') || undefined,
//       tags: getValue(formData, 'tags') || undefined,
//     };

//     // Update product
//     const updatedProduct = await prisma.product.update({
//       where: { productId },
//       data: {
//         name: productData.name,
//         description: productData.description,
//         price: productData.price,
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId,
//         materialsUsed: productData.materialsUsed,
//         dimensions: productData.dimensions,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions,
//         tags: productData.tags ? JSON.parse(productData.tags) : undefined,
//         lastUpdated: new Date(),
//       },
//     });

//     // Handle image updates if provided
//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       // Check if primary image exists
//       const existingPrimaryImage = await prisma.productImage.findFirst({
//         where: {
//           productId,
//           isPrimary: true,
//         },
//       });

//       if (existingPrimaryImage) {
//         // Update existing primary image
//         await prisma.productImage.update({
//           where: { imageId: existingPrimaryImage.imageId },
//           data: { imageUrl },
//         });
//       } else {
//         // Create new primary image
//         await prisma.productImage.create({
//           data: {
//             productId,
//             imageUrl,
//             isPrimary: true,
//           },
//         });
//       }
//     }

//     return updatedProduct;
//   } catch (error) {
//     console.error('Database Error (updateProduct):', error);
//     throw new Error('Failed to update product.');
//   }
// }

























                    
// src/lib/data/products.ts

'use server';

import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/lib/prisma';
import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';


// Helper function to safely get values from FormData
function getValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  return value as string;
}

// === START ROBUST transformProduct ===
// Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
function safeToNumber(value: any): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  // If it's already a number, return it
  if (typeof value === 'number') {
    return value;
  }
  // If it's a Decimal.js object, convert it
  if (typeof value.toNumber === 'function') {
    return value.toNumber();
  }
  // If it's a string that can be parsed to a number, convert it
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  // Fallback for unexpected types
  console.warn('Unexpected type encountered during safeToNumber conversion:', value);
  return null;
}


// Helper function to transform Prisma Product type to your Product interface
function transformProduct(prismaProduct: any): Product {
  // Ensure the product object itself is not null/undefined
  if (!prismaProduct) {
    // Return null or throw an error, depending on how you want to handle null products
    console.error('transformProduct received a null or undefined prismaProduct.');
    return null as any; // Cast as any because your Promise<Product | null> signature needs it
  }

  return {
    ...prismaProduct,
    // Safely convert price using the new helper
    price: safeToNumber(prismaProduct.price) as number,
    // Safely convert weight using the new helper
    weight: safeToNumber(prismaProduct.weight), // weight can be number | null
    
    // Ensure all nested objects match your Product interface
    images: prismaProduct.images || [],
    reviews: prismaProduct.reviews || [],
    seller: prismaProduct.seller ? {
      ...prismaProduct.seller,
      user: prismaProduct.seller.user ? {
        name: prismaProduct.seller.user.name || null,
      } : undefined,
    } : undefined,
    
    // Ensure Date objects are also consistently handled (e.g., toISOString)
    // Add null/undefined checks for dates too
    creationDate: prismaProduct.creationDate ? prismaProduct.creationDate.toISOString() : new Date().toISOString(),
    lastUpdated: prismaProduct.lastUpdated ? prismaProduct.lastUpdated.toISOString() : new Date().toISOString(),
  };
}
// === END ROBUST transformProduct ===



export async function fetchFeaturedProducts(): Promise<Product[]> {
  noStore(); // Opt-out of data caching for dynamic content
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,    // Only active products
        isFeatured: true,  // Only featured products
      },
      include: {
        images: {
          where: { isPrimary: true }, // Get only the primary image
          take: 1,
        },
        seller: {
          select: {
            shopName: true,
            userId: true,
          },
        },
        reviews: true, // You might want to optimize this for a homepage display
      },
      orderBy: {
        creationDate: 'desc', // Order by newest first
      },
      take: 4, // Limit to, for example, 4 featured products for the homepage
    });
    // Map and transform each product to match the Product interface
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchFeaturedProducts):', error);
    throw new Error('Failed to fetch featured products.');
  }
}


export async function createProduct(sellerId: string, formData: FormData) {
  noStore();
  try {
    const productData: ProductFormData = {
      name: getValue(formData, 'name') || '',
      description: getValue(formData, 'description') || '',
      price: parseFloat(getValue(formData, 'price') || '0'),
      quantityAvailable: parseInt(getValue(formData, 'quantityAvailable') || '1'),
      categoryId: getValue(formData, 'categoryId'),
      materialsUsed: getValue(formData, 'materialsUsed'),
      dimensions: getValue(formData, 'dimensions'),
      weight: getValue(formData, 'weight') ? parseFloat(getValue(formData, 'weight')!) : null,
      careInstructions: getValue(formData, 'careInstructions'),
      tags: getValue(formData, 'tags'),
    };

    const product = await prisma.product.create({
      data: {
        sellerId,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantityAvailable: productData.quantityAvailable,
        categoryId: productData.categoryId || null,
        materialsUsed: productData.materialsUsed || null,
        dimensions: productData.dimensions || null,
        weight: productData.weight,
        careInstructions: productData.careInstructions || null,
        tags: productData.tags ? JSON.parse(productData.tags) : null,
      },
    });

    const imageUrl = getValue(formData, 'imageUrl');
    if (imageUrl) {
      await prisma.productImage.create({
        data: {
          productId: product.productId,
          imageUrl: imageUrl,
          isPrimary: true,
        },
      });
    }

    return transformProduct(product);
  } catch (error) {
    console.error('Database Error (createProduct):', error);
    throw new Error('Failed to create product.');
  }
}

export async function fetchProductsBySeller(sellerId: string): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        images: true,
        reviews: true,
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchProductsBySeller):', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchAllProducts(): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        seller: {
          select: {
            shopName: true,
            userId: true,
          },
        },
        reviews: true,
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchAllProducts):', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductById(productId: string): Promise<Product | null> {
  noStore();
  try {
    const product = await prisma.product.findUnique({
      where: { productId },
      include: {
        images: true,
        seller: {
          select: {
            shopName: true,
            userId: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return product ? transformProduct(product) : null;
  } catch (error) {
    console.error('Database Error (fetchProductById):', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  noStore();
  try {
    const productData: Partial<ProductFormData> = {
      name: getValue(formData, 'name') || undefined,
      description: getValue(formData, 'description') || undefined,
      price: getValue(formData, 'price') ? parseFloat(getValue(formData, 'price')!) : undefined,
      quantityAvailable: getValue(formData, 'quantityAvailable') ? parseInt(getValue(formData, 'quantityAvailable')!) : undefined,
      categoryId: getValue(formData, 'categoryId') || undefined,
      materialsUsed: getValue(formData, 'materialsUsed') || undefined,
      dimensions: getValue(formData, 'dimensions') || undefined,
      weight: getValue(formData, 'weight') ? parseFloat(getValue(formData, 'weight')!) : undefined,
      careInstructions: getValue(formData, 'careInstructions') || undefined,
      tags: getValue(formData, 'tags') || undefined,
      isFeatured: formData.has('isFeatured'),
      isActive: formData.has('isActive'),
    };

    const updatedProduct = await prisma.product.update({
      where: { productId },
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantityAvailable: productData.quantityAvailable,
        categoryId: productData.categoryId,
        materialsUsed: productData.materialsUsed,
        dimensions: productData.dimensions,
        weight: productData.weight,
        careInstructions: productData.careInstructions,
        tags: productData.tags ? JSON.parse(productData.tags) : undefined,
        lastUpdated: new Date(),
        isFeatured: productData.isFeatured,
        isActive: productData.isActive,
      },
      include: {
        images: true,
        reviews: {
          include: {
            user: {
              select: { name: true }
            }
          }
        },
        seller: {
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      }
    });

    const imageUrl = getValue(formData, 'imageUrl');
    if (imageUrl) {
      const existingPrimaryImage = await prisma.productImage.findFirst({
        where: {
          productId,
          isPrimary: true,
        },
      });

      if (existingPrimaryImage) {
        await prisma.productImage.update({
          where: { imageId: existingPrimaryImage.imageId },
          data: { imageUrl },
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId,
            imageUrl,
            isPrimary: true,
          },
        });
      }
    }

    return transformProduct(updatedProduct);
  } catch (error) {
    console.error('Database Error (updateProduct):', error);
    throw new Error('Failed to update product.');
  }
}