import "./globals.css"

export const metadata: Metadata = {
  title: "Trello 2.0 Clone",
  description: "Generated by Nick VAldez",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">{children}</body>
    </html>
  )
}
