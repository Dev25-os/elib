import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "@/http/api";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Book Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Book Description must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Book Description must be at least 2 characters.",
  }),
  coverImage: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
  }, "Cover Image is required"),
  file: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
  }, "Book PDF is required"),
});

const CreateBook = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
    },
  });

  const navigate = useNavigate();

  const coverImageRef = form.register("coverImage");
  const fileRef = form.register("file");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      console.log("Book created successfully");
      navigate("/books");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("genre", values.genre);
    formdata.append("description", values.description);
    formdata.append("coverImage", values.coverImage[0]);
    formdata.append("file", values.file[0]);

    mutation.mutate(formdata);

    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between mb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to="/home">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Books</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Book</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3">
              <Link to={"/books"}>
                <Button size={"sm"} variant={"outline"}>
                  Cancel
                </Button>
              </Link>
              
                <Button disabled={mutation.isPending} size={"sm"}>Save Book</Button>
              
            </div>
          </div>

          <CardTitle className="py-0 my-0">Book Details</CardTitle>
          <CardDescription className="my-0 py-0">
            Please Fill all the details
          </CardDescription>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input type="file" className="w-full" {...coverImageRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>Book File</FormLabel>
                <FormControl>
                  <Input type="file" className="w-full" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
        </form>
      </Form>
    </div>
  );
};

export default CreateBook;
