import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Swal from 'sweetalert2'
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { useCreateBooksMutation } from "@/redux/api/baseApi"
import { Textarea } from "@/components/ui/textarea"


export function AddBooksModal() {
    const form = useForm()
    const [open,setOpen] = useState(false)
    const[createBook] = useCreateBooksMutation()





    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        console.log(data)
        const book = {
            ...data,available:true
        }

try {
        
     if(book ){
        createBook(book)
           Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Book Added",
  showConfirmButton: false,
  timer: 1500
});
setOpen(false)
     }
} catch (error:any) {
     Swal.fire({
  position: "top-end",
  icon: "error",
  title: data.massage,
  showConfirmButton: false,
  timer: 1500
});
}
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogTrigger asChild>
          <Button variant="outline">Add Books</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Your Favorite Book</DialogTitle>
            <DialogDescription>
              Add book information. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* title */}
          <FormField
    control={form.control}
     rules={{ required: "Title is required" }}
    name="title"
    render={({field}) => (
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
            
          <Input {...field} value={field.value ?? ""}></Input>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />


   {/* author */}
          <FormField
    control={form.control}
     rules={{ required: "Author Name is required" }}
    name="author"
    render={({field}) => (
      <FormItem>
        <FormLabel>Author</FormLabel>
        <FormControl>
            
          <Input {...field} value={field.value ?? ""}></Input>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />

    {/* genre */}
          <FormField
    control={form.control}
     rules={{ required: "Author Name is required" }}
    name="genre"
    render={({field}) => (
      <FormItem>
        <FormLabel>Genre</FormLabel>
        <FormControl>
            
          <Input {...field} value={field.value ?? ""}></Input>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />


   {/* isbn */}
          <FormField
    control={form.control}
     rules={{ required: "ISBN number is required" }}
    name="isbn"
    render={({field}) => (
      <FormItem>
        <FormLabel>ISBN</FormLabel>
        <FormControl>
            
          <Input type="number" {...field} value={field.value ?? ""}></Input>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />


   {/* description */}
          <FormField
    control={form.control}
    name="description"
    render={({field}) => (
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
            
          <Textarea {...field} value={field.value || ""}></Textarea>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />


   {/* copies */}
          <FormField
    control={form.control}
     rules={{ required: "Available copies is required" }}
    name="copies"
    render={({field}) => (
      <FormItem>
        <FormLabel>Copies</FormLabel>
        <FormControl>
            
          <Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}></Input>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />

  


          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </form>
</Form>
        </DialogContent>
      
    </Dialog>
  )
}
