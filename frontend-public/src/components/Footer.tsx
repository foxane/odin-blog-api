export default function Footer() {
  return (
    <footer className="border-t border-neutral-600 flex flex-col items-center gap-2 p-5 text-sm font-thin">
      <p>Made with hate</p>
      <a
        className="text-sm hover:text-amber-400"
        href="https://github.com/foxane/odin-blog-api/tree/main/frontend-admin"
        target="_blank"
        rel="noopener noreferrer">
        GitHub
      </a>
    </footer>
  );
}
