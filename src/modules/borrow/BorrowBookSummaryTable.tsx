import Loading from "@/components/layout/Loading"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDeleteBorrowBookMutation, useGetAllBorrowBooksQuery } from "@/redux/api/baseApi"
import { Trash2 } from "lucide-react"
import Swal from "sweetalert2"


export default function BorrowBookSummaryTable() {
     const {data,isLoading} = useGetAllBorrowBooksQuery(undefined,{
        pollingInterval:30000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true,
        refetchOnReconnect:true
     })

     const [deleteBorrowBook] = useDeleteBorrowBookMutation()



     if(isLoading){
        return <Loading></Loading>
     }

     const handelDelete = async (id:string) =>{
        console.log(id)
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
                 await deleteBorrowBook(id).unwrap()
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
     

  console.log(data)
  
  return (
    <div>
          <Table>
  <TableCaption>A list of borrowed books.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>ISBN Number</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Total Borrowed Quantity</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {
     !isLoading && data.data.map((book:any,index:number)=>(
          <TableRow key={index}>
      <TableCell className="font-medium">{book.book.isbn}</TableCell>      
      <TableCell className="font-medium">{book.book.title}</TableCell>
      <TableCell className="font-medium">{book.totalQuantity}</TableCell>
      <TableCell className="font-medium">{
        
        <Button 
        onClick={()=>handelDelete(book._id)} variant="link" className="text-red-500 p-0">
        <Trash2></Trash2>

        </Button>
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
