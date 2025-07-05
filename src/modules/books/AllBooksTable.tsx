import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { Edit2Icon, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";


export default function AllBooksTable() {
    const {data,isLoading} = useGetAllBooksQuery(undefined,{
        pollingInterval:30000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true,
        refetchOnReconnect:true
    })

    const [deleteBook] = useDeleteBookMutation()

    const handelDelete = async (id:string) =>{
         Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
  if (result.isConfirmed) {
    try {
            await deleteBook(id).unwrap()
             Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
            
          } catch (error:any) {
             Swal.fire({
      title: "ERROR!",
      text: error,
      icon: "error"
    });
          }
  }
});
    }

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
     !isLoading && data.data.map((book:IBook,index:number)=>(
          <TableRow key={index}>
      <TableCell className="font-medium">{book.isbn}</TableCell>
      <TableCell className="font-medium">{book.title}</TableCell>
      <TableCell className="font-medium">{book.author}</TableCell>
      <TableCell className="font-medium">{book.copies}</TableCell>
      <TableCell className="font-medium">
        {
        <Button onClick={()=>handelDelete(book._id)} variant="link" className="text-red-500 p-0">
        <Trash2></Trash2>

        </Button>
        }
        </TableCell>
      <TableCell className="font-medium">
        {
           <Link to={`/edit-book/${book._id}`}> <Button variant="link" className="text-green-500 p-0">
        <Edit2Icon></Edit2Icon>
        
        </Button>
        </Link>

        }
        </TableCell>

        <TableCell className="font-medium">
        {
           <Link to={`/books/${book._id}`}> <Button variant="link" className="text-green-500 p-0">
        Details
        
        </Button>
        </Link>

        }
        </TableCell>
      
    </TableRow>
    ))
  }
  </TableBody>
</Table>
   </div>
  )
}
