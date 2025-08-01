import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useAddBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading";

export default function AddBookPage() {
  const form = useForm();
  const [createTask] = useAddBookMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ FIXED: Added finally block and fixed duplicate setIsSubmitting
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createTask(data).unwrap();
      console.log(res);
      form.reset();
      toast.success("Book added successfully!");
    } catch (error: any) {
      const msg = error?.data?.message || "";

      if (msg.includes("E11000")) {
        toast.error("Duplicate ISBN! Please use a unique one.");
      } else if (msg.toLowerCase().includes("isbn") && msg.includes("4")) {
        toast.error("ISBN must be at least 4 characters.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      // ✅ This ensures loading stops whether success or error
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-2 md:mx-auto my-10 p-6 bg-black shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
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
                  <Input {...field} value={field.value || ""} />
                </FormControl>
              </FormItem>
            )}
          />

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Book
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}