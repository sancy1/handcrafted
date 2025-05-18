import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-amber-900">Welcome Artisans!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Test Product Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="h-48 bg-amber-200 rounded-md mb-4"></div>
          <h3 className="text-xl font-semibold text-amber-900">Handcrafted Bowl</h3>
          <p className="text-amber-700 mt-2">Beautiful artisan-made wooden bowl</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-amber-900">$45.00</span>
            <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-amber-900">Explore</h3>
          <Link href="/products" className="block p-3 bg-amber-100 rounded hover:bg-amber-200 transition-colors">
            Browse Products
          </Link>
          <Link href="/artisans" className="block p-3 bg-amber-100 rounded hover:bg-amber-200 transition-colors">
            Meet Artisans
          </Link>
          <Link href="/login" className="block p-3 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors">
            Artisan Login
          </Link>
        </div>
      </div>

      {/* Design System Showcase */}
      <section className="space-y-8">
        <h2 className="text-2xl font-serif text-amber-900 border-b border-amber-200 pb-2">
          Design Foundations
        </h2>

        {/* Color Palette */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'Primary', value: 'bg-amber-900', text: 'text-amber-50' },
              { name: 'Secondary', value: 'bg-amber-700', text: 'text-amber-50' },
              { name: 'Accent', value: 'bg-amber-600', text: 'text-amber-50' },
              { name: 'Light', value: 'bg-amber-100', text: 'text-amber-900' },
              { name: 'Background', value: 'bg-amber-50', text: 'text-amber-900' },
            ].map((color) => (
              <div key={color.name} className={`${color.value} ${color.text} p-4 rounded-md shadow-inner text-center`}>
                {color.name}
                <div className="text-xs mt-1 opacity-80">{color.value.replace('bg-', '')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Typography</h3>
          
          {/* Font Pairing */}
          <div className="mb-6 p-4 bg-amber-50 rounded-md">
            <h4 className="font-semibold text-amber-800 mb-2">Font Pairing</h4>
            <p className="font-sans">Primary: Inter (Sans-serif) - Clean and readable for UI</p>
            <p className="font-serif mt-2">Secondary: Cardo (Serif) - Elegant for headings</p>
          </div>
          
          {/* Type Scale */}
          <div className="space-y-3">
            <h4 className="font-semibold text-amber-800">Type Scale</h4>
            <div className="space-y-2">
              {[
                { size: '4xl', example: 'text-4xl font-serif', label: 'Heading 1' },
                { size: '3xl', example: 'text-3xl font-serif', label: 'Heading 2' },
                { size: '2xl', example: 'text-2xl font-serif', label: 'Heading 3' },
                { size: 'xl', example: 'text-xl font-sans', label: 'Subheading' },
                { size: 'base', example: 'text-base font-sans', label: 'Body Text' },
                { size: 'sm', example: 'text-sm font-sans', label: 'Caption' },
              ].map((type) => (
                <div key={type.size} className={`${type.example} text-amber-900`}>
                  {type.label} - {type.size.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Fonts Implementation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Google Fonts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-amber-50 rounded-md">
              <h4 className="font-serif text-lg text-amber-800 mb-2">Cardo (Serif)</h4>
              <p className="font-serif">
                "Perfect for artisan branding - elegant yet approachable with excellent readability."
              </p>
              <div className="mt-2 text-sm font-sans text-amber-700">
                Weights: 400 (Regular), 700 (Bold)
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-md">
              <h4 className="font-sans text-lg text-amber-800 mb-2">Inter (Sans-serif)</h4>
              <p className="font-sans">
                "Highly legible for body text and UI elements with a modern neutral feel."
              </p>
              <div className="mt-2 text-sm font-sans text-amber-700">
                Weights: 400 (Regular), 500 (Medium), 600 (SemiBold)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
