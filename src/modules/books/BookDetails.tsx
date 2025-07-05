import Loading from "@/components/layout/Loading"
import { useGetBookByIDQuery } from "@/redux/api/baseApi"
import { useParams } from "react-router"


export default function BookDetails() {
    const {id} = useParams()
    const {data:book,isLoading} = useGetBookByIDQuery(id)
    if(isLoading){
        return <Loading></Loading>
    }
    
  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p><strong>Author:</strong> {book.data.author}</p>
      <p><strong>Genre:</strong> {book.data.genre}</p>
      <p><strong>ISBN:</strong> {book.data.isbn}</p>
      <p><strong>Copies:</strong> {book.data.copies}</p>
      <p><strong>Available:</strong> {book.data.available ? "Yes" : "No"}</p>
      <p><strong>CreatedAt:</strong> {book.data.createdAt}</p>
      <p><strong>UpdatedAt:</strong> {book.data.updatedAt}</p>
    </div>
  )
}
