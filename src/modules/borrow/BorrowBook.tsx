import Loading from "@/components/layout/Loading"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import AllBooks from "@/pages/AllBooks"
import { useBorrowBookMutation, useGetBookByIDQuery } from "@/redux/api/baseApi"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { useParams } from "react-router"
import Swal from "sweetalert2"


export default function BorrowBook() {
    const { bookId } = useParams()
    const [open,setOpen] = useState(false)
    const form = useForm()
    const { data:book ,isLoading } = useGetBookByIDQuery(bookId,{
      pollingInterval:5000,
      refetchOnFocus:true,
      refetchOnMountOrArgChange:true,
      refetchOnReconnect:true
    })
    const [borrowBook] = useBorrowBookMutation()

    if(isLoading){
        return <Loading></Loading>
    }

    if(book.data.copies<1 || !book.data.available){
        Swal.fire({
  position: "top-end",
  icon: "error",
  title: `${book.data.title} is no available!!`,
  showConfirmButton: false,
  timer: 1500
});

    return <AllBooks></AllBooks>
    }

    console.log(book.data.copies)

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(book.data.copies<data.quantity){
            Swal.fire({
  position: "top-end",
  icon: "error",
  title: `Sorry!! we have ${book.data.copies} left but you want more than that which is ${data.quantity}`,
  showConfirmButton: false,
  timer: 1500
});
return false
        }
        if(data.quantity<1){
           Swal.fire({
  position: "top-end",
  icon: "error",
  title: "quantity must be minimum one",
  showConfirmButton: false,
  timer: 1500
});
return false
        }
        const newBook = {
  
            ...data,book:bookId
        }

        borrowBook(newBook)
         Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Book borrowed successfully",
  showConfirmButton: false,
  timer: 1500
         })
         setOpen(false)
    }


    console.log(bookId)
  return (
    <div className="md:max-w-7xl mx-auto flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogTrigger asChild>
          <Button variant="outline">Borrow Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrow Your Favorite Book</DialogTitle>
            <DialogDescription>
              Borrow book information. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* quantity */}
          <FormField
    control={form.control}
     rules={{ required: "Quantity is required" }}
    name="quantity"
    render={({field}) => (
      <FormItem>
        <FormLabel>Quantity</FormLabel>
        <FormControl>
            
          <Input type="number" {...field} value={field.value ?? ""} onChange={(e)=>field.onChange(e.target.value ==="" ? "" : Number(e.target.value))}></Input>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />


      <FormField
              control={form.control}
              rules={{ required: "Due date is required" }}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />



          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </form>
</Form>
        </DialogContent>
      
    </Dialog>
    </div>
  )
}
