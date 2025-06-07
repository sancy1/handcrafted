
// // src/components/products/ProductForm.tsx

// 'use client';

// import { useState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { Button } from '../ui/button';
// import { PhotoIcon } from '@heroicons/react/24/outline';
// import { fetchCategories } from '@/lib/data/categories';

// interface ProductFormProps {
//   sellerId: string;
//   onSubmit: (formData: FormData) => void;
//   categories?: { categoryId: string; name: string }[];
// }

// export default function ProductForm({ sellerId, onSubmit, categories }: ProductFormProps) {
//   const [imageUrl, setImageUrl] = useState('');

//   return (
//     <form action={onSubmit} className="space-y-6">
//       <input type="hidden" name="sellerId" value={sellerId} />

//       {/* Product Image */}
//       <div>
//         <label htmlFor="imageUrl" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Product Image URL
//         </label>
//         <div className="relative">
//           <input
//             id="imageUrl"
//             name="imageUrl"
//             type="url"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//             placeholder="Paste image URL here"
//           />
//           <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
//         </div>
//         {imageUrl && (
//           <div className="mt-2">
//             <img 
//               src={imageUrl} 
//               alt="Product preview" 
//               className="h-32 w-32 object-contain border border-[#E6E1DC] rounded-md"
//             />
//           </div>
//         )}
//       </div>

//       {/* Product Name */}
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Product Name*
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           required
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Description*
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           rows={4}
//           required
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         ></textarea>
//       </div>

//       {/* Price and Quantity */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="price" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Price ($)*
//           </label>
//           <input
//             id="price"
//             name="price"
//             type="number"
//             min="0.01"
//             step="0.01"
//             required
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//         <div>
//           <label htmlFor="quantityAvailable" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Quantity Available*
//           </label>
//           <input
//             id="quantityAvailable"
//             name="quantityAvailable"
//             type="number"
//             min="1"
//             required
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//       </div>

//       {/* Category */}
//       <div>
//         <label htmlFor="categoryId" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Category
//         </label>
//         <select
//           id="categoryId"
//           name="categoryId"
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         >
//           <option value="">Select a category</option>
//           {categories?.map((category) => (
//             <option key={category.categoryId} value={category.categoryId}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Materials and Dimensions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="materialsUsed" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Materials Used
//           </label>
//           <input
//             id="materialsUsed"
//             name="materialsUsed"
//             type="text"
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//         <div>
//           <label htmlFor="dimensions" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Dimensions
//           </label>
//           <input
//             id="dimensions"
//             name="dimensions"
//             type="text"
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//       </div>

//       {/* Care Instructions */}
//       <div>
//         <label htmlFor="careInstructions" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Care Instructions
//         </label>
//         <textarea
//           id="careInstructions"
//           name="careInstructions"
//           rows={3}
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         ></textarea>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       type="submit"
//       className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//       disabled={pending}
//     >
//       {pending ? 'Creating...' : 'Create Product'}
//     </Button>
//   );
// }




















// // Update src/components/products/ProductForm.tsx

// 'use client';

// import { useFormStatus } from 'react-dom';
// import { Button } from '../ui/button';
// import { PhotoIcon } from '@heroicons/react/24/outline';

// interface ProductFormProps {
//   sellerId: string;
//   onSubmit: (formData: FormData) => void;
//   categories?: { categoryId: string; name: string }[];
//   product?: any;
//   imageUrl?: string;
//   onImageUrlChange?: (url: string) => void;
//   isEditing?: boolean;
// }

// export default function ProductForm({ 
//   sellerId, 
//   onSubmit, 
//   categories, 
//   product, 
//   imageUrl = '', 
//   onImageUrlChange, 
//   isEditing = false 
// }: ProductFormProps) {
//   const { pending } = useFormStatus();

//   return (
//     <form action={onSubmit} className="space-y-6">
//       <input type="hidden" name="sellerId" value={sellerId} />

//       {/* Product Image */}
//       <div>
//         <label htmlFor="imageUrl" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Product Image URL
//         </label>
//         <div className="relative">
//           <input
//             id="imageUrl"
//             name="imageUrl"
//             type="url"
//             value={imageUrl}
//             onChange={(e) => onImageUrlChange?.(e.target.value)}
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//             placeholder="Paste image URL here"
//           />
//           <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
//         </div>
//         {imageUrl && (
//           <div className="mt-2">
//             <img 
//               src={imageUrl} 
//               alt="Product preview" 
//               className="h-32 w-32 object-contain border border-[#E6E1DC] rounded-md"
//             />
//           </div>
//         )}
//       </div>

//       {/* Product Name */}
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Product Name*
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           required
//           defaultValue={product?.name}
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Description*
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           rows={4}
//           required
//           defaultValue={product?.description}
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         ></textarea>
//       </div>

//       {/* Price and Quantity */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="price" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Price ($)*
//           </label>
//           <input
//             id="price"
//             name="price"
//             type="number"
//             min="0.01"
//             step="0.01"
//             required
//             defaultValue={product?.price}
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//         <div>
//           <label htmlFor="quantityAvailable" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Quantity Available*
//           </label>
//           <input
//             id="quantityAvailable"
//             name="quantityAvailable"
//             type="number"
//             min="1"
//             required
//             defaultValue={product?.quantityAvailable}
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//       </div>

