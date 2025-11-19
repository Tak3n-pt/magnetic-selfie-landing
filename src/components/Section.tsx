import clsx from "clsx";

export default function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("py-16 md:py-24", className)}>
      <div className="container">{children}</div>
    </section>
  );
}

