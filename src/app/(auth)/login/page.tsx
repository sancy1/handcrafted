
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-serif text-amber-900 mb-6">Artisan Login</h2>
      <form className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button 
          type="submit"
          className="w-full bg-amber-700 text-white p-3 rounded hover:bg-amber-800 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}