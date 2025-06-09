

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

























                    
// // src/lib/data/products.ts

// 'use server';

// import { unstable_noStore as noStore } from 'next/cache';
// import prisma from '@/lib/prisma';
// import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';


// // Helper function to safely get values from FormData
// function getValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   return value as string;
// }

// // === START ROBUST transformProduct ===
// // Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
// function safeToNumber(value: any): number | null {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   // If it's already a number, return it
//   if (typeof value === 'number') {
//     return value;
//   }
//   // If it's a Decimal.js object, convert it
//   if (typeof value.toNumber === 'function') {
//     return value.toNumber();
//   }
//   // If it's a string that can be parsed to a number, convert it
//   if (typeof value === 'string') {
//     const parsed = parseFloat(value);
//     return isNaN(parsed) ? null : parsed;
//   }
//   // Fallback for unexpected types
//   console.warn('Unexpected type encountered during safeToNumber conversion:', value);
//   return null;
// }


// // Helper function to transform Prisma Product type to your Product interface
// function transformProduct(prismaProduct: any): Product {
//   // Ensure the product object itself is not null/undefined
//   if (!prismaProduct) {
//     // Return null or throw an error, depending on how you want to handle null products
//     console.error('transformProduct received a null or undefined prismaProduct.');
//     return null as any; // Cast as any because your Promise<Product | null> signature needs it
//   }

//   return {
//     ...prismaProduct,
//     // Safely convert price using the new helper
//     price: safeToNumber(prismaProduct.price) as number,
//     // Safely convert weight using the new helper
//     weight: safeToNumber(prismaProduct.weight), // weight can be number | null
    
//     // Ensure all nested objects match your Product interface
//     images: prismaProduct.images || [],
//     reviews: prismaProduct.reviews || [],
//     seller: prismaProduct.seller ? {
//       ...prismaProduct.seller,
//       user: prismaProduct.seller.user ? {
//         name: prismaProduct.seller.user.name || null,
//       } : undefined,
//     } : undefined,
    
//     // Ensure Date objects are also consistently handled (e.g., toISOString)
//     // Add null/undefined checks for dates too
//     creationDate: prismaProduct.creationDate ? prismaProduct.creationDate.toISOString() : new Date().toISOString(),
//     lastUpdated: prismaProduct.lastUpdated ? prismaProduct.lastUpdated.toISOString() : new Date().toISOString(),
//   };
// }
// // === END ROBUST transformProduct ===



// export async function fetchFeaturedProducts(): Promise<Product[]> {
//   noStore(); // Opt-out of data caching for dynamic content
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         isActive: true,    // Only active products
//         isFeatured: true,  // Only featured products
//       },
//       include: {
//         images: {
//           where: { isPrimary: true }, // Get only the primary image
//           take: 1,
//         },
//         seller: {
//           select: {
//             shopName: true,
//             userId: true,
//           },
//         },
//         reviews: true, // You might want to optimize this for a homepage display
//       },
//       orderBy: {
//         creationDate: 'desc', // Order by newest first
//       },
//       take: 4, // Limit to, for example, 4 featured products for the homepage
//     });
//     // Map and transform each product to match the Product interface
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchFeaturedProducts):', error);
//     throw new Error('Failed to fetch featured products.');
//   }
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

//     const product = await prisma.product.create({
//       data: {
//         sellerId,
//         name: productData.name,
//         description: productData.description,
//         price: productData.price,
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId || null,
//         materialsUsed: productData.materialsUsed || null,
//         dimensions: productData.dimensions || null,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions || null,
//         tags: productData.tags ? JSON.parse(productData.tags) : null,
//       },
//     });

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
//     return product ? transformProduct(product) : null;
//   } catch (error) {
//     console.error('Database Error (fetchProductById):', error);
//     throw new Error('Failed to fetch product.');
//   }
// }

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
//       isFeatured: formData.has('isFeatured'),
//       isActive: formData.has('isActive'),
//     };

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
//         isFeatured: productData.isFeatured,
//         isActive: productData.isActive,
//       },
//       include: {
//         images: true,
//         reviews: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         },
//         seller: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         }
//       }
//     });

//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       const existingPrimaryImage = await prisma.productImage.findFirst({
//         where: {
//           productId,
//           isPrimary: true,
//         },
//       });

//       if (existingPrimaryImage) {
//         await prisma.productImage.update({
//           where: { imageId: existingPrimaryImage.imageId },
//           data: { imageUrl },
//         });
//       } else {
//         await prisma.productImage.create({
//           data: {
//             productId,
//             imageUrl,
//             isPrimary: true,
//           },
//         });
//       }
//     }

//     return transformProduct(updatedProduct);
//   } catch (error) {
//     console.error('Database Error (updateProduct):', error);
//     throw new Error('Failed to update product.');
//   }
// }














// =================================================================================================








// // src/lib/data/products.ts

// 'use server';

// import { unstable_noStore as noStore } from 'next/cache';
// import prisma from '@/lib/prisma';
// import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions'; // Assuming Product, etc., are defined here


// // Helper function to safely get values from FormData
// function getValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   return value as string;
// }

// // === START ROBUST transformProduct ===
// // Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
// function safeToNumber(value: any): number | null {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   // If it's already a number, return it
//   if (typeof value === 'number') {
//     return value;
//   }
//   // If it's a Decimal.js object, convert it
//   if (typeof value.toNumber === 'function') {
//     return value.toNumber();
//   }
//   // If it's a string that can be parsed to a number, convert it
//   if (typeof value === 'string') {
//     const parsed = parseFloat(value);
//     return isNaN(parsed) ? null : parsed;
//   }
//   // Fallback for unexpected types
//   console.warn('Unexpected type encountered during safeToNumber conversion:', value);
//   return null;
// }


// // Helper function to transform Prisma Product type to your Product interface
// function transformProduct(prismaProduct: any): Product {
//   // Ensure the product object itself is not null/undefined
//   if (!prismaProduct) {
//     // Return null or throw an error, depending on how you want to handle null products
//     console.error('transformProduct received a null or undefined prismaProduct.');
//     return null as any; // Cast as any because your Promise<Product | null> signature needs it
//   }

//   return {
//     ...prismaProduct,
//     // Safely convert price using the new helper
//     price: safeToNumber(prismaProduct.price) as number,
//     // Safely convert weight using the new helper
//     weight: safeToNumber(prismaProduct.weight), // weight can be number | null

//     // Ensure all nested objects match your Product interface
//     images: prismaProduct.images || [],
//     reviews: prismaProduct.reviews || [],
//     seller: prismaProduct.seller ? {
//       ...prismaProduct.seller,
//       user: prismaProduct.seller.user ? {
//         name: prismaProduct.seller.user.name || null,
//       } : undefined,
//     } : undefined,

//     // Ensure Date objects are also consistently handled (e.g., toISOString)
//     // Add null/undefined checks for dates too
//     creationDate: prismaProduct.creationDate ? prismaProduct.creationDate.toISOString() : new Date().toISOString(),
//     lastUpdated: prismaProduct.lastUpdated ? prismaProduct.lastUpdated.toISOString() : new Date().toISOString(),
//   };
// }
// // === END ROBUST transformProduct ===



