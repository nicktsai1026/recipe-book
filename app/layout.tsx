import './globals.css'
import { Merriweather } from 'next/font/google'
import Header from '@/components/Header'
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'Recipe Book',
  description: 'Find recipes for your next meal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
