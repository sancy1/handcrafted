
// // src/lib/data/artisans.ts:

// 'use server';

// import { fetchProfileByUserId } from './profile';
// import { unstable_noStore as noStore } from 'next/cache';
// import prisma from '@/lib/prisma';
// import { ArtisanProfile, ArtisanProfileFormData } from '@/lib/definitions';
// // Import base model types directly from @prisma/client
// import { ArtisanProfile as PrismaArtisanProfileModel, User as PrismaUserModel } from '@prisma/client';


// // Helper function to safely get string values from FormData
// function getStringValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   if (typeof value === 'string') {
//     return value;
//   }
//   return null;
// }

// export async function createArtisanProfile(userId: string, formData: FormData) {
//   noStore();
//   try {
//     const profileData: ArtisanProfileFormData = {
//       shopName: getStringValue(formData, 'shopName') || '', // Required field
//       shopDescription: getStringValue(formData, 'shopDescription'),
//       bio: getStringValue(formData, 'bio'),
//       location: getStringValue(formData, 'location'),
//       website: getStringValue(formData, 'website'),
//       policies: getStringValue(formData, 'policies'),
//       shippingInfo: getStringValue(formData, 'shippingInfo'),
//       returnPolicy: getStringValue(formData, 'returnPolicy'),
//     };

//     // Use Prisma to create the artisan profile
//     await prisma.artisanProfile.create({
//       data: {
//         userId: userId,
//         shopName: profileData.shopName,
//         shopDescription: profileData.shopDescription,
//         bio: profileData.bio,
//         location: profileData.location,
//         website: profileData.website,
//         policies: profileData.policies,
//         shippingInfo: profileData.shippingInfo,
//         returnPolicy: profileData.returnPolicy,
//       },
//     });
//   } catch (error) {
//     console.error('Database Error (createArtisanProfile):', error);
//     throw new Error('Failed to create artisan profile.');
//   }
// }

// export async function fetchArtisanProfileByUserId(userId: string): Promise<ArtisanProfile | undefined> {
//   noStore();
//   try {
//     const profile = await prisma.artisanProfile.findUnique({
//       where: {
//         userId: userId,
//       },
//     });
//     return profile || undefined;
//   } catch (error) {
//     console.error('Database Error (fetchArtisanProfileByUserId):', error);
//     throw new Error('Failed to fetch artisan profile.');
//   }
// }

// export async function updateArtisanProfile(userId: string, formData: FormData) {
//   noStore();
//   try {
//     const profileData: Partial<ArtisanProfileFormData> = {
//       shopName: getStringValue(formData, 'shopName') || undefined,
//       shopDescription: getStringValue(formData, 'shopDescription'),
//       bio: getStringValue(formData, 'bio'),
//       location: getStringValue(formData, 'location'),
//       website: getStringValue(formData, 'website'),
//       policies: getStringValue(formData, 'policies'),
//       shippingInfo: getStringValue(formData, 'shippingInfo'),
//       returnPolicy: getStringValue(formData, 'returnPolicy')
//     };

//     // Filter out undefined values
//     const updateData = Object.fromEntries(
//       Object.entries(profileData).filter(([_, v]) => v !== undefined)
//     );

//     // Use Prisma to update the artisan profile
//     await prisma.artisanProfile.update({
//       where: {
//         userId: userId,
//       },
//       data: updateData,
//     });
//   } catch (error) {
//     console.error('Database Error (updateArtisanProfile):', error);
//     throw new Error('Failed to update artisan profile.');
//   }
// }

// export async function deleteArtisanProfile(userId: string) {
//   noStore();
//   try {
//     await prisma.artisanProfile.delete({
//       where: {
//         userId: userId,
//       },
//     });
//   } catch (error) {
//     console.error('Database Error (deleteArtisanProfile):', error);
//     throw new Error('Failed to delete artisan profile.');
//   }
// }



// // Add this function to your existing artisans data file
// export async function fetchAllArtisanProfiles(): Promise<ArtisanProfile[]> {
//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       include: {
//         user: {
//           select: {
//             name: true,
//             email: true
//           },
//         },
//       },
//     });

//     // Define the type for the 'artisan' parameter manually.
//     // This type represents the Prisma ArtisanProfile model combined with the included User fields.
//     type ArtisanWithUserFields = PrismaArtisanProfileModel & {
//       user: {
//         name: string | null; // Based on your select, name can be null from database
//         email: string | null; // Based on your select, email can be null from database
//       };
//     };

//     // Map and explicitly type the 'artisan' parameter
//     return artisans.map((artisan: ArtisanWithUserFields) => ({
//       // Spread all properties from the Prisma ArtisanProfile model (including original user object)
//       ...artisan,
//       // Flatten the name and email from the user object to top-level properties
//       name: artisan.user.name || '',
//       email: artisan.user.email || '',
//       // IMPORTANT: If ArtisanProfile from lib/definitions.ts does NOT have 'user',
//       // 'name', or 'email' as top-level properties, you might get a new type error
//       // on the function's return line `return artisans.map(...)`.
//       // If that happens, you'll need to adjust ArtisanProfile in lib/definitions.ts
//       // or define a new return type for this function.
//     }));
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch artisan profiles.');
//   }
// }





// // // NEW FUNCTION: Optimized for the artisan list page with images
// // export async function fetchArtisanProfilesForList() {
// //   noStore(); // Prevents caching for fresh data

