import type { Metadata } from 'next'
import { Header, Footer } from '@/commons/layout'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '아ㅏ 모야~~~~~~~~~~~.....',
  description: '갈등을 이해로 바꾸는 AI 편지 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

