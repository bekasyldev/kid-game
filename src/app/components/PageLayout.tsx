interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div>
      <section 
        className="h-[100vh] overflow-hidden overflow-y-auto w-[100vw] bg-no-repeat bg-cover" 
        style={{ backgroundImage: "url('/assets/main-bg.jpg')" }}
      >
        <section className="max-w-[1200px] mx-auto h-full">
          {children}
        </section>
      </section>
    </div>
  );
} 