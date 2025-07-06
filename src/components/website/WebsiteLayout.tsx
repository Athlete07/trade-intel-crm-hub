
import { useState } from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteFooter } from "./WebsiteFooter";
import { WebsiteHome } from "./WebsiteHome";
import { WebsitePricing } from "./WebsitePricing";
import { WebsiteFeatures } from "./WebsiteFeatures";
import { WebsiteAbout } from "./WebsiteAbout";
import { WebsiteContact } from "./WebsiteContact";

type WebsitePage = 
  | "home" 
  | "features" 
  | "pricing" 
  | "solutions" 
  | "resources" 
  | "about" 
  | "contact"
  | "demo"
  | "login";

interface WebsiteLayoutProps {
  onEnterApp: () => void;
}

export function WebsiteLayout({ onEnterApp }: WebsiteLayoutProps) {
  const [currentPage, setCurrentPage] = useState<WebsitePage>("home");

  const handleNavigate = (page: string) => {
    if (page === "login" || page === "demo") {
      onEnterApp();
      return;
    }
    setCurrentPage(page as WebsitePage);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <WebsiteHome onNavigate={handleNavigate} />;
      case "features":
        return <WebsiteFeatures onNavigate={handleNavigate} />;
      case "pricing":
        return <WebsitePricing onNavigate={handleNavigate} />;
      case "about":
        return <WebsiteAbout onNavigate={handleNavigate} />;
      case "contact":
        return <WebsiteContact onNavigate={handleNavigate} />;
      default:
        return <WebsiteHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <WebsiteFooter onNavigate={handleNavigate} />
    </div>
  );
}
