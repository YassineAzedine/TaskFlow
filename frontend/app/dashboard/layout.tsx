import ReactQueryProvider from "../providers/ReactQueryProvider";

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50"><ReactQueryProvider>
  {children}
</ReactQueryProvider></body>
    </html>
  );
}
