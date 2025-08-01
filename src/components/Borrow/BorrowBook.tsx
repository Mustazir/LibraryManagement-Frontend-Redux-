"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useBorrowBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/type";

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

export function BorrowBook({ book }: { book: IBook }) {
  const [open, setOpen] = useState(false);
  const [borrowBook] = useBorrowBookMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {
      quantity: "",
       dueDate: undefined,
    },
  });

 const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  setErrorMessage("");

  const quantity = parseInt(data.quantity);
  if (isNaN(quantity) || quantity < 1) {
    setErrorMessage("Enter a valid quantity (1 or more).");
    return;
  }

  if (quantity > book.copies) {
    setErrorMessage(`Only ${book.copies} copies are available.`);
    return;
  }

  if (!data.dueDate) {
    setErrorMessage("Please select a due date.");
    return;
  }

  try {
    await borrowBook({
      book: book._id,
      quantity,
      dueDate: data.dueDate, // ✅ include this line
    }).unwrap();

    alert(`Successfully borrowed ${quantity} copy/copies!`);
    form.reset();
    setOpen(false);
  } catch (error) {
    console.error("Borrow error:", error);
    setErrorMessage("Failed to borrow. Please try again.");
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">Borrow</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>Available copies: {book.copies}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      placeholder="Enter number of copies"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
  control={form.control}
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
              {field.value ? format(new Date(field.value), "PPP") : <span>Select date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  )}
/>


            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Confirm Borrow</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
