import type { Metadata } from 'next'
import SideBarPage from '@/components/sidebar/page'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
          <div className='flex flex-row'>
            <div className='basis-1/5'>
              <SideBarPage/>
            </div>
            <div className='basis-4/5'>
              {children}
            </div>
          </div>
  )
}