// //   try {
// //     const artisans = await prisma.artisanProfile.findMany({
// //       select: {
// //         id: true,
// //         userId: true, // You might need this for the Link href
// //         shopName: true,
// //         shopDescription: true,
// //         location: true,
// //         averageRating: true,
// //         totalSales: true,
// //         isTopArtisan: true,
// //         user: {
// //           select: {
// //             name: true, // ADDED: Select the user's name
// //             email: true, // ADDED: Select the user's email
// //             profile: {
// //               select: {
// //                 profileImageUrl: true, // ONLY select the image URL
// //               },
// //             },
// //           },
// //         },
// //       },
// //     });

// //     // Map to flatten the structure slightly if needed for your component's type,
// //     // or adjust your component's type to match the nested structure.
// //     return artisans.map((artisan) => ({
// //       ...artisan,
// //       profileImageUrl: artisan.user?.profile?.profileImageUrl || null,
// //       userName: artisan.user?.name || null, // ADDED: Flatten user name
// //       userEmail: artisan.user?.email || null, // ADDED: Flatten user email
// //     }));
// //   } catch (error) {
// //     console.error('Database Error (fetchArtisanProfilesForList):', error);
// //     throw new Error('Failed to fetch artisan profiles for list with images.');
// //   }
// // }















// // NEW FUNCTION: Optimized for the artisan list page with images and calculated average rating
// export async function fetchArtisanProfilesForList() {
//   noStore(); // Prevents caching for fresh data

//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       select: {
//         id: true,
//         userId: true,
//         shopName: true,
//         shopDescription: true,
//         location: true,
//         // averageRating: false, // We will calculate this dynamically
//         // totalSales: false, // We will calculate totalReviews dynamically
//         isTopArtisan: true,
//         user: {
//           select: {
//             name: true,
//             email: true,
//             profile: {
//               select: {
//                 profileImageUrl: true,
//               },
//             },
//           },
//         },
//         // Include products and their reviews to calculate the average rating
//         products: {
//           select: {
//             reviews: {
//               select: {
//                 rating: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         shopName: 'asc', // Or any other preferred order
//       },
//     });

//     // Map to flatten the structure and calculate average rating and total reviews
//     return artisans.map((artisan) => {
//       let totalRating = 0;
//       let reviewCount = 0;

//       // Iterate through each product and its reviews to sum ratings and count reviews
//       artisan.products.forEach((product) => {
//         product.reviews.forEach((review) => {
//           totalRating += review.rating;
//           reviewCount++;
//         });
//       });

//       const calculatedAverageRating = reviewCount > 0 ? (totalRating / reviewCount) : 0.0;

//       return {
//         id: artisan.id,
//         userId: artisan.userId,
//         shopName: artisan.shopName,
//         shopDescription: artisan.shopDescription,
//         location: artisan.location,
//         isTopArtisan: artisan.isTopArtisan,
//         profileImageUrl: artisan.user?.profile?.profileImageUrl || null,
//         userName: artisan.user?.name || null,
//         userEmail: artisan.user?.email || null,
//         // Use the dynamically calculated average rating
//         averageRating: parseFloat(calculatedAverageRating.toFixed(1)),
//         // Use the dynamically calculated total review count for display
//         totalSales: reviewCount,
//       };
//     });
//   } catch (error) {
//     console.error('Database Error (fetchArtisanProfilesForList):', error);
//     throw new Error('Failed to fetch artisan profiles for list with calculated ratings.');
//   }
// }
























// // src/lib/data/artisans.ts

// 'use server';

// import { fetchProfileByUserId } from './profile'; // Assuming this import is correct and needed
// import { unstable_noStore as noStore } from 'next/cache';
// import prisma from '@/lib/prisma';
// import { ArtisanProfile, ArtisanProfileFormData } from '@/lib/definitions';
// // Import base model types directly from @prisma/client
// import {
//   ArtisanProfile as PrismaArtisanProfileModel,
//   User as PrismaUserModel,
//   Profile as PrismaProfileModel,
// } from '@prisma/client';
// import { Prisma } from '@prisma/client'; // Import Prisma namespace for type inference

// // --- NEW TYPE DEFINITION: ArtisanProfileForDisplay ---
// // This type defines the complete structure of an artisan profile
// // intended for display in lists or cards, including user and profile image data.
// // It is explicitly defined here and not in definitions.ts to avoid breaking existing logic.
// export interface ArtisanProfileForDisplay {
//   id: string;
//   userId: string;
//   shopName: string;
//   shopDescription: string | null;
//   bio: string | null;
//   location: string | null;
//   website: string | null;
//   policies: string | null;
//   shippingInfo: string | null;
//   returnPolicy: string | null;
//   averageRating: number;
//   totalSales: number; // Used here as review count for display, as per your page.tsx
//   isTopArtisan: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   profileImageUrl: string | null; // From the User's Profile
//   userName: string | null; // From the User model
//   userEmail: string | null; // From the User model
// }

// // Helper function to safely get string values from FormData
// function getStringValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   if (typeof value === 'string') {
//     return value;
//   }
//   return null;
// }

// // --- IMPORTANT TYPE REFINEMENT ---
// // Instead of manually constructing PrismaArtisanProfileWithAllRelations,
// // we'll infer it directly from a Prisma query structure.
// // This ensures perfect alignment with what Prisma actually returns.
// const artisanProfileWithAllRelations = Prisma.validator<Prisma.ArtisanProfileDefaultArgs>()({
//   include: {
//     user: {
//       select: {
//         name: true,
//         email: true,
//         profile: {
//           select: {
//             profileImageUrl: true,
//           },
//         },
//       },
//     },
//     products: {
//       select: {
//         reviews: {
//           select: {
//             rating: true,
//           },
//         },
//       },
//     },
//   },
// });