// export async function fetchFeaturedProducts(): Promise<Product[]> {
//   noStore(); // Opt-out of data caching for dynamic content
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         isActive: true,    // Only active products
//         isFeatured: true,  // Only featured products
//       },
//       include: {
//         images: {
//           where: { isPrimary: true }, // Get only the primary image
//           take: 1,
//         },
//         seller: {
//           select: {
//             shopName: true,
//             userId: true,
//           },
//         },
//         reviews: true, // You might want to optimize this for a homepage display
//       },
//       orderBy: {
//         creationDate: 'desc', // Order by newest first
//       },
//       take: 4, // Limit to, for example, 4 featured products for the homepage
//     });
//     // Map and transform each product to match the Product interface
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchFeaturedProducts):', error);
//     throw new Error('Failed to fetch featured products.');
//   }
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

//     const product = await prisma.product.create({
//       data: {
//         sellerId,
//         name: productData.name,
//         description: productData.description,
//         price: productData.price,
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId || null,
//         materialsUsed: productData.materialsUsed || null,
//         dimensions: productData.dimensions || null,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions || null,
//         tags: productData.tags ? JSON.parse(productData.tags) : null,
//       },
//     });

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
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchProductsBySeller):', error);
//     throw new Error('Failed to fetch products.');
//   }
// }

// // --- NEW/MODIFIED: fetchAllProducts to support search, filter, and pagination ---
// export async function fetchAllProducts(
//   currentPage: number = 1,
//   limit: number = 12, // Number of items per page
//   searchQuery: string = '',
//   categoryId: string = '',
//   sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
// ): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
//   noStore(); // Opt-out of data caching

//   const offset = (currentPage - 1) * limit; // Calculate the offset for pagination

//   // Build the WHERE clause dynamically based on provided filters and search
//   const whereClause: any = {
//     isActive: true, // Always show only active products
//   };

//   if (searchQuery) {
//     whereClause.OR = [
//       { name: { contains: searchQuery, mode: 'insensitive' } },
//       { description: { contains: searchQuery, mode: 'insensitive' } },
//       { tags: { array_contains: [searchQuery.toLowerCase()] as any } }, 
//     ];
//   }

//   if (categoryId) {
//     whereClause.categoryId = categoryId;
//   }

//   // Build the ORDER BY clause dynamically
//   let orderByClause: any = { creationDate: 'desc' }; // Default sort
//   switch (sortBy) {
//     case 'price-asc':
//       orderByClause = { price: 'asc' };
//       break;
//     case 'price-desc':
//       orderByClause = { price: 'desc' };
//       break;
//     case 'rating':
//       // This is more complex and usually requires a raw query or a relation to reviews
//       // For simplicity, let's sort by creationDate desc if rating isn't directly sortable or needs aggregation
//       // A more robust solution might involve:
//       // 1. Storing average rating directly on the product model (updated via trigger/cron/review creation)
//       // 2. Using Prisma's aggregate functions or raw queries for ordering by average rating
//       // For now, if 'rating' is selected, we'll default to newest
//       orderByClause = { creationDate: 'desc' }; // Fallback for rating sort without direct DB column
//       break;
//     case 'newest':
//     default:
//       orderByClause = { creationDate: 'desc' };
//       break;
//   }

//   try {
//     // 1. Fetch total count for pagination
//     const totalProducts = await prisma.product.count({
//       where: whereClause,
//     });

//     // 2. Fetch products with pagination, search, and filters
//     const products = await prisma.product.findMany({
//       where: whereClause,
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
//         reviews: true, // Still including reviews, but consider optimizing if not fully needed for list view
//       },
//       orderBy: orderByClause,
//       skip: offset, // Pagination: skip
//       take: limit,  // Pagination: limit
//     });

//     const totalPages = Math.ceil(totalProducts / limit);

//     return {
//       products: products.map(transformProduct),
//       totalPages,
//       totalProducts,
//     };
//   } catch (error) {
//     console.error('Database Error (fetchAllProducts with filters):', error);
//     throw new Error('Failed to fetch products with filters.');
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
//     return product ? transformProduct(product) : null;
//   } catch (error) {
//     console.error('Database Error (fetchProductById):', error);
//     throw new Error('Failed to fetch product.');
//   }
// }

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
//       isFeatured: formData.has('isFeatured'),
//       isActive: formData.has('isActive'),
//     };

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
//         isFeatured: productData.isFeatured,
//         isActive: productData.isActive,
//       },
//       include: {
//         images: true,
//         reviews: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         },
//         seller: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         }
//       }
//     });

//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       const existingPrimaryImage = await prisma.productImage.findFirst({
//         where: {
//           productId,
//           isPrimary: true,
//         },
//       });

//       if (existingPrimaryImage) {
//         await prisma.productImage.update({
//           where: { imageId: existingPrimaryImage.imageId },
//           data: { imageUrl },
//         });
//       } else {
//         await prisma.productImage.create({
//           data: {
//             productId,
//             imageUrl,
//             isPrimary: true,
//           },
//         });
//       }
//     }

//     return transformProduct(updatedProduct);
//   } catch (error) {
//     console.error('Database Error (updateProduct):', error);
//     throw new Error('Failed to update product.');
//   }
// }



// =================================================================================================
// =================================================================================================
// =================================================================================================




// // src/lib/data/products.ts

// 'use server';

// import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions'; // Assuming Product, etc., are defined here
// import { PrismaClient } from '@prisma/client';
// import { unstable_noStore as noStore } from 'next/cache';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Import this if not already present

// const prisma = new PrismaClient();

// // Helper function to safely get values from FormData
// function getValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   return value as string;
// }

// // === START ROBUST transformProduct ===
// // Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
// function safeToNumber(value: any): number | null {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   // If it's already a number, return it
//   if (typeof value === 'number') {
//     return value;
//   }
//   // If it's a Decimal.js object, convert it
//   if (typeof value.toNumber === 'function') {
//     return value.toNumber();
//   }
//   // If it's a string that can be parsed to a number, convert it
//   if (typeof value === 'string') {
//     const parsed = parseFloat(value);
//     return isNaN(parsed) ? null : parsed;
//   }
//   // Fallback for unexpected types
//   console.warn('Unexpected type encountered during safeToNumber conversion:', value);
//   return null;
// }


// // Helper function to transform Prisma Product type to your Product interface
// function transformProduct(prismaProduct: any): Product {
//   // Ensure the product object itself is not null/undefined
//   if (!prismaProduct) {
//     // Return null or throw an error, depending on how you want to handle null products
//     console.error('transformProduct received a null or undefined prismaProduct.');
//     return null as any; // Cast as any because your Promise<Product | null> signature needs it
//   }

//   return {
//     ...prismaProduct,
//     // Safely convert price using the new helper
//     price: safeToNumber(prismaProduct.price) as number,
//     // Safely convert weight using the new helper
//     weight: safeToNumber(prismaProduct.weight), // weight can be number | null

//     // Ensure all nested objects match your Product interface
//     images: prismaProduct.images || [],
//     reviews: prismaProduct.reviews || [],
//     seller: prismaProduct.seller ? {
//       ...prismaProduct.seller,
//       user: prismaProduct.seller.user ? {
//         name: prismaProduct.seller.user.name || null,
//       } : undefined,
//     } : undefined,

