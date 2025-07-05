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
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"

import { Textarea } from "@/components/ui/textarea"
import { useParams } from "react-router"
import { useGetAllBooksQuery, useUpdateBookMutation } from "@/redux/api/baseApi"
import Loading from "@/components/layout/Loading"
import { useState } from "react"
import Swal from "sweetalert2"
import type { IBook } from "@/types"



export function UpdateBookModal() {

    const { id } = useParams()
    const [open, setOpen] = useState(false)

    const { data, isLoading } = useGetAllBooksQuery(undefined, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })

    const [updateBook] = useUpdateBookMutation()

    if (isLoading) {
        return <Loading></Loading>
    }

    const book = data.data.find((item: IBook) => item._id == id)

    const defaultValues = {

        title: book.title,
        copies: book.copies,
        description: book.description,
        isbn: book.isbn,
        genre: book.genre,
        author: book.author
    }
    const form = useForm({ defaultValues })



    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const updatedData ={
            ...data, available:true 
        }
        updateBook({ id,  updatedData  })
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Book Updated",
  showConfirmButton: false,
  timer: 1500
});
        setOpen(false)

    }


    return (
        <div className="md:max-w-7xl mx-auto flex justify-center">
            <Dialog  open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline">Update Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Your Book</DialogTitle>
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
        </div>
    )
}
