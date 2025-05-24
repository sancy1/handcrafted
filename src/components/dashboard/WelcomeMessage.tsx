

// // src/components/dashboard/WelcomeMessage.tsx

// interface WelcomeMessageProps {
//   name: string;
//   role: string;
// }

// export default function WelcomeMessage({ name, role }: WelcomeMessageProps) {
//   const roleDisplay = role === 'artisan' ? 'Artisan' : 
//                      role === 'admin' ? 'Administrator' : 'User';

//   return (
//     <div className="bg-amber-100 p-4 rounded-lg mb-6">
//       <h2 className="text-xl font-semibold text-amber-900">
//         Welcome, {name}!
//       </h2>
//       <p className="text-amber-800">
//         Account type: <span className="font-medium">{roleDisplay}</span>
//       </p>
//     </div>
//   );
// }