// type PrismaArtisanProfileWithAllRelations = Prisma.ArtisanProfileGetPayload<typeof artisanProfileWithAllRelations>;


// /**
//  * Transforms a Prisma ArtisanProfile object (with included relations)
//  * into the `ArtisanProfileForDisplay` format suitable for UI components.
//  */
// function transformArtisanProfileForDisplay(
//   prismaArtisan: PrismaArtisanProfileWithAllRelations // Now uses the inferred type
// ): ArtisanProfileForDisplay {
//   let totalRating = 0;
//   let reviewCount = 0;

//   // Calculate average rating and total sales (as review count) from products and reviews
//   // Added optional chaining for products and reviews for safety, though Prisma's select should ensure existence
//   if (prismaArtisan.products && prismaArtisan.products.length > 0) {
//     prismaArtisan.products.forEach((product) => {
//       if (product.reviews && product.reviews.length > 0) {
//         product.reviews.forEach((review) => {
//           totalRating += review.rating;
//           reviewCount++;
//         });
//       }
//     });
//   }

//   const calculatedAverageRating = reviewCount > 0 ? totalRating / reviewCount : 0.0;

//   return {
//     id: prismaArtisan.id,
//     userId: prismaArtisan.userId, // CORRECTED: from prismaArtusan.userId
//     shopName: prismaArtisan.shopName,
//     shopDescription: prismaArtisan.shopDescription,
//     bio: prismaArtisan.bio,
//     location: prismaArtisan.location,
//     website: prismaArtisan.website,
//     policies: prismaArtisan.policies,
//     shippingInfo: prismaArtisan.shippingInfo,
//     returnPolicy: prismaArtisan.returnPolicy,
//     isTopArtisan: prismaArtisan.isTopArtisan,
//     createdAt: prismaArtisan.createdAt,
//     updatedAt: prismaArtisan.updatedAt,
//     // Safely access nested profileImageUrl, userName, and userEmail
//     profileImageUrl: prismaArtisan.user?.profile?.profileImageUrl || null,
//     userName: prismaArtisan.user?.name || null,
//     userEmail: prismaArtisan.user?.email || null,
//     // Use the dynamically calculated average rating and total sales (review count)
//     averageRating: parseFloat(calculatedAverageRating.toFixed(1)),
//     totalSales: reviewCount,
//   };
// }

// // --- Existing Functions (Untouched in their core logic and return types) ---

// export async function createArtisanProfile(userId: string, formData: FormData) {
//   noStore();
//   try {
//     const profileData: ArtisanProfileFormData = {
//       shopName: getStringValue(formData, 'shopName') || '', // Required field
//       shopDescription: getStringValue(formData, 'shopDescription'),
//       bio: getStringValue(formData, 'bio'),
//       location: getStringValue(formData, 'location'),
//       website: getStringValue(formData, 'website'),
//       policies: getStringValue(formData, 'policies'),
//       shippingInfo: getStringValue(formData, 'shippingInfo'),
//       returnPolicy: getStringValue(formData, 'returnPolicy'),
//     };

//     // Use Prisma to create the artisan profile
//     await prisma.artisanProfile.create({
//       data: {
//         userId: userId,
//         shopName: profileData.shopName,
//         shopDescription: profileData.shopDescription,
//         bio: profileData.bio,
//         location: profileData.location,
//         website: profileData.website,
//         policies: profileData.policies,
//         shippingInfo: profileData.shippingInfo,
//         returnPolicy: profileData.returnPolicy,
//       },
//     });
//   } catch (error) {
//     console.error('Database Error (createArtisanProfile):', error);
//     throw new Error('Failed to create artisan profile.');
//   }
// }

// export async function fetchArtisanProfileByUserId(userId: string): Promise<ArtisanProfile | undefined> {
//   noStore();
//   try {
//     const profile = await prisma.artisanProfile.findUnique({
//       where: {
//         userId: userId,
//       },
//     });
//     return profile || undefined;
//   } catch (error) {
//     console.error('Database Error (fetchArtisanProfileByUserId):', error);
//     throw new Error('Failed to fetch artisan profile.');
//   }
// }

// export async function updateArtisanProfile(userId: string, formData: FormData) {
//   noStore();
//   try {
//     const profileData: Partial<ArtisanProfileFormData> = {
//       shopName: getStringValue(formData, 'shopName') || undefined,
//       shopDescription: getStringValue(formData, 'shopDescription'),
//       bio: getStringValue(formData, 'bio'),
//       location: getStringValue(formData, 'location'),
//       website: getStringValue(formData, 'website'),
//       policies: getStringValue(formData, 'policies'),
//       shippingInfo: getStringValue(formData, 'shippingInfo'),
//       returnPolicy: getStringValue(formData, 'returnPolicy'),
//     };

//     // Filter out undefined values
//     const updateData = Object.fromEntries(
//       Object.entries(profileData).filter(([_, v]) => v !== undefined)
//     );

//     // Use Prisma to update the artisan profile
//     await prisma.artisanProfile.update({
//       where: {
//         userId: userId,
//       },
//       data: updateData,
//     });
//   } catch (error) {
//     console.error('Database Error (updateArtisanProfile):', error);
//     throw new Error('Failed to update artisan profile.');
//   }
// }

