import React from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
}
const SectionLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <section className="container  py-4 space-y-4 md:space-y-8">
      <div className="space-y-2">
        <div className="h-1 w-24 bg-secondary mx-auto"></div>
        <h1 className="text-3xl font-bold text-center text-primary">
          {title}
        </h1>
      </div>
      {children}
    </section>
  );
};

export default SectionLayout;