//     // Ensure Date objects are also consistently handled (e.g., toISOString)
//     // Add null/undefined checks for dates too
//     creationDate: prismaProduct.creationDate ? prismaProduct.creationDate.toISOString() : new Date().toISOString(),
//     lastUpdated: prismaProduct.lastUpdated ? prismaProduct.lastUpdated.toISOString() : new Date().toISOString(),
//   };
// }
// // === END ROBUST transformProduct ===



// export async function fetchFeaturedProducts(): Promise<Product[]> {
//   noStore(); // Opt-out of data caching for dynamic content
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         isActive: true,    // Only active products
//         isFeatured: true,  // Only featured products
//       },
//       include: {
//         images: {
//           where: { isPrimary: true }, // Get only the primary image
//           take: 1,
//         },
//         seller: {
//           select: {
//             shopName: true,
//             userId: true,
//           },
//         },
//         reviews: true, // You might want to optimize this for a homepage display
//       },
//       orderBy: {
//         creationDate: 'desc', // Order by newest first
//       },
//       take: 4, // Limit to, for example, 4 featured products for the homepage
//     });
//     // Map and transform each product to match the Product interface
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchFeaturedProducts):', error);
//     throw new Error('Failed to fetch featured products.');
//   }
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

//     const product = await prisma.product.create({
//       data: {
//         sellerId,
//         name: productData.name,
//         description: productData.description,
//         price: productData.price,
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId || null,
//         materialsUsed: productData.materialsUsed || null,
//         dimensions: productData.dimensions || null,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions || null,
//         tags: productData.tags ? JSON.parse(productData.tags) : null,
//       },
//     });

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
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchProductsBySeller):', error);
//     throw new Error('Failed to fetch products.');
//   }
// }

// // --- NEW/MODIFIED: fetchAllProducts to support search, filter, and pagination ---
// export async function fetchAllProducts(
//   currentPage: number = 1,
//   limit: number = 12, // Number of items per page
//   searchQuery: string = '',
//   categoryId: string = '',
//   sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
// ): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
//   noStore(); // Opt-out of data caching

//   const offset = (currentPage - 1) * limit; // Calculate the offset for pagination

//   // Build the WHERE clause dynamically based on provided filters and search
//   const whereClause: any = {
//     isActive: true, // Always show only active products
//   };

//   if (searchQuery) {
//     whereClause.OR = [
//       { name: { contains: searchQuery, mode: 'insensitive' } },
//       { description: { contains: searchQuery, mode: 'insensitive' } },
//       { tags: { array_contains: [searchQuery.toLowerCase()] as any } }, 
//     ];
//   }

//   if (categoryId) {
//     whereClause.categoryId = categoryId;
//   }

//   // Build the ORDER BY clause dynamically
//   let orderByClause: any = { creationDate: 'desc' }; // Default sort
//   switch (sortBy) {
//     case 'price-asc':
//       orderByClause = { price: 'asc' };
//       break;
//     case 'price-desc':
//       orderByClause = { price: 'desc' };
//       break;
//     case 'rating':
//       // This is more complex and usually requires a raw query or a relation to reviews
//       // For simplicity, let's sort by creationDate desc if rating isn't directly sortable or needs aggregation
//       // A more robust solution might involve:
//       // 1. Storing average rating directly on the product model (updated via trigger/cron/review creation)
//       // 2. Using Prisma's aggregate functions or raw queries for ordering by average rating
//       // For now, if 'rating' is selected, we'll default to newest
//       orderByClause = { creationDate: 'desc' }; // Fallback for rating sort without direct DB column
//       break;
//     case 'newest':
//     default:
//       orderByClause = { creationDate: 'desc' };
//       break;
//   }

//   try {
//     // 1. Fetch total count for pagination
//     const totalProducts = await prisma.product.count({
//       where: whereClause,
//     });

//     // 2. Fetch products with pagination, search, and filters
//     const products = await prisma.product.findMany({
//       where: whereClause,
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
//         reviews: true, // Still including reviews, but consider optimizing if not fully needed for list view
//       },
//       orderBy: orderByClause,
//       skip: offset, // Pagination: skip
//       take: limit,  // Pagination: limit
//     });

//     const totalPages = Math.ceil(totalProducts / limit);

//     return {
//       products: products.map(transformProduct),
//       totalPages,
//       totalProducts,
//     };
//   } catch (error) {
//     console.error('Database Error (fetchAllProducts with filters):', error);
//     throw new Error('Failed to fetch products with filters.');
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
//     return product ? transformProduct(product) : null;
//   } catch (error) {
//     console.error('Database Error (fetchProductById):', error);
//     throw new Error('Failed to fetch product.');
//   }
// }

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
//       isFeatured: formData.has('isFeatured'),
//       isActive: formData.has('isActive'),
//     };

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
//         isFeatured: productData.isFeatured,
//         isActive: productData.isActive,
//       },
//       include: {
//         images: true,
//         reviews: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         },
//         seller: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         }
//       }
//     });

//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       const existingPrimaryImage = await prisma.productImage.findFirst({
//         where: {
//           productId,
//           isPrimary: true,
//         },
//       });

//       if (existingPrimaryImage) {
//         await prisma.productImage.update({
//           where: { imageId: existingPrimaryImage.imageId },
//           data: { imageUrl },
//         });
//       } else {
//         await prisma.productImage.create({
//           data: {
//             productId,
//             imageUrl,
//             isPrimary: true,
//           },
//         });
//       }
//     }

//     return transformProduct(updatedProduct);
//   } catch (error) {
//     console.error('Database Error (updateProduct):', error);
//     throw new Error('Failed to update product.');
//   }
// }



// // NEW FUNCTION: Fetch the average rating for all products by a specific artisan
// export async function fetchArtisanAverageRating(artisanUserId: string): Promise<number | null> {
//   noStore(); // Prevents caching
//   try {
//     const result = await prisma.review.aggregate({
//       where: {
//         product: {
//           sellerId: artisanUserId,
//         },
//         isApproved: true, // Only consider approved reviews
//       },
//       _avg: {
//         rating: true,
//       },
//     });

//     // Return the average rating, null if no reviews. Use .rating for Float or null
//     return result._avg.rating ?? null; // Use nullish coalescing to return null if no average is found
//   } catch (error) {
//     console.error('Database Error (fetchArtisanAverageRating):', error);
//     // Return null or rethrow a more specific error, depending on desired error handling
//     return null; // Fallback to null to indicate an error or no data
//   }
// }

// // NEW FUNCTION: Delete a product
// export async function deleteProduct(productId: string): Promise<{ message: string }> {
//   noStore(); // Prevents caching
//   try {
//     // Delete associated images first (if cascade delete is not set up on images,
//     // though your schema shows onDelete: Cascade for images)
//     await prisma.productImage.deleteMany({
//       where: { productId: productId },
//     });

//     // Delete the product itself
//     await prisma.product.delete({
//       where: { productId: productId },
//     });
    