// export async function deleteArtisanProfile(userId: string) {
//   noStore();
//   try {
//     await prisma.artisanProfile.delete({
//       where: {
//         userId: userId,
//       },
//     });
//   } catch (error) {
//     console.error('Database Error (deleteArtisanProfile):', error);
//     throw new Error('Failed to delete artisan profile.');
//   }
// }

// /**
//  * Fetches all artisan profiles, including user name and email.
//  * This function returns `ArtisanProfile[]` which has `name` and `email` flattened.
//  * It's kept separate from `ArtisanProfileForDisplay` to avoid breaking existing consumers.
//  */
// export async function fetchAllArtisanProfiles(): Promise<ArtisanProfile[]> {
//   noStore(); // Added noStore for consistency, assuming data should be fresh
//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       include: {
//         user: {
//           select: {
//             name: true,
//             email: true,
//           },
//         },
//       },
//     });

//     // Define the type for the 'artisan' parameter manually.
//     // This type represents the Prisma ArtisanProfile model combined with the included User fields.
//     type ArtisanWithUserFields = PrismaArtisanProfileModel & {
//       user: {
//         name: string | null;
//         email: string | null;
//       };
//     };

//     // Map and explicitly type the 'artisan' parameter
//     return artisans.map((artisan: ArtisanWithUserFields) => ({
//       ...artisan,
//       name: artisan.user.name || '',
//       email: artisan.user.email || '',
//     }));
//   } catch (error) {
//     console.error('Database Error (fetchAllArtisanProfiles):', error);
//     throw new Error('Failed to fetch artisan profiles.');
//   }
// }

// // --- NEW FUNCTION: Fetch Top Artisans for Homepage ---
// export async function fetchTopArtisansForHomepage(): Promise<ArtisanProfileForDisplay[]> {
//   noStore(); // Opt-out of data caching
//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       // Use the inferred type from Prisma.validator for consistency
//       ...artisanProfileWithAllRelations,
//       orderBy: {
//         // If 'averageRating' is a field in your ArtisanProfile model, this will work.
//         // If not, you might need to fetch all, calculate, and then sort in TypeScript.
//         averageRating: 'desc', 
//       },
//       take: 3, // Limit to 3 top artisans
//     });

//     // Cast the artisans array to the inferred type before mapping
//     const typedArtisans = artisans as PrismaArtisanProfileWithAllRelations[];
//     // Map the Prisma results to the ArtisanProfileForDisplay type
//     return typedArtisans.map(transformArtisanProfileForDisplay);
//   } catch (error) {
//     console.error('Database Error (fetchTopArtisansForHomepage):', error);
//     throw new Error('Failed to fetch top artisans for homepage.');
//   }
// }

// // --- MODIFIED EXISTING FUNCTION: fetchArtisanProfilesForList ---
// // This function is updated to return ArtisanProfileForDisplay and use the transform helper.
// export async function fetchArtisanProfilesForList(): Promise<ArtisanProfileForDisplay[]> {
//   noStore(); // Prevents caching for fresh data

//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       // Use the inferred type from Prisma.validator for consistency
//       ...artisanProfileWithAllRelations,
//       orderBy: {
//         shopName: 'asc', // Or any other preferred order
//       },
//     });

//     // Cast the artisans array to the inferred type before mapping
//     const typedArtisans = artisans as PrismaArtisanProfileWithAllRelations[];
//     // Map to flatten the structure and calculate average rating and total reviews
//     return typedArtisans.map(transformArtisanProfileForDisplay);
//   } catch (error) {
//     console.error('Database Error (fetchArtisanProfilesForList):', error);
//     throw new Error('Failed to fetch artisan profiles for list with calculated ratings.');
//   }
// }































// // src/lib/data/artisans.ts

// 'use server';

// import { fetchProfileByUserId } from './profile'; // Assuming this import is correct and needed
// import { unstable_noStore as noStore } from 'next/cache';
// import prisma from '@/lib/prisma';
// import { ArtisanProfile, ArtisanProfileFormData } from '@/lib/definitions';
// // Import base model types directly from @prisma/client
// import {
//   ArtisanProfile as PrismaArtisanProfileModel,
//   User as PrismaUserModel,
//   Profile as PrismaProfileModel,
// } from '@prisma/client';
// import { Prisma } from '@prisma/client'; // Import Prisma namespace for type inference

// // --- NEW TYPE DEFINITION: ArtisanProfileForDisplay ---
// // This type defines the complete structure of an artisan profile
// // intended for display in lists or cards, including user and profile image data.
// // It is explicitly defined here and not in definitions.ts to avoid breaking existing logic.
// export interface ArtisanProfileForDisplay {
//   id: string;
//   userId: string;
//   shopName: string;
//   shopDescription: string | null;
//   bio: string | null;
//   location: string | null;
//   website: string | null;
//   policies: string | null;
//   shippingInfo: string | null;
//   returnPolicy: string | null;
//   averageRating: number;
//   totalSales: number; // Used here as review count for display, as per your page.tsx
//   isTopArtisan: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   profileImageUrl: string | null; // From the User's Profile
//   userName: string | null; // From the User model
//   userEmail: string | null; // From the User model
// }

// // Helper function to safely get string values from FormData
// function getStringValue(formData: FormData, key: string): string | null {
//   const value = formData.get(key);
//   if (value === null || (typeof value === 'string' && value.trim() === '')) {
//     return null;
//   }
//   if (typeof value === 'string') {
//     return value;
//   }
//   return null;
// }

