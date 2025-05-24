

'use client';

// src/components/auth/user-dropdown.tsx
'use client';

import { signOut } from '../../auth';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function UserDropdown({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before closing
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-amber-700 p-2 rounded transition-colors"
      >
        <UserCircleIcon className="h-6 w-6 text-amber-50" />
        <span className="text-amber-50">{name}</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100"
            onClick={() => setIsOpen(false)}
          >
            View Dashboard
          </Link>
          <form
            action={async () => {
              await signOut();
            }}
            className="w-full"
          >
            <button
              type="submit"
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-amber-900 hover:bg-amber-100"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}











// // src/components/auth/user-dropdown.tsx

// 'use client';

// import { signOut } from 'next-auth/react';
// import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { useState, useRef, useEffect } from 'react';

// export default function UserDropdown({ name }: { name: string }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   let timeoutId: NodeJS.Timeout;

//   const handleMouseEnter = () => {
//     clearTimeout(timeoutId);
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutId = setTimeout(() => {
//       setIsOpen(false);
//     }, 300);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return (
//     <div 
//       className="relative"
//       ref={dropdownRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="flex items-center gap-2 hover:bg-amber-700 p-2 rounded transition-colors cursor-pointer">
//         <UserCircleIcon className="h-6 w-6 text-amber-50" />
//         <span className="text-amber-50">{name}</span>
//       </div>
      
//       {isOpen && (
//         <div 
//           className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <Link
//             href="/dashboard"
//             className="flex items-center gap-2 px-4 py-2 text-sm text-amber-900 hover:bg-amber-100"
//             onClick={() => setIsOpen(false)}
//           >
//             View Dashboard
//           </Link>
//           <button
//             onClick={() => signOut()}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm text-amber-900 hover:bg-amber-100"
//           >
//             <ArrowRightOnRectangleIcon className="h-4 w-4" />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