//     return { message: 'Product deleted successfully.' };
//   } catch (error) {
//     console.error('Database Error (deleteProduct):', error);
//     if (error instanceof PrismaClientKnownRequestError) {
//       if (error.code === 'P2025') { // Record to delete does not exist
//         return { message: 'Product not found or already deleted.' };
//       }
//       return { message: `Database error deleting product: ${error.message}` };
//     }
//     return { message: 'Failed to delete product: An unexpected error occurred.' };
//   }
// }






















// // src/lib/data/products.ts

// 'use server';

// import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';
// import { PrismaClient } from '@prisma/client';
// import { unstable_noStore as noStore } from 'next/cache';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Ensure this is imported
// import { Prisma } from '@prisma/client'; // Import Prisma for type inference for productQuerySelection

// const prisma = new PrismaClient();

// // Helper function to safely get values from FormData
// function getValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   return value as string;
// }

// // Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
// function safeToNumber(value: any): number | null {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   if (typeof value === 'number') {
//     return value;
//   }
//   if (typeof value.toNumber === 'function') {
//     return value.toNumber();
//   }
//   if (typeof value === 'string') {
//     const parsed = parseFloat(value);
//     return isNaN(parsed) ? null : parsed;
//   }
//   console.warn('Unexpected type encountered during safeToNumber conversion:', value);
//   return null;
// }

// // Helper function to transform Prisma Product type to your Product interface
// function transformProduct(prismaProduct: any): Product {
//   if (!prismaProduct) {
//     console.error('transformProduct received a null or undefined prismaProduct.');
//     return null as any;
//   }

//   return {
//     ...prismaProduct,
//     price: safeToNumber(prismaProduct.price) as number,
//     weight: safeToNumber(prismaProduct.weight),

//     images: prismaProduct.images || [],
//     reviews: prismaProduct.reviews || [],
//     seller: prismaProduct.seller ? {
//       ...prismaProduct.seller,
//       user: prismaProduct.seller.user ? {
//         name: prismaProduct.seller.user.name || null,
//       } : undefined,
//     } : undefined,

//     // Ensure dates are correctly handled. If your Product interface expects Date objects, keep them.
//     // If it expects ISO strings (which is common for JSON transmission), convert them here.
//     // Based on your `definitions.ts`, `creationDate` and `lastUpdated` are `Date`.
//     // So, we should return Date objects and handle ISO string conversion in the UI if needed.
//     creationDate: prismaProduct.creationDate,
//     lastUpdated: prismaProduct.lastUpdated,
//   };
// }

// export async function fetchFeaturedProducts(): Promise<Product[]> {
//   noStore();
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         isActive: true,
//         isFeatured: true,
//       },
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
//       take: 4,
//     });
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchFeaturedProducts):', error);
//     throw new Error('Failed to fetch featured products.');
//   }
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
//       imageUrl: getValue(formData, 'imageUrl'),
//       // FIX: Correctly extract isFeatured and isActive from FormData.
//       // Checkboxes send a value only if checked. formData.has() is the correct way.
//       isFeatured: formData.has('isFeatured'),
//       isActive: formData.has('isActive'),
//     };

//     const product = await prisma.product.create({
//       data: {
//         sellerId,
//         name: productData.name,
//         description: productData.description,
//         price: productData.price,
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId || null,
//         materialsUsed: productData.materialsUsed || null,
//         dimensions: productData.dimensions || null,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions || null,
//         tags: productData.tags ? JSON.parse(productData.tags) : null,
//         isFeatured: productData.isFeatured, // FIX: Pass the extracted boolean value
//         isActive: productData.isActive,     // FIX: Pass the extracted boolean value
//       },
//     });

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
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchProductsBySeller):', error);
//     throw new Error('Failed to fetch products.');
//   }
// }

// // Prisma selector for common product includes to avoid repetition
// const productQuerySelection = Prisma.validator<Prisma.ProductDefaultArgs>()({
//   include: {
//     images: {
//       where: { isPrimary: true },
//       take: 1,
//     },
//     seller: {
//       select: {
//         shopName: true,
//         userId: true,
//       },
//     },
//     reviews: true, // Still including reviews to calculate average rating for ProductCard
//   },
// });

// export async function fetchAllProducts(
//   currentPage: number = 1,
//   limit: number = 12,
//   searchQuery: string = '',
//   categoryId: string = '',
//   sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
// ): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
//   noStore();

//   const offset = (currentPage - 1) * limit;

//   const whereClause: any = {
//     isActive: true,
//   };

//   if (searchQuery) {
//     whereClause.OR = [
//       { name: { contains: searchQuery, mode: 'insensitive' } },
//       { description: { contains: searchQuery, mode: 'insensitive' } },
//       { tags: { array_contains: [searchQuery.toLowerCase()] as any } },
//     ];
//   }

//   if (categoryId) {
//     whereClause.categoryId = categoryId;
//   }

//   let orderByClause: any = { creationDate: 'desc' };
//   switch (sortBy) {
//     case 'price-asc':
//       orderByClause = { price: 'asc' };
//       break;
//     case 'price-desc':
//       orderByClause = { price: 'desc' };
//       break;
//     case 'rating':
//       orderByClause = { creationDate: 'desc' };
//       break;
//     case 'newest':
//     default:
//       orderByClause = { creationDate: 'desc' };
//       break;
//   }

//   try {
//     const totalProducts = await prisma.product.count({
//       where: whereClause,
//     });

//     const products = await prisma.product.findMany({
//       where: whereClause,
//       ...productQuerySelection, // Use the predefined selection
//       orderBy: orderByClause,
//       skip: offset,
//       take: limit,
//     });

//     const totalPages = Math.ceil(totalProducts / limit);

//     return {
//       products: products.map(transformProduct),
//       totalPages,
//       totalProducts,
//     };
//   } catch (error) {
//     console.error('Database Error (fetchAllProducts with filters):', error);
//     throw new Error('Failed to fetch products with filters.');
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
//     return product ? transformProduct(product) : null;
//   } catch (error) {
//     console.error('Database Error (fetchProductById):', error);
//     throw new Error('Failed to fetch product.');
//   }
// }

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
//       isFeatured: formData.has('isFeatured'), // This is correct for update
//       isActive: formData.has('isActive'),     // This is correct for update
//     };

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
//         isFeatured: productData.isFeatured,
//         isActive: productData.isActive,
//       },
//       include: {
//         images: true,
//         reviews: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         },
//         seller: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         }
//       }
//     });

//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       const existingPrimaryImage = await prisma.productImage.findFirst({
//         where: {
//           productId,
//           isPrimary: true,
//         },
//       });

//       if (existingPrimaryImage) {
//         await prisma.productImage.update({
//           where: { imageId: existingPrimaryImage.imageId },
//           data: { imageUrl },
//         });
//       } else {
//         await prisma.productImage.create({
//           data: {
//             productId,
//             imageUrl,
//             isPrimary: true,
//           },
//         });
//       }
//     }

//     return transformProduct(updatedProduct);
//   } catch (error) {
//     console.error('Database Error (updateProduct):', error);
//     throw new Error('Failed to update product.');
//   }
// }