// // --- IMPORTANT TYPE REFINEMENT ---
// // Instead of manually constructing PrismaArtisanProfileWithAllRelations,
// // we'll infer it directly from a Prisma query structure.
// // This ensures perfect alignment with what Prisma actually returns.
// const artisanProfileWithAllRelations = Prisma.validator<Prisma.ArtisanProfileDefaultArgs>()({
//   include: {
//     user: {
//       select: {
//         name: true,
//         email: true,
//         profile: {
//           select: {
//             profileImageUrl: true,
//           },
//         },
//       },
//     },
//     products: {
//       select: {
//         reviews: {
//           select: {
//             rating: true,
//           },
//         },
//       },
//     },
//   },
// });

// type PrismaArtisanProfileWithAllRelations = Prisma.ArtisanProfileGetPayload<typeof artisanProfileWithAllRelations>;


// /**
//  * Transforms a Prisma ArtisanProfile object (with included relations)
//  * into the `ArtisanProfileForDisplay` format suitable for UI components.
//  */
// function transformArtisanProfileForDisplay(
//   prismaArtisan: PrismaArtisanProfileWithAllRelations // Now uses the inferred type
// ): ArtisanProfileForDisplay {
//   let totalRating = 0;
//   let reviewCount = 0;

//   // Calculate average rating and total sales (as review count) from products and reviews
//   // Added optional chaining for products and reviews for safety, though Prisma's select should ensure existence
//   if (prismaArtisan.products && prismaArtisan.products.length > 0) {
//     prismaArtisan.products.forEach((product) => {
//       if (product.reviews && product.reviews.length > 0) {
//         product.reviews.forEach((review) => {
//           totalRating += review.rating;
//           reviewCount++;
//         });
//       }
//     });
//   }

//   const calculatedAverageRating = reviewCount > 0 ? totalRating / reviewCount : 0.0;

//   return {
//     id: prismaArtisan.id,
//     userId: prismaArtisan.userId,
//     shopName: prismaArtisan.shopName,
//     shopDescription: prismaArtisan.shopDescription,
//     bio: prismaArtisan.bio,
//     location: prismaArtisan.location,
//     website: prismaArtisan.website,
//     policies: prismaArtisan.policies,
//     shippingInfo: prismaArtisan.shippingInfo,
//     returnPolicy: prismaArtisan.returnPolicy,
//     isTopArtisan: prismaArtisan.isTopArtisan,
//     createdAt: prismaArtisan.createdAt,
//     updatedAt: prismaArtisan.updatedAt,
//     // Safely access nested profileImageUrl, userName, and userEmail
//     profileImageUrl: prismaArtisan.user?.profile?.profileImageUrl || null,
//     userName: prismaArtisan.user?.name || null,
//     userEmail: prismaArtisan.user?.email || null,
//     // Use the dynamically calculated average rating and total sales (review count)
//     averageRating: parseFloat(calculatedAverageRating.toFixed(1)),
//     totalSales: reviewCount,
//   };
// }

// // --- Existing Functions (Untouched in their core logic and return types) ---

// export async function createArtisanProfile(userId: string, formData: FormData) {
//   noStore();
//   try {
//     const profileData: ArtisanProfileFormData = {
//       shopName: getStringValue(formData, 'shopName') || '', // Required field
//       shopDescription: getStringValue(formData, 'shopDescription'),
//       bio: getStringValue(formData, 'bio'),
//       location: getStringValue(formData, 'location'),
//       website: getStringValue(formData, 'website'),
//       policies: getStringValue(formData, 'policies'),
//       shippingInfo: getStringValue(formData, 'shippingInfo'),
//       returnPolicy: getStringValue(formData, 'returnPolicy'),
//     };

//     // Use Prisma to create the artisan profile
//     await prisma.artisanProfile.create({
//       data: {
//         userId: userId,
//         shopName: profileData.shopName,
//         shopDescription: profileData.shopDescription,
//         bio: profileData.bio,
//         location: profileData.location,
//         website: profileData.website,
//         policies: profileData.policies,
//         shippingInfo: profileData.shippingInfo,
//         returnPolicy: profileData.returnPolicy,
//       },
//     });
//   } catch (error) {
//     console.error('Database Error (createArtisanProfile):', error);
//     throw new Error('Failed to create artisan profile.');
//   }
// }

// export async function fetchArtisanProfileByUserId(userId: string): Promise<ArtisanProfile | undefined> {
//   noStore();
//   try {
//     const profile = await prisma.artisanProfile.findUnique({
//       where: {
//         userId: userId,
//       },
//     });
//     return profile || undefined;
//   } catch (error) {
//     console.error('Database Error (fetchArtisanProfileByUserId):', error);
//     throw new Error('Failed to fetch artisan profile.');
//   }
// }

// export async function updateArtisanProfile(userId: string, formData: FormData) {
//   noStore();
//   try {
//     const profileData: Partial<ArtisanProfileFormData> = {
//       shopName: getStringValue(formData, 'shopName') || undefined,
//       shopDescription: getStringValue(formData, 'shopDescription'),
//       bio: getStringValue(formData, 'bio'),
//       location: getStringValue(formData, 'location'),
//       website: getStringValue(formData, 'website'),
//       policies: getStringValue(formData, 'policies'),
//       shippingInfo: getStringValue(formData, 'shippingInfo'),
//       returnPolicy: getStringValue(formData, 'returnPolicy'),
//     };

