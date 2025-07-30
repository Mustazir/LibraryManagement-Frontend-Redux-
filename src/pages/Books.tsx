import { useGetBooksQuery } from "@/redux/api/baseApi";

const Books = () => {

  const {error,isLoading,data}=useGetBooksQuery(undefined,{pollingInterval: 10000});

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occurred</p>
      return (
    <div>
     {data?.data?.map((book) => (
        <p key={book._id}>{book.title}</p> 
      ))}
    </div>
  );
};

export default Books;