// export async function fetchSellerAverageRating(sellerId: string): Promise<{ averageRating: number; reviewCount: number }> {
//   noStore();
//   try {
//     const result = await prisma.review.aggregate({
//       _avg: { rating: true },
//       _count: { reviewId: true },
//       where: {
//         product: {
//           sellerId: sellerId,
//         },
//         isApproved: true,
//       },
//     });

//     const averageRating = result._avg.rating ? parseFloat(result._avg.rating.toFixed(1)) : 0;
//     const reviewCount = result._count.reviewId || 0;

//     return { averageRating, reviewCount };
//   } catch (error) {
//     console.error('Database Error (fetchSellerAverageRating):', error);
//     throw new Error('Failed to fetch seller average rating.');
//   }
// }

// export async function deleteProduct(productId: string): Promise<{ message: string }> {
//   noStore();
//   try {
//     await prisma.productImage.deleteMany({
//       where: { productId: productId },
//     });

//     await prisma.product.delete({
//       where: { productId: productId },
//     });
    
//     return { message: 'Product deleted successfully.' };
//   } catch (error) {
//     console.error('Database Error (deleteProduct):', error);
//     if (error instanceof PrismaClientKnownRequestError) {
//       if (error.code === 'P2025') {
//         return { message: 'Product not found or already deleted.' };
//       }
//     }
//     return { message: 'Failed to delete product: An unexpected error occurred.' };
//   }
// }





















// // src/lib/data/products.ts

// 'use server';

// import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';
// import { PrismaClient } from '@prisma/client';
// import { unstable_noStore as noStore } from 'next/cache';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { Prisma } from '@prisma/client';

// const prisma = new PrismaClient();

// // Helper function to safely get values from FormData
// function getValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   return value as string;
// }

// // Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
// function safeToNumber(value: any): number | null {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   if (typeof value === 'number') {
//     return value;
//   }
//   if (typeof value.toNumber === 'function') {
//     return value.toNumber();
//   }
//   if (typeof value === 'string') {
//     const parsed = parseFloat(value);
//     return isNaN(parsed) ? null : parsed;
//   }
//   console.warn('Unexpected type encountered during safeToNumber conversion:', value);
//   return null;
// }

// // Helper function to transform Prisma Product type to your Product interface
// function transformProduct(prismaProduct: any): Product {
//   if (!prismaProduct) {
//     console.error('transformProduct received a null or undefined prismaProduct.');
//     return null as any; // Or throw an error, depending on desired strictness
//   }

//   return {
//     // Dynamically spread properties, this will include properties like productId, name, etc.
//     ...prismaProduct,
//     // Explicitly cast or transform specific properties if needed
//     price: safeToNumber(prismaProduct.price) as number,
//     weight: safeToNumber(prismaProduct.weight),

//     // Ensure array properties are handled correctly, defaulting to empty array if null/undefined
//     images: prismaProduct.images || [],
//     reviews: prismaProduct.reviews || [],

//     // Crucial for the 'seller' info:
//     seller: prismaProduct.seller ? {
//       // Assuming seller in your Product interface matches Prisma's ArtisanProfile
//       // And if ArtisanProfile has a 'user' relation with 'name'
//       ...prismaProduct.seller,
//       user: prismaProduct.seller.user ? {
//         name: prismaProduct.seller.user.name || null,
//       } : undefined,
//     } : undefined,

//     // Ensure dates are correctly handled. Prisma returns Date objects.
//     // If your Product interface expects Date objects, this is correct.
//     creationDate: prismaProduct.creationDate,
//     lastUpdated: prismaProduct.lastUpdated,
//   };
// }


// export async function fetchFeaturedProducts(): Promise<Product[]> {
//   noStore();
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         isActive: true,
//         isFeatured: true,
//       },
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
//       take: 4,
//     });
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchFeaturedProducts):', error);
//     throw new Error('Failed to fetch featured products.');
//   }
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
//       imageUrl: getValue(formData, 'imageUrl'),
//       isFeatured: formData.has('isFeatured'),
//       isActive: formData.has('isActive'),
//     };

//     const product = await prisma.product.create({
//       data: {
//         sellerId,
//         name: productData.name,
//         description: productData.description,
//         price: productData.price,
//         quantityAvailable: productData.quantityAvailable,
//         categoryId: productData.categoryId || null,
//         materialsUsed: productData.materialsUsed || null,
//         dimensions: productData.dimensions || null,
//         weight: productData.weight,
//         careInstructions: productData.careInstructions || null,
//         tags: productData.tags ? JSON.parse(productData.tags) : null,
//         isFeatured: productData.isFeatured,
//         isActive: productData.isActive,
//       },
//     });

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

//     return transformProduct(product);
//   } catch (error) {
//     console.error('Database Error (createProduct):', error);
//     throw new Error('Failed to create product.');
//   }
// }

// // Existing fetchProductsBySeller - REMAINS UNCHANGED
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
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchProductsBySeller):', error);
//     throw new Error('Failed to fetch products.');
//   }
// }

// // *** NEW FUNCTION FOR ARTISAN PROFILE PAGE ***
// export async function fetchProductsBySellerWithShopInfo(sellerId: string): Promise<Product[]> {
//   noStore();
//   try {
//     const products = await prisma.product.findMany({
//       where: { sellerId },
//       include: {
//         images: true,
//         reviews: true,
//         // *** ADDING SELLER INCLUDE HERE ***
//         seller: { // Assuming 'seller' is the relation name in your Prisma schema
//           select: {
//             shopName: true,
//             userId: true, // It's good practice to include the ID for consistency
//           },
//         },
//       },
//       orderBy: {
//         creationDate: 'desc',
//       },
//     });
//     // Ensure transformProduct can handle the included seller data
//     return products.map(transformProduct);
//   } catch (error) {
//     console.error('Database Error (fetchProductsBySellerWithShopInfo):', error);
//     throw new Error('Failed to fetch products for artisan with shop info.');
//   }
// }

// // Prisma selector for common product includes to avoid repetition
// const productQuerySelection = Prisma.validator<Prisma.ProductDefaultArgs>()({
//   include: {
//     images: {
//       where: { isPrimary: true },
//       take: 1,
//     },
//     seller: {
//       select: {
//         shopName: true,
//         userId: true,
//       },
//     },
//     reviews: true,
//   },
// });




// // export async function fetchAllProducts(
// //   currentPage: number = 1,
// //   limit: number = 12,
// //   searchQuery: string = '',
// //   categoryId: string = '',
// //   sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
// // ): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
// //   noStore();

// //   const offset = (currentPage - 1) * limit;

// //   const whereClause: any = {
// //     isActive: true,
// //   };

// //   if (searchQuery) {
// //     whereClause.OR = [
// //       { name: { contains: searchQuery, mode: 'insensitive' } },
// //       { description: { contains: searchQuery, mode: 'insensitive' } },
// //       { tags: { has: searchQuery.toLowerCase() } }, // Use 'has' for Array<String> contains
// //     ];
// //   }

// //   if (categoryId) {
// //     whereClause.categoryId = categoryId;
// //   }