//       {/* Category */}
//       <div>
//         <label htmlFor="categoryId" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Category
//         </label>
//         <select
//           id="categoryId"
//           name="categoryId"
//           defaultValue={product?.categoryId || ''}
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         >
//           <option value="">Select a category</option>
//           {categories?.map((category) => (
//             <option key={category.categoryId} value={category.categoryId}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Materials and Dimensions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="materialsUsed" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Materials Used
//           </label>
//           <input
//             id="materialsUsed"
//             name="materialsUsed"
//             type="text"
//             defaultValue={product?.materialsUsed || ''}
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//         <div>
//           <label htmlFor="dimensions" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//             Dimensions
//           </label>
//           <input
//             id="dimensions"
//             name="dimensions"
//             type="text"
//             defaultValue={product?.dimensions || ''}
//             className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//           />
//         </div>
//       </div>

//       {/* Care Instructions */}
//       <div>
//         <label htmlFor="careInstructions" className="block text-sm font-medium text-[#3E3E3E] mb-1">
//           Care Instructions
//         </label>
//         <textarea
//           id="careInstructions"
//           name="careInstructions"
//           rows={3}
//           defaultValue={product?.careInstructions || ''}
//           className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
//         ></textarea>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end gap-3">
//         <Button
//           type="button"
//           variant="outline"
//           className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
//           onClick={() => window.history.back()}
//         >
//           Cancel
//         </Button>
//         <SubmitButton isEditing={isEditing} pending={pending} />
//       </div>
//     </form>
//   );
// }

// function SubmitButton({ isEditing, pending }: { isEditing: boolean; pending: boolean }) {
//   return (
//     <Button
//       type="submit"
//       className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//       disabled={pending}
//     >
//       {pending ? (
//         isEditing ? 'Updating...' : 'Creating...'
//       ) : (
//         isEditing ? 'Update Product' : 'Create Product'
//       )}
//     </Button>
//   );
// }

























// src/components/products/ProductForm.tsx

'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ProductFormProps {
  sellerId: string;
  onSubmit: (formData: FormData) => void;
  categories?: { categoryId: string; name: string }[];
  product?: any; // Keep 'any' if product structure varies, or refine with Product interface
  imageUrl?: string;
  onImageUrlChange?: (url: string) => void;
  isEditing?: boolean;
}

export default function ProductForm({
  sellerId,
  onSubmit,
  categories,
  product,
  imageUrl = '',
  onImageUrlChange,
  isEditing = false
}: ProductFormProps) {
  const { pending } = useFormStatus();

  return (
    <form action={onSubmit} className="space-y-6">
      <input type="hidden" name="sellerId" value={sellerId} />

      {/* Product Image */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Product Image URL
        </label>
        <div className="relative">
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => onImageUrlChange?.(e.target.value)}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            placeholder="Paste image URL here"
          />
          <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Product preview"
              className="h-32 w-32 object-contain border border-[#E6E1DC] rounded-md"
            />
          </div>
        )}
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Product Name*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={product?.description}
          className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
        ></textarea>
      </div>

      {/* Price and Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Price ($)*
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            required
            defaultValue={product?.price}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
          />
        </div>
        <div>
          <label htmlFor="quantityAvailable" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Quantity Available*
          </label>
          <input
            id="quantityAvailable"
            name="quantityAvailable"
            type="number"
            min="1"
            required
            defaultValue={product?.quantityAvailable}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId || ''}
          className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Materials and Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="materialsUsed" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Materials Used
          </label>
          <input
            id="materialsUsed"
            name="materialsUsed"
            type="text"
            defaultValue={product?.materialsUsed || ''}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
          />
        </div>
        <div>
          <label htmlFor="dimensions" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Dimensions
          </label>
          <input
            id="dimensions"
            name="dimensions"
            type="text"
            defaultValue={product?.dimensions || ''}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
          />
        </div>
      </div>

      {/* Care Instructions */}
      <div>
        <label htmlFor="careInstructions" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Care Instructions
        </label>
        <textarea
          id="careInstructions"
          name="careInstructions"
          rows={3}
          defaultValue={product?.careInstructions || ''}
          className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
        ></textarea>
      </div>

      {/* New: Featured Checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          // Set defaultChecked based on existing product data, default to false if new
          defaultChecked={product?.isFeatured || false}
          className="h-4 w-4 text-[#B55B3D] focus:ring-[#B55B3D] border-[#E6E1DC] rounded"
        />
        <label htmlFor="isFeatured" className="text-sm font-medium text-[#3E3E3E]">
          Mark as Featured Product
        </label>
      </div>

      {/* New: Active/Inactive Checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          // Set defaultChecked based on existing product data, default to true for new products
          defaultChecked={product?.isActive !== undefined ? product.isActive : true}
          className="h-4 w-4 text-[#B55B3D] focus:ring-[#B55B3D] border-[#E6E1DC] rounded"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-[#3E3E3E]">
          Product is Active (uncheck to deactivate)
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <SubmitButton isEditing={isEditing} pending={pending} />
      </div>
    </form>
  );
}

function SubmitButton({ isEditing, pending }: { isEditing: boolean; pending: boolean }) {
  return (
    <Button
      type="submit"
      className="bg-[#B55B3D] hover:bg-[#9E4F37]"
      disabled={pending}
    >
      {pending ? (
        isEditing ? 'Updating...' : 'Creating...'
      ) : (
        isEditing ? 'Update Product' : 'Create Product'
      )}
    </Button>
  );
}