//     // Filter out undefined values
//     const updateData = Object.fromEntries(
//       Object.entries(profileData).filter(([_, v]) => v !== undefined)
//     );

//     // Use Prisma to update the artisan profile
//     await prisma.artisanProfile.update({
//       where: {
//         userId: userId,
//       },
//       data: updateData,
//     });
//   } catch (error) {
//     console.error('Database Error (updateArtisanProfile):', error);
//     throw new Error('Failed to update artisan profile.');
//   }
// }

// export async function deleteArtisanProfile(userId: string) {
//   noStore();
//   try {
//     await prisma.artisanProfile.delete({
//       where: {
//         userId: userId,
//       },
//     });
//   } catch (error) {
//     console.error('Database Error (deleteArtisanProfile):', error);
//     throw new Error('Failed to delete artisan profile.');
//   }
// }

// /**
//  * Fetches all artisan profiles, including user name and email.
//  * This function returns `ArtisanProfile[]` which has `name` and `email` flattened.
//  * It's kept separate from `ArtisanProfileForDisplay` to avoid breaking existing consumers.
//  */
// export async function fetchAllArtisanProfiles(): Promise<ArtisanProfile[]> {
//   noStore(); // Added noStore for consistency, assuming data should be fresh
//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       include: {
//         user: {
//           select: {
//             name: true,
//             email: true,
//           },
//         },
//       },
//     });

//     // Define the type for the 'artisan' parameter manually.
//     // This type represents the Prisma ArtisanProfile model combined with the included User fields.
//     type ArtisanWithUserFields = PrismaArtisanProfileModel & {
//       user: {
//         name: string | null;
//         email: string | null;
//       };
//     };

//     // Map and explicitly type the 'artisan' parameter
//     return artisans.map((artisan: ArtisanWithUserFields) => ({
//       ...artisan,
//       name: artisan.user.name || '',
//       email: artisan.user.email || '',
//     }));
//   } catch (error) {
//     console.error('Database Error (fetchAllArtisanProfiles):', error);
//     throw new Error('Failed to fetch artisan profiles.');
//   }
// }

// // --- NEW FUNCTION: Fetch Top Artisans for Homepage (CORRECTED SORTING) ---
// export async function fetchTopArtisansForHomepage(): Promise<ArtisanProfileForDisplay[]> {
//   noStore(); // Opt-out of data caching
//   try {
//     // 1. Fetch all artisans with necessary relations (no database sorting yet)
//     const artisans = await prisma.artisanProfile.findMany({
//       ...artisanProfileWithAllRelations,
//       // Removed orderBy here, we will sort in TypeScript after calculation
//     });

//     // Cast the artisans array to the inferred type before mapping
//     const typedArtisans = artisans as PrismaArtisanProfileWithAllRelations[];

//     // 2. Transform all fetched artisans to calculate their averageRating
//     const transformedArtisans = typedArtisans.map(transformArtisanProfileForDisplay);

//     // 3. Sort the transformed (calculated) artisans by averageRating in TypeScript
//     transformedArtisans.sort((a, b) => b.averageRating - a.averageRating);

//     // 4. Take the top 3 artisans
//     return transformedArtisans.slice(0, 3);
//   } catch (error) {
//     console.error('Database Error (fetchTopArtisansForHomepage):', error);
//     throw new Error('Failed to fetch top artisans for homepage.');
//   }
// }

// // --- MODIFIED EXISTING FUNCTION: fetchArtisanProfilesForList ---
// // This function is updated to return ArtisanProfileForDisplay and use the transform helper.
// // Its sorting remains 'shopName: asc' as it was already correct for a general list.
// export async function fetchArtisanProfilesForList(): Promise<ArtisanProfileForDisplay[]> {
//   noStore(); // Prevents caching for fresh data

//   try {
//     const artisans = await prisma.artisanProfile.findMany({
//       // Use the inferred type from Prisma.validator for consistency
//       ...artisanProfileWithAllRelations,
//       orderBy: {
//         shopName: 'asc', // Retaining original sort order for the list page
//       },
//     });

//     // Cast the artisans array to the inferred type before mapping
//     const typedArtisans = artisans as PrismaArtisanProfileWithAllRelations[];
//     // Map to flatten the structure and calculate average rating and total reviews
//     return typedArtisans.map(transformArtisanProfileForDisplay);
//   } catch (error) {
//     console.error('Database Error (fetchArtisanProfilesForList):', error);
//     throw new Error('Failed to fetch artisan profiles for list with calculated ratings.');
//   }
// }























// src/lib/data/artisans.ts

'use server';

import { fetchProfileByUserId } from './profile'; // Assuming this import is correct and needed
import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/lib/prisma';
import { ArtisanProfile, ArtisanProfileFormData } from '@/lib/definitions';
// Import base model types directly from @prisma/client
import {
  ArtisanProfile as PrismaArtisanProfileModel,
  User as PrismaUserModel,
  Profile as PrismaProfileModel,
} from '@prisma/client';
import { Prisma } from '@prisma/client'; // Import Prisma namespace for type inference