// //   let orderByClause: any = { creationDate: 'desc' };
// //   switch (sortBy) {
// //     case 'price-asc':
// //       orderByClause = { price: 'asc' };
// //       break;
// //     case 'price-desc':
// //       orderByClause = { price: 'desc' };
// //       break;
// //     case 'rating':
// //       // For rating, you might need to calculate average rating from reviews and order by that.
// //       // This often requires a more complex query or post-processing.
// //       // For now, we'll keep the default order or you can implement complex aggregation in Prisma.
// //       orderByClause = { creationDate: 'desc' }; // Defaulting for simplicity for now
// //       break;
// //     case 'newest':
// //     default:
// //       orderByClause = { creationDate: 'desc' };
// //       break;
// //   }

// //   try {
// //     const totalProducts = await prisma.product.count({
// //       where: whereClause,
// //     });

// //     const products = await prisma.product.findMany({
// //       where: whereClause,
// //       ...productQuerySelection,
// //       orderBy: orderByClause,
// //       skip: offset,
// //       take: limit,
// //     });

// //     const totalPages = Math.ceil(totalProducts / limit);

// //     return {
// //       products: products.map(transformProduct),
// //       totalPages,
// //       totalProducts,
// //     };
// //   } catch (error) {
// //     console.error('Database Error (fetchAllProducts with filters):', error);
// //     throw new Error('Failed to fetch products with filters.');
// //   }
// // }

// export async function fetchAllProducts(
//   currentPage: number = 1,
//   limit: number = 12,
//   searchQuery: string = '',
//   categoryId: string = '',
//   sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
// ): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
//   noStore();

//   const offset = (currentPage - 1) * limit;

//   const conditions: Prisma.Sql[] = [
//     Prisma.sql`P."is_active" = TRUE`,
//   ];

//   if (searchQuery) {
//     const lowerCaseSearchQuery = searchQuery.toLowerCase();
//     conditions.push(
//       Prisma.sql`
//         (
//           P.name ILIKE ${'%' + lowerCaseSearchQuery + '%'} OR
//           P.description ILIKE ${'%' + lowerCaseSearchQuery + '%'} OR
//           P.tags::jsonb ?| array[${lowerCaseSearchQuery}]
//         )
//       `
//     );
//   }

//   if (categoryId) {
//     conditions.push(Prisma.sql`P."category_id" = ${categoryId}::uuid`);
//   }

//   let orderBySql: Prisma.Sql;
//   switch (sortBy) {
//     case 'price-asc':
//       orderBySql = Prisma.sql`P.price ASC`;
//       break;
//     case 'price-desc':
//       orderBySql = Prisma.sql`P.price DESC`;
//       break;
//     case 'rating':
//       orderBySql = Prisma.sql`P."average_rating" DESC NULLS LAST, P."review_count" DESC`;
//       break;
//     case 'newest':
//     default:
//       orderBySql = Prisma.sql`P."creation_date" DESC`;
//       break;
//   }

//   try {
//     const totalProductsResult = await prisma.$queryRaw<{ count: bigint }[]>(Prisma.sql`
//       SELECT COUNT(P."product_id")::bigint AS count
//       FROM "public"."products" AS P
//       WHERE ${Prisma.join(conditions, ' AND ')}
//     `);
//     const totalProducts = Number(totalProductsResult[0]?.count || 0);

//     const products = await prisma.$queryRaw<any[]>(Prisma.sql`
//       SELECT
//         P."product_id", P.name, P.description, P.price, P."quantity_available",
//         P."is_featured", P."is_active", P."creation_date", P."last_updated",
//         P."materials_used", P.dimensions, P.weight, P."care_instructions", P.tags,
//         P."search_vector",
//         P."average_rating",
//         P."review_count",
//         P."seller_id", P."category_id",
//         -- Correctly select seller information, ensuring it's not NULL
//         "seller"."shop_name" AS seller_shopName,
//         "seller"."user_id" AS seller_userId,
//         (SELECT json_agg(json_build_object('imageId', "img"."image_id", 'imageUrl', "img"."image_url", 'isPrimary', "img"."is_primary", 'altText', "img"."alt_text", 'displayOrder', "img"."display_order", 'createdAt', "img"."created_at"))
//          FROM "public"."product_images" AS img
//          WHERE img."product_id" = P."product_id" AND img."is_primary" = TRUE LIMIT 1) AS images_json,
//         (SELECT json_agg(json_build_object('reviewId', R."review_id", 'rating', R.rating, 'title', R.title, 'comment', R.comment, 'reviewDate', R."review_date", 'isApproved', R."is_approved", 'helpfulCount', R."helpful_count", 'updatedAt', R."updated_at", 'userId', R."user_id"))
//          FROM "public"."reviews" AS R
//          WHERE R."product_id" = P."product_id") AS reviews_json
//       FROM "public"."products" AS P
//       LEFT JOIN "public"."artisan_profiles" AS seller ON P."seller_id" = seller."user_id"
//       WHERE ${Prisma.join(conditions, ' AND ')}
//       ORDER BY ${orderBySql}
//       LIMIT ${limit} OFFSET ${offset}
//     `);

//     const transformedProducts = products.map((rawProduct: any) => {
//       const images = rawProduct.images_json || [];
//       const reviews = rawProduct.reviews_json || [];

//       // Reconstruct seller object to match Product['seller'] type
//       const sellerData = rawProduct.seller_shopName // If shopName exists, seller exists
//         ? {
//             shopName: String(rawProduct.seller_shopName), // Ensure string type
//             userId: String(rawProduct.seller_userId),   // Ensure string type
//             // user: rawProduct.seller_userName ? { name: String(rawProduct.seller_userName) } : undefined, // If fetching user name
//           }
//         : undefined; // Product['seller'] expects undefined if no seller, not null

//       return {
//         productId: String(rawProduct.product_id), // Ensure string
//         sellerId: String(rawProduct.seller_id),   // Ensure string
//         categoryId: rawProduct.category_id ? String(rawProduct.category_id) : null, // Ensure string or null
//         name: String(rawProduct.name),
//         description: String(rawProduct.description),
//         price: Number(rawProduct.price),
//         quantityAvailable: Number(rawProduct.quantity_available),
//         isFeatured: Boolean(rawProduct.is_featured),
//         isActive: Boolean(rawProduct.is_active),
//         creationDate: new Date(rawProduct.creation_date),
//         lastUpdated: new Date(rawProduct.last_updated),
//         materialsUsed: rawProduct.materials_used !== null ? String(rawProduct.materials_used) : null,
//         dimensions: rawProduct.dimensions !== null ? String(rawProduct.dimensions) : null,
//         weight: rawProduct.weight !== null ? Number(rawProduct.weight) : null,
//         careInstructions: rawProduct.care_instructions !== null ? String(rawProduct.care_instructions) : null,
//         tags: rawProduct.tags, // Already handled as JS array/object
//         searchVector: rawProduct.search_vector !== null ? String(rawProduct.search_vector) : null,
//         averageRating: Number(rawProduct.average_rating),
//         reviewCount: Number(rawProduct.review_count),
//         seller: sellerData, // Assign the correctly typed seller object
//         images: images,
//         reviews: reviews,
//       };
//     });

//     const totalPages = Math.ceil(totalProducts / limit);

