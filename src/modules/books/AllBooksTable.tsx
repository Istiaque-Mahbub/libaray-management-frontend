import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import { Edit2Icon, Trash2 } from "lucide-react";


export default function AllBooksTable() {
    const {data,isLoading} = useGetAllBooksQuery(undefined,{
        pollingInterval:30000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true,
        refetchOnReconnect:true
    })
    console.log(data,isLoading)
    if(isLoading){
        return <Loading></Loading>
    }
  return (
   <div className="md:max-w-7xl mt-3 mx-auto">
     <Table>
  <TableCaption>A list of books.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>ISBN Number</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Author Name</TableHead>
      <TableHead>Copies</TableHead>
      <TableHead>Delete</TableHead>
      <TableHead>Edit</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {
     !isLoading && data.data.map((book:any,index:number)=>(
          <TableRow key={index}>
      <TableCell className="font-medium">{book.isbn}</TableCell>
      <TableCell className="font-medium">{book.title}</TableCell>
      <TableCell className="font-medium">{book.author}</TableCell>
      <TableCell className="font-medium">{book.copies}</TableCell>
      <TableCell className="font-medium">{<Button variant="link" className="text-red-500 p-0">
        <Trash2></Trash2>

        </Button>}</TableCell>
      <TableCell className="font-medium">{<Button variant="link" className="text-green-500 p-0">
        <Edit2Icon></Edit2Icon>

        </Button>}</TableCell>
      
    </TableRow>
    ))
  }
  </TableBody>
</Table>
   </div>
  )
}