// --- NEW TYPE DEFINITION: ArtisanProfileForDisplay ---
// This type defines the complete structure of an artisan profile
// intended for display in lists or cards, including user and profile image data.
// It is explicitly defined here and not in definitions.ts to avoid breaking existing logic.
export interface ArtisanProfileForDisplay {
  id: string;
  userId: string;
  shopName: string;
  shopDescription: string | null;
  bio: string | null;
  location: string | null;
  policies: string | null;
  returnPolicy: string | null;
  shippingInfo: string | null;
  website: string | null;
  averageRating: number;
  totalSales: number; // Used here as review count for display, as per your page.tsx
  isTopArtisan: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileImageUrl: string | null; // From the User's Profile
  userName: string | null; // From the User model
  userEmail: string | null; // From the User model
  phoneNumber: string | null; // Added: From the User's Profile
}

// Helper function to safely get string values from FormData
function getStringValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  if (typeof value === 'string') {
    return value;
  }
  return null;
}

// --- IMPORTANT TYPE REFINEMENT ---
// Instead of manually constructing PrismaArtisanProfileWithAllRelations,
// we'll infer it directly from a Prisma query structure.
// This ensures perfect alignment with what Prisma actually returns.
const artisanProfileWithAllRelations = Prisma.validator<Prisma.ArtisanProfileDefaultArgs>()({
  include: {
    user: {
      select: {
        name: true,
        email: true,
        profile: {
          select: {
            profileImageUrl: true,
            phoneNumber: true, // ADDED: Select phoneNumber from the user's profile
          },
        },
      },
    },
    products: {
      select: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    },
  },
});

type PrismaArtisanProfileWithAllRelations = Prisma.ArtisanProfileGetPayload<typeof artisanProfileWithAllRelations>;


/**
 * Transforms a Prisma ArtisanProfile object (with included relations)
 * into the `ArtisanProfileForDisplay` format suitable for UI components.
 */
function transformArtisanProfileForDisplay(
  prismaArtisan: PrismaArtisanProfileWithAllRelations // Now uses the inferred type
): ArtisanProfileForDisplay {
  let totalRating = 0;
  let reviewCount = 0;

  // Calculate average rating and total sales (as review count) from products and reviews
  // Added optional chaining for products and reviews for safety, though Prisma's select should ensure existence
  if (prismaArtisan.products && prismaArtisan.products.length > 0) {
    prismaArtisan.products.forEach((product) => {
      if (product.reviews && product.reviews.length > 0) {
        product.reviews.forEach((review) => {
          totalRating += review.rating;
          reviewCount++;
        });
      }
    });
  }

  const calculatedAverageRating = reviewCount > 0 ? totalRating / reviewCount : 0.0;

  return {
    id: prismaArtisan.id,
    userId: prismaArtisan.userId,
    shopName: prismaArtisan.shopName,
    shopDescription: prismaArtisan.shopDescription,
    bio: prismaArtisan.bio,
    location: prismaArtisan.location,
    website: prismaArtisan.website,
    policies: prismaArtisan.policies,
    shippingInfo: prismaArtisan.shippingInfo,
    returnPolicy: prismaArtisan.returnPolicy,
    isTopArtisan: prismaArtisan.isTopArtisan,
    createdAt: prismaArtisan.createdAt,
    updatedAt: prismaArtisan.updatedAt,
    // Safely access nested profileImageUrl, userName, userEmail, and phoneNumber
    profileImageUrl: prismaArtisan.user?.profile?.profileImageUrl || null,
    userName: prismaArtisan.user?.name || null,
    userEmail: prismaArtisan.user?.email || null,
    phoneNumber: prismaArtisan.user?.profile?.phoneNumber || null, // ADDED: Map phoneNumber
    // Use the dynamically calculated average rating and total sales (review count)
    averageRating: parseFloat(calculatedAverageRating.toFixed(1)),
    totalSales: reviewCount,
  };
}

// --- Existing Functions (Untouched in their core logic and return types) ---

export async function createArtisanProfile(userId: string, formData: FormData) {
  noStore();
  try {
    const profileData: ArtisanProfileFormData = {
      shopName: getStringValue(formData, 'shopName') || '', // Required field
      shopDescription: getStringValue(formData, 'shopDescription'),
      bio: getStringValue(formData, 'bio'),
      location: getStringValue(formData, 'location'),
      website: getStringValue(formData, 'website'),
      policies: getStringValue(formData, 'policies'),
      shippingInfo: getStringValue(formData, 'shippingInfo'),
      returnPolicy: getStringValue(formData, 'returnPolicy'),
    };

    // Use Prisma to create the artisan profile
    await prisma.artisanProfile.create({
      data: {
        userId: userId,
        shopName: profileData.shopName,
        shopDescription: profileData.shopDescription,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        policies: profileData.policies,
        shippingInfo: profileData.shippingInfo,
        returnPolicy: profileData.returnPolicy,
      },
    });
  } catch (error) {
    console.error('Database Error (createArtisanProfile):', error);
    throw new Error('Failed to create artisan profile.');
  }
}

export async function fetchArtisanProfileByUserId(userId: string): Promise<ArtisanProfile | undefined> {
  noStore();
  try {
    const profile = await prisma.artisanProfile.findUnique({
      where: {
        userId: userId,
      },
    });
    return profile || undefined;
  } catch (error) {
    console.error('Database Error (fetchArtisanProfileByUserId):', error);
    throw new Error('Failed to fetch artisan profile.');
  }
}