//     return {
//       products: transformedProducts,
//       totalPages,
//       totalProducts,
//     };
//   } catch (error) {
//     console.error('Database Error (fetchAllProducts with filters):', error);
//     throw new Error('Failed to fetch products with filters.');
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
//     return product ? transformProduct(product) : null;
//   } catch (error) {
//     console.error('Database Error (fetchProductById):', error);
//     throw new Error('Failed to fetch product.');
//   }
// }

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
//       isFeatured: formData.has('isFeatured'),
//       isActive: formData.has('isActive'),
//     };

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
//         isFeatured: productData.isFeatured,
//         isActive: productData.isActive,
//       },
//       include: {
//         images: true,
//         reviews: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         },
//         seller: {
//           include: {
//             user: {
//               select: { name: true }
//             }
//           }
//         }
//       }
//     });

//     const imageUrl = getValue(formData, 'imageUrl');
//     if (imageUrl) {
//       const existingPrimaryImage = await prisma.productImage.findFirst({
//         where: {
//           productId,
//           isPrimary: true,
//         },
//       });

//       if (existingPrimaryImage) {
//         await prisma.productImage.update({
//           where: { imageId: existingPrimaryImage.imageId },
//           data: { imageUrl },
//         });
//       } else {
//         await prisma.productImage.create({
//           data: {
//             productId,
//             imageUrl,
//             isPrimary: true,
//           },
//         });
//       }
//     }

//     return transformProduct(updatedProduct);
//   } catch (error) {
//     console.error('Database Error (updateProduct):', error);
//     throw new Error('Failed to update product.');
//   }
// }

// export async function fetchSellerAverageRating(sellerId: string): Promise<{ averageRating: number; reviewCount: number }> {
//   noStore();
//   try {
//     const result = await prisma.review.aggregate({
//       _avg: { rating: true },
//       _count: { reviewId: true },
//       where: {
//         product: {
//           sellerId: sellerId,
//         },
//         isApproved: true,
//       },
//     });

//     const averageRating = result._avg.rating ? parseFloat(result._avg.rating.toFixed(1)) : 0;
//     const reviewCount = result._count.reviewId || 0;

//     return { averageRating, reviewCount };
//   } catch (error) {
//     console.error('Database Error (fetchSellerAverageRating):', error);
//     throw new Error('Failed to fetch seller average rating.');
//   }
// }

// export async function deleteProduct(productId: string): Promise<{ message: string }> {
//   noStore();
//   try {
//     await prisma.productImage.deleteMany({
//       where: { productId: productId },
//     });

//     await prisma.product.delete({
//       where: { productId: productId },
//     });
    
//     return { message: 'Product deleted successfully.' };
//   } catch (error) {
//     console.error('Database Error (deleteProduct):', error);
//     if (error instanceof PrismaClientKnownRequestError) {
//       if (error.code === 'P2025') {
//         return { message: 'Product not found or already deleted.' };
//       }
//     }
//     return { message: 'Failed to delete product: An unexpected error occurred.' };
//   }
// }



















// src/lib/data/products.ts

'use server';

import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';
import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to safely get values from FormData
function getValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  return value as string;
}

// Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
function safeToNumber(value: any): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value.toNumber === 'function') {
    return value.toNumber();
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  console.warn('Unexpected type encountered during safeToNumber conversion:', value);
  return null;
}

// Helper function to transform Prisma Product type to your Product interface
function transformProduct(prismaProduct: any): Product {
  if (!prismaProduct) {
    console.error('transformProduct received a null or undefined prismaProduct.');
    return null as any; // Or throw an error, depending on desired strictness
  }

  // Ensure necessary properties are always present for Product interface,
  // even if they might be missing or null from Prisma's partial selects.
  // This helps maintain consistency with the Product type.
  const transformed: Product = {
    productId: prismaProduct.productId,
    sellerId: prismaProduct.sellerId,
    categoryId: prismaProduct.categoryId || null,
    name: prismaProduct.name,
    description: prismaProduct.description,
    price: safeToNumber(prismaProduct.price) as number,
    quantityAvailable: prismaProduct.quantityAvailable,
    isFeatured: prismaProduct.isFeatured,
    isActive: prismaProduct.isActive,
    creationDate: prismaProduct.creationDate,
    lastUpdated: prismaProduct.lastUpdated,
    materialsUsed: prismaProduct.materialsUsed || null,
    dimensions: prismaProduct.dimensions || null,
    weight: safeToNumber(prismaProduct.weight),
    careInstructions: prismaProduct.careInstructions || null,
    tags: prismaProduct.tags || null,
    searchVector: prismaProduct.searchVector || null,
    averageRating: prismaProduct.averageRating || 0, // Default to 0 if null
    reviewCount: prismaProduct.reviewCount || 0,   // Default to 0 if null
    images: prismaProduct.images || [],
    reviews: prismaProduct.reviews || [],
    
    // Crucial for the 'seller' info:
    seller: prismaProduct.seller ? {
      // Assuming seller in your Product interface matches Prisma's ArtisanProfile
      // And if ArtisanProfile has a 'user' relation with 'name'
      shopName: prismaProduct.seller.shopName || '', // Ensure it's a string, default empty
      userId: prismaProduct.seller.userId,
      user: prismaProduct.seller.user ? {
        name: prismaProduct.seller.user.name || null,
      } : undefined,
    } : undefined,
  };
  return transformed;
}


export async function fetchFeaturedProducts(): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
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
      take: 4,
    });
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
      // imageUrl: getValue(formData, 'imageUrl'), // This field is not in ProductFormData schema, handled separately
      isFeatured: formData.has('isFeatured'),
      isActive: formData.has('isActive'),
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
        isFeatured: productData.isFeatured,
        isActive: productData.isActive,
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

    // You might want to fetch the created product with its relations here
    // for a complete return value, otherwise transformProduct won't have images/reviews/seller
    const createdProductWithRelations = await prisma.product.findUnique({
      where: { productId: product.productId },
      include: productQuerySelection.include, // Re-use the common selection
    });

    return createdProductWithRelations ? transformProduct(createdProductWithRelations) : null;
  } catch (error) {
    console.error('Database Error (createProduct):', error);
    throw new Error('Failed to create product.');
  }
}

// Existing fetchProductsBySeller - REMAINS UNCHANGED
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

// *** NEW FUNCTION FOR ARTISAN PROFILE PAGE ***
export async function fetchProductsBySellerWithShopInfo(sellerId: string): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        images: true,
        reviews: true,
        // *** ADDING SELLER INCLUDE HERE ***
        seller: { // Assuming 'seller' is the relation name in your Prisma schema
          select: {
            shopName: true,
            userId: true, // It's good practice to include the ID for consistency
          },
        },
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
    // Ensure transformProduct can handle the included seller data
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchProductsBySellerWithShopInfo):', error);
    throw new Error('Failed to fetch products for artisan with shop info.');
  }
}

// Prisma selector for common product includes to avoid repetition
const productQuerySelection = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    images: {
      where: { isPrimary: true },
      take: 1,
    },
    seller: {
      select: {
        shopName: true,
        userId: true,
        user: { // Including user name for seller, as per Product interface
          select: {
            name: true,
          }
        }
      },
    },
    reviews: true,
  },
});


