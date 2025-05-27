
// // src/components/dashboard/WelcomeMessage.tsx

// 'use client';

// import { Button } from '../ui/button';
// import Link from 'next/link';
// import { UserCircleIcon } from '@heroicons/react/24/outline';

// interface WelcomeMessageProps {
//   name: string;
//   email: string;
//   role: string;
// }

// export default function WelcomeMessage({ name, email, role }: WelcomeMessageProps) {
//   const roleDisplay = role === 'artisan' ? 'Artisan' : 
//                      role === 'admin' ? 'Administrator' : 'Buyer';

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//       {/* User Card - Increased width and improved responsive layout */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] mb-8">
//         <div className="p-6 md:p-8">
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
//             <div className="bg-[#F9F4EF] p-3 rounded-full self-start sm:self-center">
//               <UserCircleIcon className="h-10 w-10 text-[#B55B3D]" />
//             </div>
//             <div className="min-w-0"> {/* Added min-w-0 to prevent text overflow */}
//               <h2 className="text-xl font-serif font-bold text-[#3E3E3E] truncate">{name}</h2>
//               <p className="text-[#6C6C6C] break-all sm:break-normal sm:truncate"> {/* Improved email handling */}
//                 {email}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             {/* Role Badge */}
//             <div className="px-4 py-2 bg-[#F9F4EF] rounded-full text-sm font-medium text-[#3E3E3E] whitespace-nowrap">
//               {roleDisplay}
//             </div>
            
//             {/* Role-Based Buttons */}
//             {role === 'buyer' && (
//               <Link href="/orders" passHref>
//                 <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
//                   View Order History
//                 </Button>
//               </Link>
//             )}
            
//             {role === 'artisan' && (
//               <Link href="/products/manage" passHref>
//                 <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
//                   Manage Products
//                 </Button>
//               </Link>
//             )}
            
//             {role === 'admin' && (
//               <Link href="/admin/users" passHref>
//                 <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
//                   Manage Users
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Welcome Message */}
//       <div className="bg-[#F9F4EF] p-6 rounded-lg border border-[#E6E1DC]">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-2">
//           Welcome back, {name}!
//         </h2>
//         <p className="text-[#6C6C6C]">
//           You're logged in as a {roleDisplay.toLowerCase()}. {role === 'buyer' 
//             ? 'Browse our latest handcrafted products.' 
//             : role === 'artisan' 
//               ? 'Manage your products and view orders.' 
//               : 'Manage the marketplace and users.'}
//         </p>
//       </div>
//     </div>
//   );
// }











// src/components/dashboard/WelcomeMessage.tsx

'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface WelcomeMessageProps {
  name: string;
  email: string;
  role: string;
}

export default function WelcomeMessage({ name, email, role }: WelcomeMessageProps) {
  const roleDisplay = role === 'artisan' ? 'Artisan' : 
                     role === 'admin' ? 'Administrator' : 'Buyer';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* User Card - Increased width and improved responsive layout */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="bg-[#F9F4EF] p-3 rounded-full self-start sm:self-center">
              <UserCircleIcon className="h-10 w-10 text-[#B55B3D]" />
            </div>
            <div className="min-w-0"> {/* Added min-w-0 to prevent text overflow */}
              <h2 className="text-xl font-serif font-bold text-[#3E3E3E] truncate">{name}</h2>
              <p className="text-[#6C6C6C] break-all sm:break-normal sm:truncate"> {/* Improved email handling */}
                {email}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Role Badge */}
            <div className="px-4 py-2 bg-[#F9F4EF] rounded-full text-sm font-medium text-[#3E3E3E] whitespace-nowrap">
              {roleDisplay}
            </div>
            
            {/* Role-Based Buttons */}
            {role === 'buyer' && (
              <Link href="/orders" passHref>
                <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                  View Order History
                </Button>
              </Link>
            )}
            
            {role === 'artisan' && (
              <Link href="/products/manage" passHref>
                <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                  Manage Products
                </Button>
              </Link>
            )}
            
            {role === 'admin' && (
              <Link href="/admin/users" passHref>
                <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                  Manage Users
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Welcome Message */}
      <div className="bg-[#F9F4EF] p-6 rounded-lg border border-[#E6E1DC]">
        <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-2">
          Welcome back, {name}!
        </h2>
        <p className="text-[#6C6C6C]">
          You&apos;re logged in as a {roleDisplay.toLowerCase()}. {role === 'buyer' 
            ? 'Browse our latest handcrafted products.' 
            : role === 'artisan' 
              ? 'Manage your products and view orders.' 
              : 'Manage the marketplace and users.'}
        </p>
      </div>
    </div>
  );
}