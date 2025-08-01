import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BorrowSummary {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export function BorrowedBookCard({ borrow }: { borrow: BorrowSummary }) {
  return (
    <Card className="w-full max-w-md p-4 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>{borrow.book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">ISBN: {borrow.book.isbn}</p>
      </CardHeader>
      <CardContent className="text-sm">
        <p><strong>Total Borrowed:</strong> {borrow.totalQuantity}</p>
      </CardContent>
    </Card>
  );
}
