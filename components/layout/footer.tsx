export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Polly. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:underline hover:text-foreground">Terms</a>
          <a href="#" className="hover:underline hover:text-foreground">Privacy</a>
          <a href="#" className="hover:underline hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}