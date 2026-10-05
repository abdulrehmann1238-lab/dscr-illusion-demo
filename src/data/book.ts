export interface BookExcerptPage {
  pageNumber: number;
  chapterTitle: string;
  paragraphs: string[];
}

export interface BookData {
  title: string;
  subtitle: string;
  author: string;
  releaseYear: string;
  amazonUrl: string;
  coverImage: string;
  learnings: string[];
  excerpts: BookExcerptPage[];
}

export const bookData: BookData = {
  title: "The DSCR Illusion",
  subtitle: "Why property cash flow is more nuanced than simple debt service formulas.",
  author: "Marcus Hale",
  releaseYear: "2025",
  amazonUrl: "https://amazon.com/dp/placeholder-dscr-illusion",
  coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  learnings: [
    "Why a 1.25 DSCR on paper can still lead to negative operating cash flow when taxes reassess or maintenance cycles peak.",
    "The exact underwriting mechanics of Form 1007 fair market rent addendums and how regional appraisal panels treat lease premiums.",
    "How to structure asset protection entities and reserve accounts so lenders provide top-tier terms without restrictive covenants.",
  ],
  excerpts: [
    {
      pageNumber: 14,
      chapterTitle: "Chapter 2: The Math Underwriters Don't Tell You",
      paragraphs: [
        "Most real estate investors treat the Debt Service Coverage Ratio as a simple scorecard: take the monthly gross rent check, divide it by the principal, interest, taxes, and insurance, and if the number exceeds 1.25, celebrate and move on to the next deal.",
        "That is where the illusion begins. Lenders do not finance your optimistic spreadsheet; they finance their worst-case liquidation risk. When an underwriter calculates DSCR, they apply adjustments that rarely appear in casual investing seminars.",
        "Consider property taxes. In high-turnover states, an acquisition immediately triggers a reassessment based on purchase price rather than historical assessed value. If your broker structured the debt service using the seller's outdated tax bill, your true post-closing DSCR drops by 15 to 20 basis points within months.",
      ],
    },
    {
      pageNumber: 15,
      chapterTitle: "Chapter 2: The Math Underwriters Don't Tell You",
      paragraphs: [
        "A deal is a story before it is a number. When I evaluate a borrower's rent roll, I look past the top-line lease amount to check tenant tenure, security deposit holdbacks, and utility allocations. A $3,000 monthly rent where the owner pays water and sewer carries vastly different default risk than a $2,800 net lease.",
        "Understanding this asymmetry gives you leverage. Instead of arguing with an underwriter over a quarter-point in interest rate, seasoned investors present clean documentation that eliminates uncertainty. When you demonstrate that your debt service math already accounts for realistic insurance replacement costs, the loan committee stops viewing you as a speculative buyer and starts treating you as a capital partner.",
      ],
    },
  ],
};
