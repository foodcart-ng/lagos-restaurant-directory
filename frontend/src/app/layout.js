import './globals.css'

export const metadata = {
  title: 'Lagos Restaurant Directory',
  description: 'Discover the best restaurants in Lagos, Nigeria',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}