export async function fetchAllProducts(
  currentPage: number = 1,
  limit: number = 12,
  searchQuery: string = '',
  categoryId: string = '',
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  noStore();

  const offset = (currentPage - 1) * limit;

  const conditions: Prisma.Sql[] = [
    Prisma.sql`P."is_active" = TRUE`,
  ];

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    conditions.push(
      Prisma.sql`
        (
          P.name ILIKE ${'%' + lowerCaseSearchQuery + '%'} OR
          P.description ILIKE ${'%' + lowerCaseSearchQuery + '%'} OR
          P.tags::jsonb ?| array[${lowerCaseSearchQuery}]
        )
      `
    );
  }

  if (categoryId) {
    conditions.push(Prisma.sql`P."category_id" = ${categoryId}::uuid`);
  }

  let orderBySql: Prisma.Sql;
  switch (sortBy) {
    case 'price-asc':
      orderBySql = Prisma.sql`P.price ASC`;
      break;
    case 'price-desc':
      orderBySql = Prisma.sql`P.price DESC`;
      break;
    case 'rating':
      orderBySql = Prisma.sql`P."average_rating" DESC NULLS LAST, P."review_count" DESC`;
      break;
    case 'newest':
    default:
      orderBySql = Prisma.sql`P."creation_date" DESC`;
      break;
  }

  try {
    const totalProductsResult = await prisma.$queryRaw<{ count: bigint }[]>(Prisma.sql`
      SELECT COUNT(P."product_id")::bigint AS count
      FROM "public"."products" AS P
      WHERE ${Prisma.join(conditions, ' AND ')}
    `);
    const totalProducts = Number(totalProductsResult[0]?.count || 0);

    const rawProducts = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT
        P."product_id", P.name, P.description, P.price, P."quantity_available",
        P."is_featured", P."is_active", P."creation_date", P."last_updated",
        P."materials_used", P.dimensions, P.weight, P."care_instructions", P.tags,
        P."search_vector",
        P."average_rating",
        P."review_count",
        P."seller_id", -- We need seller_id to fetch shopName later
        P."category_id",
        (SELECT json_agg(json_build_object('imageId', "img"."image_id", 'imageUrl', "img"."image_url", 'isPrimary', "img"."is_primary", 'altText', "img"."alt_text", 'displayOrder', "img"."display_order", 'createdAt', "img"."created_at"))
          FROM "public"."product_images" AS img
          WHERE img."product_id" = P."product_id" AND img."is_primary" = TRUE LIMIT 1) AS images_json,
        (SELECT json_agg(json_build_object('reviewId', R."review_id", 'rating', R.rating, 'title', R.title, 'comment', R.comment, 'reviewDate', R."review_date", 'isApproved', R."is_approved", 'helpfulCount', R."helpful_count", 'updatedAt', R."updated_at", 'userId', R."user_id"))
          FROM "public"."reviews" AS R
          WHERE R."product_id" = P."product_id") AS reviews_json
      FROM "public"."products" AS P
      WHERE ${Prisma.join(conditions, ' AND ')}
      ORDER BY ${orderBySql}
      LIMIT ${limit} OFFSET ${offset}
    `);

    // Extract unique seller IDs
    const uniqueSellerIds = [...new Set(rawProducts.map(p => p.seller_id).filter(id => id !== null))];

    // Fetch shop names for all unique seller IDs using Prisma ORM in a single query
    const sellerProfiles = uniqueSellerIds.length > 0 ? await prisma.artisanProfile.findMany({
      where: {
        userId: {
          in: uniqueSellerIds,
        },
      },
      select: {
        userId: true,
        shopName: true,
      },
    }) : [];

    // Create a map for quick lookup
    const sellerShopNameMap = new Map<string, string>();
    sellerProfiles.forEach(seller => {
      sellerShopNameMap.set(seller.userId, seller.shopName);
    });

    const transformedProducts = rawProducts.map((rawProduct: any) => {
      const images = rawProduct.images_json || [];
      const reviews = rawProduct.reviews_json || [];

      // Get shopName from the map
      const sellerId = String(rawProduct.seller_id);
      const shopName = sellerShopNameMap.get(sellerId) || null; // Use null if not found or undefined

      const sellerData = shopName
        ? {
            shopName: shopName,
            userId: sellerId,
            // User name is not fetched in this specific query for seller, so it will be undefined
            // If needed, you'd have to fetch it here or modify transformProduct to expect it.
          }
        : undefined;

      return {
        productId: String(rawProduct.product_id), // Ensure string
        sellerId: sellerId,    // Ensure string
        categoryId: rawProduct.category_id ? String(rawProduct.category_id) : null, // Ensure string or null
        name: String(rawProduct.name),
        description: String(rawProduct.description),
        price: Number(rawProduct.price),
        quantityAvailable: Number(rawProduct.quantity_available),
        isFeatured: Boolean(rawProduct.is_featured),
        isActive: Boolean(rawProduct.is_active),
        creationDate: new Date(rawProduct.creation_date),
        lastUpdated: new Date(rawProduct.last_updated),
        materialsUsed: rawProduct.materials_used !== null ? String(rawProduct.materials_used) : null,
        dimensions: rawProduct.dimensions !== null ? String(rawProduct.dimensions) : null,
        weight: rawProduct.weight !== null ? Number(rawProduct.weight) : null,
        careInstructions: rawProduct.care_instructions !== null ? String(rawProduct.care_instructions) : null,
        tags: rawProduct.tags, // Already handled as JS array/object
        searchVector: rawProduct.search_vector !== null ? String(rawProduct.search_vector) : null,
        averageRating: Number(rawProduct.average_rating),
        reviewCount: Number(rawProduct.review_count),
        seller: sellerData, // Assign the correctly typed seller object
        images: images,
        reviews: reviews,
      };
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products: transformedProducts,
      totalPages,
      totalProducts,
    };
  } catch (error) {
    console.error('Database Error (fetchAllProducts with filters):', error);
    throw new Error('Failed to fetch products with filters.');
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
      include: productQuerySelection.include // Re-use the common selection here as well
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

export async function fetchSellerAverageRating(sellerId: string): Promise<{ averageRating: number; reviewCount: number }> {
  noStore();
  try {
    const result = await prisma.review.aggregate({
      _avg: { rating: true },
      _count: { reviewId: true },
      where: {
        product: {
          sellerId: sellerId,
        },
        isApproved: true,
      },
    });

    const averageRating = result._avg.rating ? parseFloat(result._avg.rating.toFixed(1)) : 0;
    const reviewCount = result._count.reviewId || 0;

    return { averageRating, reviewCount };
  } catch (error) {
    console.error('Database Error (fetchSellerAverageRating):', error);
    throw new Error('Failed to fetch seller average rating.');
  }
}

export async function deleteProduct(productId: string): Promise<{ message: string }> {
  noStore();
  try {
    await prisma.productImage.deleteMany({
      where: { productId: productId },
    });

    await prisma.product.delete({
      where: { productId: productId },
    });
    
    return { message: 'Product deleted successfully.' };
  } catch (error) {
    console.error('Database Error (deleteProduct):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { message: 'Product not found or already deleted.' };
      }
    }
    return { message: 'Failed to delete product: An unexpected error occurred.' };
  }
}