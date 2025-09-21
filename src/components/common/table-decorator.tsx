import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type TableHeadingDecoratorProps = {
  children: React.ReactNode;
  caption: string;
  titles: string[];
};

export const TableHeadingDecorator = ({
  children,
  caption,
  titles,
}: Readonly<TableHeadingDecoratorProps>) => (
  <Table>
    <TableCaption>{caption}</TableCaption>
    <TableHeader>
      <TableRow>
        {titles.map((title) => (
          <TableHead key={title}>{title}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    {children}
  </Table>
);