export async function updateArtisanProfile(userId: string, formData: FormData) {
  noStore();
  try {
    const profileData: Partial<ArtisanProfileFormData> = {
      shopName: getStringValue(formData, 'shopName') || undefined,
      shopDescription: getStringValue(formData, 'shopDescription'),
      bio: getStringValue(formData, 'bio'),
      location: getStringValue(formData, 'location'),
      website: getStringValue(formData, 'website'),
      policies: getStringValue(formData, 'policies'),
      shippingInfo: getStringValue(formData, 'shippingInfo'),
      returnPolicy: getStringValue(formData, 'returnPolicy'),
    };

    // Filter out undefined values
    const updateData = Object.fromEntries(
      Object.entries(profileData).filter(([_, v]) => v !== undefined)
    );

    // Use Prisma to update the artisan profile
    await prisma.artisanProfile.update({
      where: {
        userId: userId,
      },
      data: updateData,
    });
  } catch (error) {
    console.error('Database Error (updateArtisanProfile):', error);
    throw new Error('Failed to update artisan profile.');
  }
}

export async function deleteArtisanProfile(userId: string) {
  noStore();
  try {
    await prisma.artisanProfile.delete({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error('Database Error (deleteArtisanProfile):', error);
    throw new Error('Failed to delete artisan profile.');
  }
}

/**
 * Fetches all artisan profiles, including user name and email.
 * This function returns `ArtisanProfile[]` which has `name` and `email` flattened.
 * It's kept separate from `ArtisanProfileForDisplay` to avoid breaking existing consumers.
 */
export async function fetchAllArtisanProfiles(): Promise<ArtisanProfile[]> {
  noStore(); // Added noStore for consistency, assuming data should be fresh
  try {
    const artisans = await prisma.artisanProfile.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Define the type for the 'artisan' parameter manually.
    // This type represents the Prisma ArtisanProfile model combined with the included User fields.
    type ArtisanWithUserFields = PrismaArtisanProfileModel & {
      user: {
        name: string | null;
        email: string | null;
      };
    };

    // Map and explicitly type the 'artisan' parameter
    return artisans.map((artisan: ArtisanWithUserFields) => ({
      ...artisan,
      name: artisan.user.name || '',
      email: artisan.user.email || '',
    }));
  } catch (error) {
    console.error('Database Error (fetchAllArtisanProfiles):', error);
    throw new Error('Failed to fetch artisan profiles.');
  }
}

// --- NEW FUNCTION: Fetch Top Artisans for Homepage (CORRECTED SORTING) ---
export async function fetchTopArtisansForHomepage(): Promise<ArtisanProfileForDisplay[]> {
  noStore(); // Opt-out of data caching
  try {
    // 1. Fetch all artisans with necessary relations (no database sorting yet)
    const artisans = await prisma.artisanProfile.findMany({
      ...artisanProfileWithAllRelations,
      // Removed orderBy here, we will sort in TypeScript after calculation
    });

    // Cast the artisans array to the inferred type before mapping
    const typedArtisans = artisans as PrismaArtisanProfileWithAllRelations[];

    // 2. Transform all fetched artisans to calculate their averageRating
    const transformedArtisans = typedArtisans.map(transformArtisanProfileForDisplay);

    // 3. Sort the transformed (calculated) artisans by averageRating in TypeScript
    transformedArtisans.sort((a, b) => b.averageRating - a.averageRating);

    // 4. Take the top 3 artisans
    return transformedArtisans.slice(0, 3);
  } catch (error) {
    console.error('Database Error (fetchTopArtisansForHomepage):', error);
    throw new Error('Failed to fetch top artisans for homepage.');
  }
}

// --- MODIFIED EXISTING FUNCTION: fetchArtisanProfilesForList ---
// This function is updated to return ArtisanProfileForDisplay and use the transform helper.
// Its sorting remains 'shopName: asc' as it was already correct for a general list.
export async function fetchArtisanProfilesForList(): Promise<ArtisanProfileForDisplay[]> {
  noStore(); // Prevents caching for fresh data

  try {
    const artisans = await prisma.artisanProfile.findMany({
      // Use the inferred type from Prisma.validator for consistency
      ...artisanProfileWithAllRelations,
      orderBy: {
        shopName: 'asc', // Retaining original sort order for the list page
      },
    });

    // Cast the artisans array to the inferred type before mapping
    const typedArtisans = artisans as PrismaArtisanProfileWithAllRelations[];
    // Map to flatten the structure and calculate average rating and total reviews
    return typedArtisans.map(transformArtisanProfileForDisplay);
  } catch (error) {
    console.error('Database Error (fetchArtisanProfilesForList):', error);
    throw new Error('Failed to fetch artisan profiles for list with calculated ratings.');
  }
}


// --- NEW FUNCTION: fetchArtisanProfileAndUserDetails ---
/**
 * Fetches a single artisan profile by their userId, including their associated
 * user's name, email, profile image URL, and phone number, along with
 * calculated average rating and total review count.
 * Returns data in the ArtisanProfileForDisplay format.
 */
export async function fetchArtisanProfileAndUserDetails(userId: string): Promise<ArtisanProfileForDisplay | undefined> {
  noStore(); // Opt-out of data caching for dynamic content

  try {
    const artisan = await prisma.artisanProfile.findUnique({
      where: {
        userId: userId,
      },
      ...artisanProfileWithAllRelations, // Use the shared relations definition
    });

    if (!artisan) {
      return undefined;
    }

    // Cast the artisan to the inferred type before transforming
    const typedArtisan = artisan as PrismaArtisanProfileWithAllRelations;
    return transformArtisanProfileForDisplay(typedArtisan);
  } catch (error) {
    console.error('Database Error (fetchArtisanProfileAndUserDetails):', error);
    throw new Error('Failed to fetch artisan profile and user details.');
  }
}