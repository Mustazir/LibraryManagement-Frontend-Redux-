import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useUpdatedBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/type";



import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";



export function UpdateBooks({ book: book }: { book: IBook }) {
const form = useForm({
  defaultValues: {
    title: book.title,
    author: book.author,
    genre: book.genre,
    isbn: book.isbn,
    description: book.description,
    copies: book.copies.toString(),
  },
  mode: "onBlur", // Validate on blur for better UX
});
const [updateBook] = useUpdatedBookMutation();
const [open, setOpen] = useState(false);
  const [errorMessage] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);


const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  try {
    await updateBook({
      id: book._id,
      updatedData: { ...data, copies: Number(data.copies) },
    }).unwrap();

    toast.success("Book updated successfully!");
    setOpen(false);
  } catch (error: any) {
    const msg = error?.data?.message || "";

    if (msg.includes("E11000")) {
      toast.error("Duplicate ISBN! Please use a unique one.");
    } else if (msg.toLowerCase().includes("isbn") && msg.includes("4")) {
      toast.error("ISBN must be at least 4 characters.");
    } else {
      toast.error("Something went wrong.");
    }
  }finally {
      setIsSubmitting(false);
    }
};



  return (
 <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription className="sr-only">Edit the book details</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
  control={form.control}
  name="title"
  rules={{
    required: "Title is required",
    minLength: { value: 2, message: "Title must be at least 2 characters" }
  }}
  render={({ field, fieldState: { error } }) => (
    <FormItem>
      <FormLabel>Title</FormLabel>
      <FormControl>
        <Input {...field} value={field.value || ""} />
      </FormControl>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </FormItem>
  )}
/>

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
             <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
